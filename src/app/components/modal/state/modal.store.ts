import { EntityState, Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface ModalState extends EntityState<boolean> {
  isModalOpen: boolean;
}

export function createInitialState(): ModalState {
  return {
    isModalOpen: false,
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'modal' })
export class UserStore extends Store<ModalState> {
  constructor() {
    super(createInitialState());
  }
}
