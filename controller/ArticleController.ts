import PSQLDriver from '../interface/driver/PSQLDriver';
import ArticleRepositoryImpl from '../repository/ArticleRepository';
import ArticleUseCaseImpl from '../usecase/ArticleUseCase';
import ArticleRepository from '../interface/repository/ArticleRepository';
import ArticleController from '../interface/controller/ArticleController';
import { Article } from '../entity/article';

export default class ArticleControllerImpl implements ArticleController {
  private readonly articleRepository: ArticleRepository;

  constructor(driver: PSQLDriver) {
    this.articleRepository = new ArticleRepositoryImpl(driver);
  }

  async fetchAll(): Promise<Article[]> {
    const useCase = new ArticleUseCaseImpl((this.articleRepository));
    return await useCase.fetchArticles();
  };
};
