import { describe, it, expect } from 'vitest';
import { createSavedItem, getUserSavedItems, deleteSavedItem } from '../src/db/savedRepo.js';
import { createConversation, getUserConversations, getConversationById, addMessageToConversation } from '../src/db/conversationRepo.js';

describe('User-Scoped Saved Items & Conversation Ownership Tests', () => {
  const userA = 'user-test-A';
  const userB = 'user-test-B';

  it('should isolate saved items between user A and user B', () => {
    const itemA = createSavedItem(userA, {
      itemType: 'standard',
      title: 'IS 3042 Pressure Cookers',
      summary: 'Saved standard for User A'
    });

    const itemsA = getUserSavedItems(userA);
    const itemsB = getUserSavedItems(userB);

    expect(itemsA.some(i => i.id === itemA.id)).toBe(true);
    expect(itemsB.some(i => i.id === itemA.id)).toBe(false);
  });

  it('should prevent User B from deleting User A saved item', () => {
    const itemA = createSavedItem(userA, {
      itemType: 'answer',
      title: 'User A Secret Answer',
      summary: 'Summary'
    });

    const deleteResult = deleteSavedItem(userB, itemA.id);
    expect(deleteResult).toBe(false);

    const checkItem = getUserSavedItems(userA).find(i => i.id === itemA.id);
    expect(checkItem).toBeDefined();
  });

  it('should isolate conversation history between user A and user B', () => {
    const convA = createConversation(userA, 'User A Inquiry');
    addMessageToConversation(userA, convA.id, { sender: 'user', text: 'Hello from User A' });

    const convsA = getUserConversations(userA);
    const convsB = getUserConversations(userB);

    expect(convsA.some(c => c.id === convA.id)).toBe(true);
    expect(convsB.some(c => c.id === convA.id)).toBe(false);

    // User B cannot fetch User A conversation details
    const unauthorizedFetch = getConversationById(userB, convA.id);
    expect(unauthorizedFetch).toBeUndefined();
  });
});
