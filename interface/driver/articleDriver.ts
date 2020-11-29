export default interface ArticleDriver {
  findAll: () => Promise<ArticleJson[]>
}

export interface ArticleJson {
  id: number
  title: string
  userId: number
  body: string
}
