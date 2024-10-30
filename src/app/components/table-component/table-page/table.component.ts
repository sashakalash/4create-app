import { UserService } from '@/components/table-component/state/user.service';
import { map, Observable } from 'rxjs';
import { UserQuery } from './../state/user.query';
import { CommonModule } from '@angular/common';
import { ModalService } from './../../modal/state/modal.service';
import { Component } from '@angular/core';
import { IUser } from '@/interfaces/IUser.interface';

@Component({
  selector: 'table-component',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class TableComponent {
  users$: Observable<IUser[]> = this.userQuery.users$;
  isDisabled$ = this.userQuery.isAddingUsersAllowed$.pipe(map((v) => !v));
  isDisabled!: boolean;

  constructor(
    private modalService: ModalService,
    private userQuery: UserQuery,
    private userService: UserService,
  ) {
    this.isDisabled$.subscribe((res) => (this.isDisabled = res));
  }

  toggleActive({ id, active }: IUser) {
    this.userService.toggleActive(id, !active);
  }

  openModal() {
    if (this.isDisabled) {
      return;
    }
    this.modalService.openModal();
  }
}
