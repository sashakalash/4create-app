import { map, Observable } from 'rxjs';
import { UserQuery } from '../state/user.query';
import { CommonModule } from '@angular/common';
import { ModalService } from '@/components/modal/state/modal.service';
import { Component, OnInit } from '@angular/core';
import { IUser } from '@/interfaces/IUser.interface';
import { UserService } from '../state/user.service';
import { UserModalComponent } from '@/components/modal/component/user-modal.component';
import { FormsModule } from '@angular/forms';
import { ToggleComponent } from '@/components/toggle/toggle-component.component';
import { USERS } from '@/constants';

@Component({
  selector: 'table-component',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [
    CommonModule,
    UserModalComponent,
    ToggleComponent,
    FormsModule,
  ],
  standalone: true,
})
export class TableComponent implements OnInit {
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
  ngOnInit(): void {
    this.userService.setInitialUsers(USERS)
    this.userService.getAllUsers().subscribe(() => this.userService.unsetLoading());
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
