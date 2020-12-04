import PSQLDriver from '../driver/PSQLDriver';
import ArticleRepository from '../repository/ArticleRepository';
import ArticleUseCase, { IArticleUseCase } from '../usecase/ArticleUseCase';
import { Article } from '../entity/article';

export interface IArticleController {
  fetchAll: () => Promise<Article[]>
}
export default class ArticleController implements IArticleController {
  private readonly useCase: IArticleUseCase;

  constructor(driver: PSQLDriver) {
    this.useCase = new ArticleUseCase(new ArticleRepository(driver));
  }

  async fetchAll(): Promise<Article[]> {
    return await this.useCase.fetchArticles();
  };
};
