import { Request, Response } from 'express';

// In a real app, this would use a database (Supabase/PostgreSQL)
// For this MVP, we store users in memory or provide a mock
const mockUser = {
  id: 'user123',
  xp: 1250,
  streak: 5,
  level: 5,
  last_post_date: new Date().toISOString()
};

export const getUserStats = async (userId: string) => {
  return mockUser;
};

export const addXP = async (userId: string, amount: number) => {
  mockUser.xp += amount;
  // Level up logic (e.g. 500 XP per level)
  mockUser.level = Math.floor(mockUser.xp / 500) + 1;
  return mockUser;
};

export const updateStreak = async (userId: string) => {
  const today = new Date().toISOString().split('T')[0];
  const lastDate = mockUser.last_post_date.split('T')[0];

  if (today !== lastDate) {
    mockUser.streak += 1;
    mockUser.last_post_date = new Date().toISOString();
  }
  return mockUser;
};
