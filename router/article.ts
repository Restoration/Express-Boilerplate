import ArticleControllerImpl from '../controller/ArticleController';
import PSQLDriverImpl from '../driver/PSQLDriver';
import express from 'express';

const driver = new PSQLDriverImpl();
const articleController = new ArticleControllerImpl(driver);
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
