// Test that all public exports can be imported and called
import { describe, it, expect } from 'vitest';
import * as specParser from '../src/spec-parser.js';
import * as store from '../src/store.js';

describe('Public exports from spec-parser', () => {
  it('parseSpec can be called', () => {
    const result = specParser.parseSpec('/nonexistent/path/SPEC.md');
    expect(result).toBeNull();
  });
  it('findFirstUnchecked returns null for empty array', () => {
    expect(specParser.findFirstUnchecked([])).toBeNull();
  });
  it('allChecked returns false for empty array', () => {
    expect(specParser.allChecked([])).toBe(false);
  });
  it('countChecked returns 0 for empty array', () => {
    expect(specParser.countChecked([])).toBe(0);
  });
  it('estimateComplexity returns a number', () => {
    const result = specParser.estimateComplexity({ name: 'Test', checked: false, index: 1 });
    expect(typeof result).toBe('number');
  });
  it('inferDependencies returns a Map', () => {
    expect(specParser.inferDependencies([])).toBeInstanceOf(Map);
  });
  it('getFailureHints returns null for unknown item', () => {
    expect(specParser.getFailureHints('Unknown', [])).toBeNull();
  });
  it('learnTurnBudget updates budgets', () => {
    const result = specParser.learnTurnBudget([], 'Compile project', 5);
    expect(result.length).toBeGreaterThan(0);
  });
  it('getSuggestedBudget returns a number', () => {
    const result = specParser.getSuggestedBudget('Test', [], 3);
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThan(0);
  });
  it('detectRollbacks returns empty array for no history', () => {
    const result = specParser.detectRollbacks([{ name: 'Test', checked: false, index: 1 }], []);
    expect(result).toEqual([]);
  });
  it('calculateConfidence returns a number 0-100', () => {
    const result = specParser.calculateConfidence('Test', []);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(100);
  });
  it('getConfidenceLabel returns correct string', () => {
    expect(specParser.getConfidenceLabel(90)).toBe('high');
    expect(specParser.getConfidenceLabel(50)).toBe('medium');
    expect(specParser.getConfidenceLabel(20)).toBe('low');
  });
  it('diffSpecs compares items correctly', () => {
    const result = specParser.diffSpecs([], [{ name: 'New', checked: true, index: 1 }]);
    expect(result.added.length).toBe(1);
  });
  it('formatDiff returns string array', () => {
    const result = specParser.formatDiff(specParser.diffSpecs([], []));
    expect(Array.isArray(result)).toBe(true);
  });
  it('updateSpecHistory adds entries', () => {
    const result = specParser.updateSpecHistory([{ name: 'Test', checked: true, index: 1 }], []);
    expect(result.length).toBe(1);
  });
});

describe('Public exports from store', () => {
  it('initStore is a function', () => { expect(typeof store.initStore).toBe('function'); });
  it('getStore is a function', () => { expect(typeof store.getStore).toBe('function'); });
  it('setStore is a function', () => { expect(typeof store.setStore).toBe('function'); });
});
