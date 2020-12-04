import TaskController from '../controller/TaskController';
import MongoDriver from '../driver/MongoDriver';
import express from 'express';

const driver = new MongoDriver();
const taskController = new TaskController(driver);
const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
  const result = await taskController.fetchAll();
  const obj = {};

  for (let i = 0, l = result.length; i < l; i += 1) {
    const data = result[i];
    obj[i] = data;
  }
  res.json(obj);
});

export default router;
