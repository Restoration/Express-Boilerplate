
export class Article {
  readonly id: number;
  readonly title: string;
  readonly userId: number;
  readonly body: string;

  constructor(id: number, title: string, userId: number, body: string) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.body = body;
  }
}
