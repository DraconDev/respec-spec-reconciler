// Test spec parsing with various inputs
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { writeFileSync, unlinkSync, mkdirSync, rmdirSync } from 'fs';
import { join } from 'path';
import { parseSpec, allChecked, countChecked, estimateComplexity, inferDependencies, findReadyItems } from '../spec-parser.js';

describe('SpecParser', () => {
  let testDir: string;
  beforeEach(() => { testDir = join('/tmp', `respec-test-${Date.now()}`); mkdirSync(testDir, { recursive: true }); });
  afterEach(() => { try { unlinkSync(join(testDir, 'SPEC.md')); } catch {} try { rmdirSync(testDir); } catch {} });

  describe('parseSpec', () => {
    it('parses empty spec', () => {
      writeFileSync(join(testDir, 'SPEC.md'), '', 'utf-8');
      expect(parseSpec(join(testDir, 'SPEC.md'))).toEqual([]);
    });
    it('parses spec with checked/unchecked items', () => {
      writeFileSync(join(testDir, 'SPEC.md'), '# Spec\n### [x] Done\n### [ ] Not Done\n', 'utf-8');
      const result = parseSpec(join(testDir, 'SPEC.md'));
      expect(result.length).toBe(2);
      expect(result[0].checked).toBe(true);
      expect(result[1].checked).toBe(false);
    });
    it('parses verification commands', () => {
      writeFileSync(join(testDir, 'SPEC.md'), '### [ ] Build\nVerify: npm test\n', 'utf-8');
      expect(parseSpec(join(testDir, 'SPEC.md'))?.[0].verification).toBe('npm test');
    });
    it('parses body text', () => {
      writeFileSync(join(testDir, 'SPEC.md'), '### [ ] Item\nBody text here.\n', 'utf-8');
      expect(parseSpec(join(testDir, 'SPEC.md'))?.[0].body).toContain('Body');
    });
    it('returns null for non-existent file', () => { expect(parseSpec('/nonexistent/SPEC.md')).toBeNull(); });
  });

  describe('allChecked', () => {
    it('returns true when all checked', () => { expect(allChecked([{ name: 'A', checked: true, index: 1 }, { name: 'B', checked: true, index: 2 }])).toBe(true); });
    it('returns false when any unchecked', () => { expect(allChecked([{ name: 'A', checked: true, index: 1 }, { name: 'B', checked: false, index: 2 }])).toBe(false); });
    it('returns false for empty array', () => { expect(allChecked([])).toBe(false); });
  });

  describe('countChecked', () => {
    it('counts checked items', () => {
      expect(countChecked([{ name: 'A', checked: true, index: 1 }, { name: 'B', checked: false, index: 2 }, { name: 'C', checked: true, index: 3 }])).toBe(2);
    });
    it('returns 0 for empty array', () => { expect(countChecked([])).toBe(0); });
  });

  describe('estimateComplexity', () => {
    it('scores complex keywords higher', () => {
      const simple = { name: 'Simple', checked: false, index: 1 };
      const complex = { name: 'Async concurrent refactor', checked: false, index: 1 };
      expect(estimateComplexity(complex)).toBeGreaterThan(estimateComplexity(simple));
    });
  });

  describe('findReadyItems', () => {
    it('excludes checked items', () => {
      const items = [{ name: 'A', checked: true, index: 1 }, { name: 'B', checked: false, index: 2 }];
      expect(findReadyItems(items, inferDependencies(items)).every(i => !i.checked)).toBe(true);
    });
  });
});
