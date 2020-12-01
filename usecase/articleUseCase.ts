import { Article } from '../entity/Article';
import { ArticleUseCase } from '../interface/usecase/ArticleUseCase';
import ArticleRepository from '../interface/repository/ArticleRepository';

export default class ArticleUseCaseImpl implements ArticleUseCase {
  readonly articleRepository: ArticleRepository;

  constructor(repository: ArticleRepository) {
    this.articleRepository = repository;
  }

  async fetchArticles(): Promise<Article[]> {
    return await this.articleRepository.findAll();
  }
}
