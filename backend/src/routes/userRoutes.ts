import { Router } from 'express';
import * as userService from '../services/userService.js';

const router = Router();

router.get('/stats', async (req, res) => {
  const stats = await userService.getUserStats('user123');
  res.json(stats);
});

router.post('/activity', async (req, res) => {
  const stats = await userService.updateStreak('user123');
  // Simple XP for activity: 50 XP
  const updated = await userService.addXP('user123', 50);
  res.json(updated);
});

export default router;
