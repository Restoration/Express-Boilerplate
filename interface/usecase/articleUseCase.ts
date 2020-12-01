import { Article } from '../../entity/Article';

export interface ArticleUseCase {
  fetchArticles: () => Promise<Article[]>
}
