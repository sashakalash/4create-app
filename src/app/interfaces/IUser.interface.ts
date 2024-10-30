export interface IUser {
  id: number;
  name: string;
  active: boolean;
}

export function createUser(params: Partial<IUser>) {
  return { ...params } as IUser;
}
