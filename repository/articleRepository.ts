import ArticleRepository from '../interface/repository/ArticleRepository';
import PSQLDriverImpl from '../interface/driver/PSQLDriver';
import { Article } from '../entity/article';
import { EntityRepository } from 'typeorm';

@EntityRepository(Article)
export default class ArticleRepositoryImpl implements ArticleRepository {
  private readonly psqlDriver: PSQLDriverImpl;

  constructor(psqlDriver: PSQLDriverImpl) {
    this.psqlDriver = psqlDriver;
  }

  async findAll(): Promise<Article[]> {
    await this.psqlDriver.getConnection();
    return [] as Article[];
  }
}
