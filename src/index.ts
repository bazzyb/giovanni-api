import express from 'express';

import { Scheduler } from './scheduler';
import { router } from './routes';

export const scheduler = new Scheduler();

const PORT = 3000;
export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
