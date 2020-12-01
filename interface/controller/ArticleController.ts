import { Article } from '../../entity/Article';

export default interface ArticleController {
  fetchAll: () => Promise<Article[]>
}
