export type SymbolItem = {
  id: number;
  symbol: string;
  name: string;
};

export type SymbolQuestion = {
  bit: number;
  symbols: SymbolItem[];
};

export const SYMBOLS: SymbolItem[] = [
  { id: 1, symbol: "🌙", name: "พระจันทร์" },
  { id: 2, symbol: "🔥", name: "เปลวไฟ" },
  { id: 3, symbol: "💎", name: "เพชร" },
  { id: 4, symbol: "⚡", name: "สายฟ้า" },
  { id: 5, symbol: "🦋", name: "ผีเสื้อ" },
  { id: 6, symbol: "🍀", name: "ใบโคลเวอร์" },
  { id: 7, symbol: "⭐", name: "ดาว" },
  { id: 8, symbol: "👑", name: "มงกุฎ" },
  { id: 9, symbol: "🖤", name: "หัวใจสีดำ" },
  { id: 10, symbol: "👁️", name: "ดวงตา" },
  { id: 11, symbol: "🌊", name: "คลื่น" },
  { id: 12, symbol: "☀️", name: "พระอาทิตย์" },
  { id: 13, symbol: "🔮", name: "ลูกแก้ว" },
  { id: 14, symbol: "🕯️", name: "เทียน" },
  { id: 15, symbol: "🗝️", name: "กุญแจ" },
  { id: 16, symbol: "🌹", name: "กุหลาบ" },
];

export function buildSymbolQuestions(): SymbolQuestion[] {
  return [0, 1, 2, 3].map((bit) => {
    const mask = 1 << bit;
    return {
      bit,
      symbols: SYMBOLS.filter((item) => (item.id & mask) !== 0),
    };
  });
}

export function calculateSymbolId(questions: SymbolQuestion[], answers: boolean[]): number {
  return questions.reduce((sum, question, index) => {
    if (!answers[index]) return sum;
    return sum + (1 << question.bit);
  }, 0);
}

export function findSymbol(id: number): SymbolItem | undefined {
  return SYMBOLS.find((item) => item.id === id);
}

export function shuffleSymbols<T>(items: T[], seed: number): T[] {
  const result = [...items];
  let state = (seed + 3) * 7919 + 104729;
  for (let i = result.length - 1; i > 0; i -= 1) {
    state = (state * 48271) % 2147483647;
    const j = state % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
