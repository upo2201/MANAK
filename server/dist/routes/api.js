import { Router } from 'express';
import { handleChatQuery } from '../controllers/chatController.js';
import { getAllStandards, getStandardById, recommendStandard } from '../controllers/standardsController.js';
import { getLaboratories } from '../controllers/laboratoriesController.js';
import { getCertificationSchemes } from '../controllers/certificationController.js';
import { getHallmarkingOverview } from '../controllers/hallmarkingController.js';
import { runRetrievalTest, getKnowledgeStats } from '../controllers/adminController.js';
import { handleLogin, handleSignup, handleDemoLogin, handleGoogleAuth, getCurrentUser, handleUpdateProfile } from '../controllers/authController.js';
import { handleGetSavedItems, handleCreateSavedItem, handleDeleteSavedItem, handleGetConversations, handleGetConversationDetails, handleCreateConversation, handleAddMessage } from '../controllers/userFeaturesController.js';
import { requireAdmin } from '../middleware/authMiddleware.js';
const router = Router();
// Health Check
router.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'MANAK AI Backend Service', version: '1.0.0', demoMode: true });
});
// Authentication & Profile Endpoints
router.post('/auth/login', handleLogin);
router.post('/auth/signup', handleSignup);
router.post('/auth/demo', handleDemoLogin);
router.post('/auth/google', handleGoogleAuth);
router.get('/auth/me', getCurrentUser);
router.put('/user/profile', handleUpdateProfile);
// User Saved Items Endpoints
router.get('/user/saved', handleGetSavedItems);
router.post('/user/saved', handleCreateSavedItem);
router.delete('/user/saved/:id', handleDeleteSavedItem);
// User Conversation History Endpoints
router.get('/user/conversations', handleGetConversations);
router.get('/user/conversations/:id', handleGetConversationDetails);
router.post('/user/conversations', handleCreateConversation);
router.post('/user/conversations/:id/messages', handleAddMessage);
// Chat / RAG Endpoint
router.post('/chat', handleChatQuery);
// Standards Endpoints
router.get('/standards', getAllStandards);
router.get('/standards/:id', getStandardById);
router.post('/recommend-standard', recommendStandard);
// Laboratories Endpoint
router.get('/laboratories', getLaboratories);
// Certification Endpoint
router.get('/certification/schemes', getCertificationSchemes);
// Hallmarking Endpoint
router.get('/hallmarking', getHallmarkingOverview);
// Admin & Retrieval Console Endpoints (Backend Protected)
router.post('/admin/retrieval-test', requireAdmin, runRetrievalTest);
router.get('/admin/knowledge', requireAdmin, getKnowledgeStats);
export default router;
