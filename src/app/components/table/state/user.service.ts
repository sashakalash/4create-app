import { Injectable } from '@angular/core';
import { UserStore } from './user.store';
import { IUser } from '../../../interfaces/IUser.interface';
import { Observable } from 'rxjs';
import { UserQuery } from './user.query';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    private userStore: UserStore,
    private userQuery: UserQuery,
  ) {}


  private add(user: IUser) {
    this.userStore.add(user);
  }

  private update(id: number, user: Partial<IUser>) {
    this.userStore.update(id, user);
  }

  addUser(user: IUser): void {
    return this.add(user);
  }

  toggleActive(userId: number, status: boolean) {
    this.update(userId, { active: status });
  }

  setInitialUsers(users: IUser[]): void {
    this.userStore.upsertMany(users);
  }

  removeUser(userId: number) {
    this.userStore.remove(({ id }) => id === userId);
  }

  setLoading(): void {
    this.userStore.update({ loading: true })
  }

  unsetLoading(): void {
    this.userStore.update({ loading: false })
  }

  getAllUsers(): Observable<IUser[]> {
    this.setLoading();
    return this.userQuery.selectAll();
  }
}
