import { Article } from '../../entity/Article';

export default interface ArticleRepository {
  findAll: () => Promise<Article[]>
}
