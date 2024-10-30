import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { IUser } from '@/interfaces/IUser.interface';
import { Injectable } from '@angular/core';
import { UsersState } from './user.query';

export interface UserState extends EntityState<IUser, number> {
  users: IUser[];
}

export function createInitialState(): UserState {
  return {
    users: [],
    newUser: {} as IUser,
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'users' })
export class UserStore extends EntityStore<UsersState> {
  constructor() {
    super();
  }
}
