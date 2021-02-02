import express from 'express';

import { Scheduler } from './scheduler';

const scheduler = new Scheduler();

const PORT = 3000;
export const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/orders', (_, res) => {
  const tasks = scheduler.getScheduledTasks();
  res.send(tasks);
});

app.post('/order', (req, res) => {
  scheduler.scheduleNewOrder(req.body);
  res.status(200).send('Order scheduled successfully');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
