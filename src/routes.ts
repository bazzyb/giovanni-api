import express from 'express';
import { scheduler } from './index';

export const router = express.Router();

router.get('/orders', (_, res) => {
  const tasks = scheduler.getScheduledTasks();
  res.send(tasks);
});

router.post('/order', (req, res) => {
  scheduler.scheduleNewOrder(req.body);
  res.status(200).send('Order scheduled successfully');
});