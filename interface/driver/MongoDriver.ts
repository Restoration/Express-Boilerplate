export default interface MongoDriver {
  connect: () => void;
  getData: (table: string) => void;
  insertData: (table: string, obj: object) => void;
  updateData: (table: string, query: any, values: any) => void;
  deleteData: (table: string, query: any) => void;
}
