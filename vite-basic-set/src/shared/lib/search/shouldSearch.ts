/**
 * @file shared/lib/search/shouldSearch.ts
 *
 * FSD Layer: shared/lib
 * Purpose:
 *  - Provide a small "search gate" utility deciding whether a raw query
 *    is long / meaningful enough to execute an expensive tree or global search.
 *  - Unified rules for Korean + English + numeric IDs.
 *
 * Typical Usage (in a component):
 *  const gate = shouldSearch(query);
 *  const effectiveQuery = gate.allow ? query : "";
 *  ...
 *  {!gate.allow && query && <Hint>{gate.reason}</Hint>}
 *
 * Design Goals:
 *  - Keep logic pure / side‑effect free (easy to test & reuse).
 *  - Avoid premature indexing; simple O(1) classification.
 *  - Provide extensibility via options object.
 *
 * Default Rules (tuned for call‑center / org trees):
 *  1) Empty -> block
 *  2) ID patterns (e.g. AG1234, EMP00123, pure digits length>=4) -> allow immediately
 *  3) ≥2 tokens (split by whitespace) -> allow
 *  4) Single token:
 *     - Length 1: block (give reason)
 *        * Hangul syllable (가, 나...) -> need 2 chars
 *        * Hangul choseong (ㄱ, ㄴ...) -> need 2 initial consonants
 *        * Latin / digit -> need 2 chars
 *     - Length ≥2: allow
 *
 * Extensibility:
 *  - Add fuzzy: pass { fuzzyMinLength: 3 } and handle externally once allow=true.
 *  - Add custom immediateAllow regex via options.immediateAllow.
 */

//////////////////////
// Character Ranges //
//////////////////////

const CHOSEONG_START = 0x3131; // ㄱ
const CHOSEONG_END = 0x314e;   // ㅎ
const HANGUL_SYLLABLE_START = 0xac00; // 가
const HANGUL_SYLLABLE_END = 0xd7a3;   // 힣

function isHangulChoseong(ch: string): boolean {
  if (!ch) return false;
  const code = ch.charCodeAt(0);
  return code >= CHOSEONG_START && code <= CHOSEONG_END;
}

function isHangulSyllable(ch: string): boolean {
  if (!ch) return false;
  const code = ch.charCodeAt(0);
  return code >= HANGUL_SYLLABLE_START && code <= HANGUL_SYLLABLE_END;
}

//////////////////////
// ID Pattern Rules //
//////////////////////

// Example: AG1234, EMP0001, A12345 (prefix up to 3 letters + >=3 digits)
const GENERIC_ID_PATTERN = /^[A-Z]{0,3}\d{3,}$/i;
// Pure numeric with meaningful length
const PURE_NUMERIC_ID_PATTERN = /^\d{4,}$/;
// Simple hex-like (e.g. internal short IDs) length >= 6
const HEXISH_ID_PATTERN = /^[0-9a-f]{6,}$/i;

export interface SearchGateOptions {
  /**
   * Additional regex patterns that, if matched, should allow immediate search.
   * Use for domain-specific IDs (e.g. campaign codes).
   */
  immediateAllow?: RegExp[];
  /**
   * Minimum length for generic single-token queries (Latin / digit / Hangul syllable).
   * Default: 2
   */
  minLength?: number;
  /**
   * Minimum length for a single token composed only of Hangul initial consonants (choseong).
   * Default: 2
   */
  minChoseongLength?: number;
  /**
   * If true, allow single Korean syllable (length=1) queries (some back offices want this).
   * Default: false
   */
  allowSingleHangulSyllable?: boolean;
}

export interface SearchGateResult {
  allow: boolean;
  reason?: string;
}

/**
 * Decide whether to run search for the given raw input.
 * @param raw - User input string
 * @param options - (Optional) override defaults
 */
export function shouldSearch(
  raw: string,
  options: SearchGateOptions = {},
): SearchGateResult {
  const {
    immediateAllow = [],
    minLength = 2,
    minChoseongLength = 2,
    allowSingleHangulSyllable = false,
  } = options;

  const q = (raw ?? "").trim();
  if (!q) return { allow: false, reason: "검색어를 입력하세요" };

  // 1. Immediate allow (ID patterns & custom)
  if (
    GENERIC_ID_PATTERN.test(q) ||
    PURE_NUMERIC_ID_PATTERN.test(q) ||
    HEXISH_ID_PATTERN.test(q) ||
    immediateAllow.some((r) => r.test(q))
  ) {
    return { allow: true };
  }

  // 2. Token-based rule
  const tokens = q.split(/\s+/);
  if (tokens.length >= 2) {
    // Multi-token queries are usually specific enough
    return { allow: true };
  }

  // 3. Single token analysis
  if (q.length === 1) {
    const ch = q[0];

    // Hangul syllable (가 ~ 힣)
    if (isHangulSyllable(ch)) {
      if (allowSingleHangulSyllable) return { allow: true };
      return { allow: false, reason: "한글 두 글자 이상 입력하세요" };
    }

    // Hangul choseong (ㄱ ~ ㅎ)
    if (isHangulChoseong(ch)) {
      return { allow: false, reason: "초성은 두 개 이상 입력하세요" };
    }

    // Latin / digit / others
    if (/[A-Za-z0-9]/.test(ch)) {
      return { allow: false, reason: "두 글자 이상 입력하세요" };
    }

    return { allow: false, reason: "검색어가 너무 짧습니다" };
  }

  // 4. All choseong (e.g. ㄱㄴ, ㄱㄴㄷ) case
  if ([...q].every(isHangulChoseong)) {
    if (q.length < minChoseongLength) {
      return { allow: false, reason: `초성은 ${minChoseongLength}개 이상 입력하세요` };
    }
    return { allow: true };
  }

  // 5. Generic minimum length for single token (syllable / latin / digit mixture)
  if (q.length < minLength) {
    return { allow: false, reason: `${minLength}글자 이상 입력하세요` };
  }

  return { allow: true };
}

//////////////////////////////
// Helper: Debounced Hook  //
//////////////////////////////

/**
 * Optional hook to debounce an input before passing it to shouldSearch.
 * Keep in shared/lib only if you want central reuse (can be moved to shared/hooks).
 */
import { useEffect, useState } from "react";

export function useDebouncedValue<T>(value: T, delay = 150): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

////////////////////
// Example Usage  //
////////////////////

/*
const query = useInputState(); // pseudo
const debounced = useDebouncedValue(query, 140);
const gate = shouldSearch(debounced);

const effectiveQuery = gate.allow ? debounced : "";
return (
  <>
    <input value={query} onChange={e => setQuery(e.target.value)} />
    {!gate.allow && debounced && <small className="text-gray-500">{gate.reason}</small>}
    <ResultList query={effectiveQuery} />
  </>
);
*/
