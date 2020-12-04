import ArticleController from '../controller/ArticleController';
import PSQLDriver from '../driver/PSQLDriver';
import express from 'express';

const driver = new PSQLDriver();
const articleController = new ArticleController(driver);
const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
  const result = await articleController.fetchAll();
  const obj = {};

  for (let i = 0, l = result.length; i < l; i += 1) {
    const data = result[i];
    obj[i] = data;
  }
  res.json(obj);
});

export default router;
