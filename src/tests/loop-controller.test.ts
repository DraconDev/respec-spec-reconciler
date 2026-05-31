// Test the loop controller with mock state
import { describe, it, expect, beforeEach } from 'vitest';
import type { ExtensionAPI, SpecItem } from '../types.js';
import { LoopController } from '../loop-controller.js';
import { createDefaultState } from '../store.js';

describe('LoopController', () => {
  let mockPi: Partial<ExtensionAPI>;
  let controller: LoopController;

  beforeEach(() => {
    mockPi = { sendMessage: vitest.fn() };
    controller = new LoopController(mockPi as ExtensionAPI);
  });

  describe('findSmartTarget', () => {
    it('returns first unchecked item when no dependencies', () => {
      const items: SpecItem[] = [
        { name: 'First', checked: false, index: 1 },
        { name: 'Second', checked: false, index: 2 },
      ];
      const target = (controller as any).findSmartTarget(items, []);
      expect(target?.name).toBe('First');
    });
    it('skips checked items', () => {
      const items: SpecItem[] = [
        { name: 'First', checked: true, index: 1 },
        { name: 'Second', checked: false, index: 2 },
        { name: 'Third', checked: false, index: 3 },
      ];
      const target = (controller as any).findSmartTarget(items, []);
      expect(target?.name).toBe('Second');
    });
    it('returns null when all items are checked', () => {
      const items: SpecItem[] = [
        { name: 'First', checked: true, index: 1 },
        { name: 'Second', checked: true, index: 2 },
      ];
      expect((controller as any).findSmartTarget(items, [])).toBeNull();
    });
  });

  describe('buildPrompt', () => {
    it('creates a prompt with item name', () => {
      const item: SpecItem = { name: 'Test Item', checked: false, index: 1, verification: 'echo test' };
      const state = createDefaultState('/test/SPEC.md', [item]);
      const prompt = (controller as any).buildPrompt(item, state);
      expect(prompt).toContain('Test Item');
    });
  });

  describe('analyzeFailure', () => {
    it('handles no history', () => {
      const state = createDefaultState('/test/SPEC.md', []);
      state.escapeValve = { type: 'stall', item: 'Test', detail: 'failed', blockedAt: Date.now() };
      const analysis = (controller as any).analyzeFailure(state);
      expect(analysis).toContain('No prior attempts');
    });
  });
});
