import PSQLDriver from '../driver/PSQLDriver';
import { Article } from '../entity/article';
import { EntityRepository } from 'typeorm';

export interface IArticleRepository {
  findAll: () => Promise<Article[]>
}

@EntityRepository(Article)
export default class ArticleRepository implements IArticleRepository {
  private readonly psqlDriver: PSQLDriver;

  constructor(psqlDriver: PSQLDriver) {
    this.psqlDriver = psqlDriver;
  }

  async findAll(): Promise<Article[]> {
    await this.psqlDriver.getConnection();
    return [] as Article[];
  }
}
