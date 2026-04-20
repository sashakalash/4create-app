import { Injectable } from '@angular/core';
import { UserStore } from './modal.store';
import { IUser } from '../../../interfaces/IUser.interface';

@Injectable({ providedIn: 'root' })
export class ModalService {
  constructor(private userStore: UserStore) {}

  setInitialUsers(users: IUser[]): void {
    this.userStore.update({ users });
  }

  openModal(): void {
    this.userStore.update({ isModalOpen: true });
  }

  closeModal(): void {
    this.userStore.update({ isModalOpen: false });
  }
}
