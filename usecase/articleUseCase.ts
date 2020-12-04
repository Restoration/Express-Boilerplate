import { Article } from '../entity/Article';
import ArticleRepository from '../repository/ArticleRepository';

export interface IArticleUseCase {
  fetchArticles: () => Promise<Article[]>
}

export default class ArticleUseCase implements IArticleUseCase {
  readonly articleRepository: ArticleRepository;

  constructor(repository: ArticleRepository) {
    this.articleRepository = repository;
  }

  async fetchArticles(): Promise<Article[]> {
    return await this.articleRepository.findAll();
  }
}
