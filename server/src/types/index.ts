export interface UserProfile {
  userId: string;
  preferredName?: string;
  role: 'Manufacturer' | 'MSME Owner' | 'Entrepreneur' | 'Laboratory Professional' | 'Jeweller' | 'Consumer' | 'Student' | 'Researcher' | 'Consultant' | 'Admin' | 'Other';
  organizationName?: string;
  businessType?: string;
  industrySector?: string;
  companySize?: string;
  city?: string;
  state?: string;
  country?: string;
  productCategories: string[];
  mainProducts: string[];
  materialsUsed: string[];
  bisInterestAreas: string[];
  preferredLanguage: 'en' | 'hi' | 'bn';
  informationDepth: 'Quick' | 'Detailed' | 'Technical';
  isOnboarded: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  authProvider: 'email' | 'google' | 'demo';
  isDemo: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string;
  profile?: UserProfile;
}

export interface SavedItem {
  id: string;
  userId: string;
  itemType: 'answer' | 'standard' | 'laboratory' | 'recommendation';
  title: string;
  summary: string;
  referenceId?: string;
  data: Record<string, any>;
  createdAt: string;
}

export interface ConversationMessage {
  id: string;
  conversationId: string;
  sender: 'user' | 'assistant';
  text: string;
  ragResponse?: RAGResponse;
  timestamp: string;
}

export interface Conversation {
  id: string;
  userId: string;
  title: string;
  messages: ConversationMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface Source {
  id: string;
  name: string;
  organization: string;
  authorityLevel: 'Official BIS' | 'Government Notification' | 'Empanelled Portal' | 'Secondary Reference';
  url: string;
  lastVerifiedAt: string;
  isVerified: boolean;
}

export interface DocumentChunk {
  id: string;
  documentId: string;
  sourceId: string;
  documentTitle: string;
  content: string;
  section?: string;
  page?: number;
  tags: string[];
  relevanceScore?: number;
  metadata?: Record<string, any>;
}

export interface Standard {
  id: string;
  isNumber: string; // e.g. "IS 3042:1990"
  title: string;
  description: string;
  sector: string;
  productCategories: string[];
  status: 'Active' | 'Under Revision' | 'Withdrawn';
  edition: string;
  publicationDate: string;
  isMandatory: boolean; // Compulsory Certification / QCO
  sourceDocumentId: string;
  sourceUrl: string;
}

export interface CertificationScheme {
  id: string;
  name: string; // e.g. "Product Certification Scheme I (ISI Mark)"
  code: string;
  description: string;
  applicability: string;
  processSteps: { step: number; title: string; detail: string }[];
  feeDisclaimer: string;
  sourceDocumentId: string;
}

export interface Laboratory {
  id: string;
  name: string;
  location: string;
  city: string;
  state: string;
  lat?: number;
  lng?: number;
  testingScopes: string[];
  standardsSupported: string[]; // IS numbers
  contactEmail: string;
  contactPhone: string;
  sourceDocumentId: string;
}

export interface HallmarkingCentre {
  id: string;
  name: string;
  location: string;
  city: string;
  state: string;
  centreCode: string;
  services: string[];
  recognizedStatus: string;
  sourceDocumentId: string;
}

export interface RAGRequest {
  query: string;
  language?: 'en' | 'hi' | 'bn';
  responseDepth?: 'Quick' | 'Detailed' | 'Technical';
  intentOverride?: string;
  conversationId?: string;
  userProfile?: UserProfile;
}

export interface Citation {
  index: number;
  chunkId: string;
  documentTitle: string;
  sourceName: string;
  authorityLevel: string;
  sourceUrl: string;
  snippet: string;
  section?: string;
}

export interface RAGResponse {
  answer: string;
  structuredExplanation?: string[];
  intent: string;
  confidence: 'High' | 'Medium' | 'Low';
  confidenceScore: number;
  citations: Citation[];
  retrievedChunks: DocumentChunk[];
  suggestedFollowups?: string[];
  isDemoMode: boolean;
  disclaimer: string;
}

export interface RecommendationRequest {
  productName: string;
  category: string;
  material: string;
  intendedUse: string;
  manufacturingProcess?: string;
  targetMarket?: string;
}

export interface StandardRecommendation {
  standard: Standard;
  matchScore: number;
  confidence: 'High' | 'Medium' | 'Low';
  relevanceReasoning: string;
  mandatoryNotice?: string;
  testingScopeSummary?: string;
}
