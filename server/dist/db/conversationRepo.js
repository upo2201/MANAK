// In-memory User-Scoped Conversations Repository (PostgreSQL abstraction ready)
const conversationsStore = new Map(); // conversationId -> Conversation
export function getUserConversations(userId) {
    const list = [];
    for (const conv of conversationsStore.values()) {
        if (conv.userId === userId) {
            list.push(conv);
        }
    }
    return list.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}
export function getConversationById(userId, conversationId) {
    const conv = conversationsStore.get(conversationId);
    if (!conv || conv.userId !== userId) {
        return undefined;
    }
    return conv;
}
export function createConversation(userId, title, initialMessage) {
    const id = `conv-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const now = new Date().toISOString();
    const newConv = {
        id,
        userId,
        title: title.length > 50 ? title.substring(0, 50) + '...' : title,
        messages: initialMessage ? [initialMessage] : [],
        createdAt: now,
        updatedAt: now
    };
    conversationsStore.set(id, newConv);
    return newConv;
}
export function addMessageToConversation(userId, conversationId, message) {
    const conv = getConversationById(userId, conversationId);
    if (!conv)
        return undefined;
    const msgId = `msg-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newMsg = {
        id: msgId,
        conversationId,
        sender: message.sender,
        text: message.text,
        ragResponse: message.ragResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    conv.messages.push(newMsg);
    conv.updatedAt = new Date().toISOString();
    conversationsStore.set(conv.id, conv);
    return newMsg;
}
