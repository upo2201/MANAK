import { processRAGQuery } from '../rag/pipeline.js';
import { getUserContext } from '../services/userContextService.js';
export async function handleChatQuery(req, res) {
    try {
        const { query, language, responseDepth, conversationId, userProfile, userId } = req.body;
        if (!query || typeof query !== 'string' || query.trim().length === 0) {
            res.status(400).json({ error: 'Query string is required.' });
            return;
        }
        const authHeader = req.headers.authorization;
        const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : undefined;
        const resolvedContext = userProfile || (userId || token ? getUserContext(userId || token) : undefined);
        const response = await processRAGQuery({
            query,
            language: language || resolvedContext?.preferredLanguage || 'en',
            responseDepth: responseDepth || resolvedContext?.informationDepth || 'Detailed',
            conversationId,
            userProfile: resolvedContext
        });
        res.json(response);
    }
    catch (err) {
        console.error('Error in chat controller:', err);
        res.status(500).json({
            error: 'An internal error occurred while processing the RAG query.',
            details: err.message
        });
    }
}
