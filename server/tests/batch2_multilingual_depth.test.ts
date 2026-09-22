import { describe, it, expect } from 'vitest';
import { processRAGQuery } from '../src/rag/pipeline.js';
import { createUser, updateUserProfile } from '../src/db/userRepo.js';

describe('Batch 2: Multilingual Responses & Response Depth Personalization Tests', () => {
  it('1. Profile language = Hindi -> assistant defaults to Hindi', async () => {
    const hindiUser = createUser({
      email: 'hindi.user@manak.ai',
      name: 'Hindi User',
      authProvider: 'email'
    });
    updateUserProfile(hindiUser.id, {
      role: 'Manufacturer',
      preferredLanguage: 'hi'
    });

    const response = await processRAGQuery({
      query: 'What are the steps to obtain BIS certification?',
      userProfile: hindiUser.profile
    });

    expect(response).toBeDefined();
    // Answer or explanations should contain Hindi phrasing
    const hasHindiText = /[\u0900-\u097F]/.test(response.answer) || 
      response.structuredExplanation?.some(e => /[\u0900-\u097F]/.test(e));
    expect(hasHindiText).toBe(true);
  });

  it('2. Profile language = Bengali -> assistant defaults to Bengali', async () => {
    const bengaliUser = createUser({
      email: 'bengali.user@manak.ai',
      name: 'Bengali User',
      authProvider: 'email'
    });
    updateUserProfile(bengaliUser.id, {
      role: 'Jeweller',
      preferredLanguage: 'bn'
    });

    const response = await processRAGQuery({
      query: 'Tell me about hallmarking rules',
      userProfile: bengaliUser.profile
    });

    expect(response).toBeDefined();
    const hasBengaliText = /[\u0980-\u09FF]/.test(response.answer) || 
      response.structuredExplanation?.some(e => /[\u0980-\u09FF]/.test(e));
    expect(hasBengaliText).toBe(true);
  });

  it('3. Explicit language selection overrides profile language', async () => {
    const hindiUser = createUser({
      email: 'hindi.user2@manak.ai',
      name: 'Hindi User Explicit Overridden',
      authProvider: 'email'
    });
    updateUserProfile(hindiUser.id, {
      role: 'Consumer',
      preferredLanguage: 'hi'
    });

    // Explicitly set language to English ('en')
    const response = await processRAGQuery({
      query: 'What is ISI mark process?',
      language: 'en',
      userProfile: hindiUser.profile
    });

    expect(response).toBeDefined();
    // Answer should be predominantly English text, without Devanagari script in primary answer
    const hasDevanagariInAnswer = /[\u0900-\u097F]/.test(response.answer);
    expect(hasDevanagariInAnswer).toBe(false);
  });

  it('4. Quick vs Detailed vs Technical produces the appropriate response-depth structure', async () => {
    const userProfile = {
      role: 'Manufacturer' as const,
      preferredLanguage: 'en' as const,
      informationDepth: 'Detailed' as const
    };

    // Quick depth
    const quickRes = await processRAGQuery({
      query: 'Explain BIS certification for steel',
      responseDepth: 'Quick',
      userProfile
    });
    expect(quickRes.structuredExplanation?.length).toBeLessThanOrEqual(2);
    expect(quickRes.suggestedFollowups?.length).toBeLessThanOrEqual(1);

    // Technical depth
    const techRes = await processRAGQuery({
      query: 'Explain BIS certification for steel',
      responseDepth: 'Technical',
      userProfile
    });
    expect(techRes.structuredExplanation?.some(e => e.includes('Clause') || e.includes('IS 3042:1990') || e.includes('Parameters') || e.includes('Reference'))).toBe(true);
  });

  it('5. Follow-ups respect the selected language', async () => {
    const responseInHindi = await processRAGQuery({
      query: 'How to register on ManakOnline?',
      language: 'hi'
    });

    expect(responseInHindi.suggestedFollowups).toBeDefined();
    expect(responseInHindi.suggestedFollowups?.length).toBeGreaterThan(0);
    const followUpHasHindi = responseInHindi.suggestedFollowups?.some(f => /[\u0900-\u097F]/.test(f));
    expect(followUpHasHindi).toBe(true);

    const responseInBengali = await processRAGQuery({
      query: 'How to register on ManakOnline?',
      language: 'bn'
    });

    expect(responseInBengali.suggestedFollowups).toBeDefined();
    expect(responseInBengali.suggestedFollowups?.length).toBeGreaterThan(0);
    const followUpHasBengali = responseInBengali.suggestedFollowups?.some(f => /[\u0980-\u09FF]/.test(f));
    expect(followUpHasBengali).toBe(true);
  });

  it('6. BIS identifiers and citations remain unchanged by language handling', async () => {
    const responseHindi = await processRAGQuery({
      query: 'What standard covers pressure cookers?',
      language: 'hi'
    });

    // IS numbers and scheme identifiers must remain intact in Hindi
    expect(responseHindi.answer).toContain('IS 3042:1990');
    if (responseHindi.citations && responseHindi.citations.length > 0) {
      expect(responseHindi.citations[0].documentTitle).toContain('IS 3042:1990');
    }

    const responseBengali = await processRAGQuery({
      query: 'What standard covers gold hallmarking?',
      language: 'bn'
    });

    // IS numbers and HUID must remain intact in Bengali
    expect(responseBengali.answer).toContain('IS 1417:2019');
    expect(responseBengali.answer).toContain('HUID');
  });
});
