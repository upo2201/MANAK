import { getUserByToken } from '../db/userRepo.js';
import { getUserSavedItems, createSavedItem, deleteSavedItem } from '../db/savedRepo.js';
import { getUserConversations, getConversationById, createConversation, addMessageToConversation } from '../db/conversationRepo.js';
function authenticateRequest(req, res) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : req.query.token;
    if (!token) {
        res.status(401).json({ error: 'Authentication token required.' });
        return null;
    }
    const user = getUserByToken(token);
    if (!user) {
        res.status(401).json({ error: 'Invalid or expired session token.' });
        return null;
    }
    return user.id;
}
// SAVED ITEMS CONTROLLER HANDLERS
export function handleGetSavedItems(req, res) {
    const userId = authenticateRequest(req, res);
    if (!userId)
        return;
    const items = getUserSavedItems(userId);
    res.json({ items });
}
export function handleCreateSavedItem(req, res) {
    const userId = authenticateRequest(req, res);
    if (!userId)
        return;
    const { itemType, title, summary, referenceId, data } = req.body;
    if (!itemType || !title) {
        res.status(400).json({ error: 'itemType and title are required.' });
        return;
    }
    const newItem = createSavedItem(userId, { itemType, title, summary, referenceId, data });
    res.json({ item: newItem });
}
export function handleDeleteSavedItem(req, res) {
    const userId = authenticateRequest(req, res);
    if (!userId)
        return;
    const itemId = String(req.params.id || '');
    const success = deleteSavedItem(userId, itemId);
    if (!success) {
        res.status(404).json({ error: 'Saved item not found or unauthorized.' });
        return;
    }
    res.json({ success: true, deletedId: itemId });
}
// CONVERSATIONS CONTROLLER HANDLERS
export function handleGetConversations(req, res) {
    const userId = authenticateRequest(req, res);
    if (!userId)
        return;
    const conversations = getUserConversations(userId);
    res.json({ conversations });
}
export function handleGetConversationDetails(req, res) {
    const userId = authenticateRequest(req, res);
    if (!userId)
        return;
    const convId = String(req.params.id || '');
    const conv = getConversationById(userId, convId);
    if (!conv) {
        res.status(404).json({ error: 'Conversation not found or unauthorized.' });
        return;
    }
    res.json({ conversation: conv });
}
export function handleCreateConversation(req, res) {
    const userId = authenticateRequest(req, res);
    if (!userId)
        return;
    const { title, initialMessage } = req.body;
    const newConv = createConversation(userId, title || 'New Standards Inquiry', initialMessage);
    res.json({ conversation: newConv });
}
export function handleAddMessage(req, res) {
    const userId = authenticateRequest(req, res);
    if (!userId)
        return;
    const convId = String(req.params.id || '');
    const { sender, text, ragResponse } = req.body;
    if (!sender || !text) {
        res.status(400).json({ error: 'Message sender and text are required.' });
        return;
    }
    const newMsg = addMessageToConversation(userId, convId, { sender, text, ragResponse });
    if (!newMsg) {
        res.status(404).json({ error: 'Conversation not found or unauthorized.' });
        return;
    }
    res.json({ message: newMsg });
}
