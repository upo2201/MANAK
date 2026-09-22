import { RAGResponse, Standard, RecommendationRequest, StandardRecommendation, Laboratory, HallmarkingCentre, CertificationScheme } from '../types';

const API_BASE = (import.meta as any).env?.VITE_API_URL || '';

export async function askMANAK(query: string, language: 'en' | 'hi' | 'bn' = 'en', userProfile?: any): Promise<RAGResponse> {
  const res = await fetch(`${API_BASE}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, language, userProfile }),
  });
  if (!res.ok) throw new Error('Failed to fetch MANAK response.');
  return res.json();
}

export async function fetchStandards(params?: { search?: string; sector?: string; status?: string }): Promise<{ total: number; standards: Standard[] }> {
  const query = new URLSearchParams(params as Record<string, string>).toString();
  const res = await fetch(`${API_BASE}/api/standards?${query}`);
  if (!res.ok) throw new Error('Failed to fetch standards.');
  return res.json();
}

export async function fetchStandardById(id: string): Promise<Standard> {
  const res = await fetch(`${API_BASE}/api/standards/${id}`);
  if (!res.ok) throw new Error('Standard not found.');
  return res.json();
}

export async function recommendProductStandard(req: RecommendationRequest): Promise<{ recommendations: StandardRecommendation[]; disclaimer: string }> {
  const res = await fetch(`${API_BASE}/api/recommend-standard`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });
  if (!res.ok) throw new Error('Failed to recommend standards.');
  return res.json();
}

export async function fetchLaboratories(params?: { search?: string; state?: string; standard?: string }): Promise<{ total: number; laboratories: Laboratory[] }> {
  const query = new URLSearchParams(params as Record<string, string>).toString();
  const res = await fetch(`${API_BASE}/api/laboratories?${query}`);
  if (!res.ok) throw new Error('Failed to fetch laboratories.');
  return res.json();
}

export async function fetchCertificationSchemes(): Promise<{ schemes: CertificationScheme[] }> {
  const res = await fetch(`${API_BASE}/api/certification/schemes`);
  if (!res.ok) throw new Error('Failed to fetch certification schemes.');
  return res.json();
}

export async function fetchHallmarkingOverview(): Promise<{ standards: Standard[]; centres: HallmarkingCentre[]; mandatoryPurityGrades: any[]; mandatoryMarks: any[] }> {
  const res = await fetch(`${API_BASE}/api/hallmarking`);
  if (!res.ok) throw new Error('Failed to fetch hallmarking data.');
  return res.json();
}

export async function runAdminRetrievalTest(query: string): Promise<any> {
  const res = await fetch(`${API_BASE}/api/admin/retrieval-test`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });
  if (!res.ok) throw new Error('Failed to run retrieval test.');
  return res.json();
}

export async function fetchKnowledgeStats(): Promise<any> {
  const res = await fetch(`${API_BASE}/api/admin/knowledge`);
  if (!res.ok) throw new Error('Failed to fetch knowledge stats.');
  return res.json();
}

// USER SAVED ITEMS API
export async function fetchUserSavedItems(token: string): Promise<any[]> {
  const res = await fetch(`${API_BASE}/api/user/saved`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.items || [];
}

export async function saveUserItem(token: string, itemData: {
  itemType: 'answer' | 'standard' | 'laboratory' | 'recommendation';
  title: string;
  summary: string;
  referenceId?: string;
  data?: Record<string, any>;
}): Promise<any> {
  const res = await fetch(`${API_BASE}/api/user/saved`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(itemData)
  });
  if (!res.ok) throw new Error('Failed to save item.');
  const data = await res.json();
  return data.item;
}

export async function deleteUserSavedItem(token: string, itemId: string): Promise<boolean> {
  const res = await fetch(`${API_BASE}/api/user/saved/${itemId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.ok;
}

// USER CONVERSATIONS API
export async function fetchUserConversations(token: string): Promise<any[]> {
  const res = await fetch(`${API_BASE}/api/user/conversations`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.conversations || [];
}

export async function createUserConversation(token: string, title: string, initialMessage?: any): Promise<any> {
  const res = await fetch(`${API_BASE}/api/user/conversations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ title, initialMessage })
  });
  if (!res.ok) throw new Error('Failed to create conversation.');
  const data = await res.json();
  return data.conversation;
}

export async function addConversationMessage(token: string, conversationId: string, messageData: { sender: 'user' | 'assistant'; text: string; ragResponse?: any }): Promise<any> {
  const res = await fetch(`${API_BASE}/api/user/conversations/${conversationId}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(messageData)
  });
  if (!res.ok) throw new Error('Failed to add message to conversation.');
  const data = await res.json();
  return data.message;
}
