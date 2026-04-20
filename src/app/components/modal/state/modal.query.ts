import { Query } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { ModalState, UserStore } from './modal.store';

@Injectable({ providedIn: 'root' })
export class ModalQuery extends Query<ModalState> {
  isModalOpen$ = this.select('isModalOpen');

  constructor(protected override store: UserStore) {
    super(store);
  }
}
