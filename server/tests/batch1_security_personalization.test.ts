import { describe, it, expect } from 'vitest';
import { getUserContext } from '../src/services/userContextService.js';
import { createUser, createSession, updateUserProfile } from '../src/db/userRepo.js';
import { processRAGQuery } from '../src/rag/pipeline.js';
import { requireAdmin, AuthenticatedRequest } from '../src/middleware/authMiddleware.js';
import { recommendStandard } from '../src/controllers/standardsController.js';

describe('Batch 1: Security & User Context Personalization Tests', () => {
  it('1. getUserContext should return correct normalized profile context', () => {
    const user = createUser({
      email: 'jeweller.test@manak.ai',
      name: 'Rohan Jewellers',
      authProvider: 'email'
    });

    updateUserProfile(user.id, {
      role: 'Jeweller',
      industrySector: 'Gems & Jewellery',
      productCategories: ['Gold Jewellery'],
      mainProducts: ['22K Gold Bangles'],
      materialsUsed: ['22K Gold'],
      city: 'Kolkata',
      state: 'West Bengal',
      preferredLanguage: 'hi'
    });

    const token = createSession(user.id);
    const context = getUserContext(token);

    expect(context).toBeDefined();
    expect(context?.role).toBe('Jeweller');
    expect(context?.industrySector).toBe('Gems & Jewellery');
    expect(context?.mainProducts).toContain('22K Gold Bangles');
    expect(context?.preferredLanguage).toBe('hi');
  });

  it('2. Assistant should receive and adjust follow-ups based on user profile context', async () => {
    const msmeUser = createUser({
      email: 'msme.owner@manak.ai',
      name: 'Small Scale Industry Owner',
      authProvider: 'email'
    });
    const updatedUser = updateUserProfile(msmeUser.id, {
      role: 'MSME Owner',
      preferredLanguage: 'en'
    });

    const response = await processRAGQuery({
      query: 'What are the steps to obtain BIS certification?',
      userProfile: updatedUser?.profile
    });

    expect(response).toBeDefined();
    expect(response.answer).toContain('Product Certification Scheme I');
    expect(response.structuredExplanation?.some(e => e.includes('MSME Benefit'))).toBe(true);
  });

  it('3. Recommender should reuse profile information when request fields are missing', () => {
    const mfgUser = createUser({
      email: 'cookware.mfg@manak.ai',
      name: 'Ghaziabad Cookware Mfg',
      authProvider: 'email'
    });
    const token = createSession(mfgUser.id);

    updateUserProfile(mfgUser.id, {
      role: 'Manufacturer',
      mainProducts: ['Stainless steel pressure cooker'],
      productCategories: ['Cookware'],
      materialsUsed: ['Food grade stainless steel']
    });

    // Mock Express Request & Response for recommendStandard
    const mockReq = {
      body: {}, // empty request body
      headers: { authorization: `Bearer ${token}` }
    } as any;

    let resData: any = null;
    const mockRes = {
      json: (data: any) => { resData = data; return mockRes; },
      status: (code: number) => mockRes
    } as any;

    recommendStandard(mockReq, mockRes);

    expect(resData).toBeDefined();
    expect(resData.productQuery.productName).toBe('Stainless steel pressure cooker');
    expect(resData.recommendations.length).toBeGreaterThan(0);
    expect(resData.recommendations[0].standard.isNumber).toBe('IS 3042:1990');
  });

  it('4. Non-admin user request to admin API should be forbidden with HTTP 403', () => {
    const normalUser = createUser({
      email: 'normal.user@manak.ai',
      name: 'Normal User',
      authProvider: 'email'
    });
    updateUserProfile(normalUser.id, { role: 'Manufacturer' });
    const token = createSession(normalUser.id);

    const req = {
      headers: { authorization: `Bearer ${token}` }
    } as AuthenticatedRequest;

    let statusCode = 200;
    let resJson: any = null;
    const res = {
      status: (code: number) => { statusCode = code; return res; },
      json: (data: any) => { resJson = data; }
    } as any;

    let nextCalled = false;
    const next = () => { nextCalled = true; };

    requireAdmin(req, res, next);

    expect(nextCalled).toBe(false);
    expect(statusCode).toBe(403);
    expect(resJson.error).toContain('Forbidden');
  });

  it('5. Admin user request to admin API should succeed and call next()', () => {
    const adminUser = createUser({
      email: 'admin.officer@manak.ai',
      name: 'BIS Admin Officer',
      authProvider: 'email'
    });
    updateUserProfile(adminUser.id, { role: 'Admin' as any });
    const token = createSession(adminUser.id);

    const req = {
      headers: { authorization: `Bearer ${token}` }
    } as AuthenticatedRequest;

    let statusCode = 200;
    const res = {
      status: (code: number) => { statusCode = code; return res; },
      json: () => {}
    } as any;

    let nextCalled = false;
    const next = () => { nextCalled = true; };

    requireAdmin(req, res, next);

    expect(nextCalled).toBe(true);
    expect(statusCode).toBe(200);
    expect(req.user?.id).toBe(adminUser.id);
  });

  it('6. Unauthenticated admin request should be rejected with HTTP 401', () => {
    const req = {
      headers: {}
    } as AuthenticatedRequest;

    let statusCode = 200;
    let resJson: any = null;
    const res = {
      status: (code: number) => { statusCode = code; return res; },
      json: (data: any) => { resJson = data; }
    } as any;

    let nextCalled = false;
    const next = () => { nextCalled = true; };

    requireAdmin(req, res, next);

    expect(nextCalled).toBe(false);
    expect(statusCode).toBe(401);
    expect(resJson.error).toContain('Authentication token required');
  });
});
