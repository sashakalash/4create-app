import { HashMap, QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { UserStore } from './user.store';
import { IUser } from '@/interfaces/IUser.interface';
import { map } from 'rxjs';

export interface UsersState<Entity = IUser, IDType = number> {
  entities: HashMap<Entity>;
  ids: IDType[];
  loading: boolean;
  error: Error;
}

@Injectable({ providedIn: 'root' })
export class UserQuery extends QueryEntity<UsersState> {
  users$ = this.selectAll();
  isAddingUsersAllowed$ = this.selectAll().pipe(
    map(
      (users) =>
        users.length < 5 &&
        this.getCount(({ active }) => !active) === users.length,
    ),
  );

  constructor(protected override store: UserStore) {
    super(store);
  }
}
