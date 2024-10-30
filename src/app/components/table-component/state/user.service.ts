import { Injectable } from '@angular/core';
import { UserStore } from './user.store';
import { IUser } from '../../../interfaces/IUser.interface';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private userStore: UserStore) {}

  addUser(user: IUser): void {
    return this.userStore.add(user);
  }

  toggleActive(userId: number, status: boolean) {
    this.update(userId, { active: status });
  }

  setInitialUsers(users: IUser[]): void {
    this.userStore.upsertMany(users);
  }

  add(user: IUser) {
    this.userStore.add(user);
  }

  update(id: number, user: Partial<IUser>) {
    this.userStore.update(id, user);
  }

  removeUser(userId: number) {
    this.userStore.remove(({ id }) => id === userId);
  }
}
