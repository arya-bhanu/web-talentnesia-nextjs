import { create } from 'zustand'

type Score = {
  questionId: string;
  answerId: string | null;
  score: number;
}

type ScoreState = {
  scores: Record<string, Score[]>;
  setScores: (userId: string, scores: Score[]) => void;
  getScores: (userId: string) => Score[];
  clearScores: () => void;
}

export const useScoreStore = create<ScoreState>((set, get) => ({
  scores: {},
  setScores: (userId, scores) => set(state => ({ 
    scores: { ...state.scores, [userId]: scores } 
  })),
  getScores: (userId) => get().scores[userId] || [],
  clearScores: () => set({ scores: {} }),
}))
