import { SavedItem } from '../types/index.js';

// In-memory User-Scoped Saved Items Repository (PostgreSQL abstraction ready)
const savedItemsStore = new Map<string, SavedItem>(); // savedItemId -> SavedItem

export function getUserSavedItems(userId: string): SavedItem[] {
  const items: SavedItem[] = [];
  for (const item of savedItemsStore.values()) {
    if (item.userId === userId) {
      items.push(item);
    }
  }
  return items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function createSavedItem(userId: string, data: {
  itemType: 'answer' | 'standard' | 'laboratory' | 'recommendation';
  title: string;
  summary: string;
  referenceId?: string;
  data?: Record<string, any>;
}): SavedItem {
  const id = `svd-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
  const newItem: SavedItem = {
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

export function deleteSavedItem(userId: string, itemId: string): boolean {
  const item = savedItemsStore.get(itemId);
  if (!item || item.userId !== userId) {
    return false;
  }
  return savedItemsStore.delete(itemId);
}
