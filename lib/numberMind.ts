export type NumberQuestion = {
  bit: number;
  numbers: number[];
};

export function buildQuestions(): NumberQuestion[] {
  const questions: NumberQuestion[] = [];

  for (let bit = 0; bit < 7; bit += 1) {
    const mask = 1 << bit;
    const numbers: number[] = [];

    for (let number = 1; number <= 100; number += 1) {
      if ((number & mask) !== 0) numbers.push(number);
    }

    questions.push({ bit, numbers });
  }

  return questions;
}

export function calculateNumber(questions: NumberQuestion[], answers: boolean[]): number {
  return questions.reduce((sum, question, index) => {
    if (!answers[index]) return sum;
    return sum + (1 << question.bit);
  }, 0);
}

export function shuffle<T>(items: T[], seed: number): T[] {
  const result = [...items];
  let state = (seed + 1) * 9301 + 49297;

  for (let i = result.length - 1; i > 0; i -= 1) {
    state = (state * 233280 + 49297) % 233280;
    const j = Math.floor((state / 233280) * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}
