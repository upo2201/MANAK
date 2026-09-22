// In-memory User-Scoped Saved Items Repository (PostgreSQL abstraction ready)
const savedItemsStore = new Map(); // savedItemId -> SavedItem
export function getUserSavedItems(userId) {
    const items = [];
    for (const item of savedItemsStore.values()) {
        if (item.userId === userId) {
            items.push(item);
        }
    }
    return items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}
export function createSavedItem(userId, data) {
    const id = `svd-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newItem = {
        id,
        userId,
        itemType: data.itemType,
        title: data.title,
        summary: data.summary,
        referenceId: data.referenceId,
        data: data.data || {},
        createdAt: new Date().toISOString()
    };
    savedItemsStore.set(id, newItem);
    return newItem;
}
export function deleteSavedItem(userId, itemId) {
    const item = savedItemsStore.get(itemId);
    if (!item || item.userId !== userId) {
        return false;
    }
    return savedItemsStore.delete(itemId);
}
