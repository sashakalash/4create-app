import { UserQuery } from './../../table-component/state/user.query';
import { fromEvent, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ModalService } from '../state/modal.service';
import { createUser, IUser } from '@/interfaces/IUser.interface';
import { UserService } from '@/components/table-component/state/user.service';
import { ModalQuery } from '../state/modal.query';
import { nameUniqueValidator } from '@/services/user-name-validator';

@Component({
  selector: 'user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class UserModalComponent implements AfterViewInit {
  userForm: FormGroup;
  isModalOpen$: Observable<boolean> = this.modalQuery.isModalOpen$;
  @ViewChild('modalOverlay') modalOverlayRef!: ElementRef;
  @ViewChild('modal') modalRef!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private modalQuery: ModalQuery,
    private modalService: ModalService,
    private userService: UserService,
    private userQuery: UserQuery,
  ) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required], [nameUniqueValidator(this.userQuery)]],
      active: [false],
    });
  }

  ngAfterViewInit(): void {
    fromEvent(this.modalOverlayRef.nativeElement, 'click').subscribe(() => {
      this.closeModal();
    });
    fromEvent(this.modalRef.nativeElement, 'click').subscribe((event) => {
      (event as Event).stopPropagation();
    });
  }

  submit() {
    if (this.userForm.valid) {
      this.addUser();
    }
  }

  close() {
    this.modalService.closeModal();
  }

  closeModal() {
    this.close();
    this.userForm.reset({ active: false });
  }

  addUser() {
    if (this.userForm.invalid) {
      return;
    }
    const newUser: IUser = createUser({
      ...this.userForm.value,
      id: this.userQuery.getCount() + 1,
    });
    this.userService.addUser(newUser);
    this.closeModal();
  }
}
