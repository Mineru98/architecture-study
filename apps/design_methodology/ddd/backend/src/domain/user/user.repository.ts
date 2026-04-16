export interface IUserRepository {
  findByEmail(email: string): Promise<any | null>;
  findById(id: string): Promise<any | null>;
  save(user: any): Promise<any>;
  count(): Promise<number>;
}
