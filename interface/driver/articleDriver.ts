export default interface ArticleDriver {
    findAll(): Promise<ArticleJson[]>;
}

export type ArticleJson = {
  id: number;
  title: string;
  userId: number;
  body: string;
};