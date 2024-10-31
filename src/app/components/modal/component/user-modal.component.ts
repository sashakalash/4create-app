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
import { ModalQuery } from '../state/modal.query';
import { NameUniquenessValidator } from '@/services/user-name-validator';
import { UserQuery } from '@/components/table/state/user.query';
import { UserService } from '@/components/table/state/user.service';
import { ToggleComponent } from '@/components/toggle/toggle-component.component';
import { SpinnerComponent } from '@/components/spinner/spinner.component';

@Component({
  selector: 'user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToggleComponent,
    SpinnerComponent,
  ],
})
export class UserModalComponent implements AfterViewInit {
  userForm: FormGroup;
  isModalOpen$: Observable<boolean> = this.modalQuery.isModalOpen$;
  loading$ = this.userQuery.loading$;
  @ViewChild('modalOverlay') modalOverlayRef!: ElementRef;
  @ViewChild('modal') modalRef!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private modalQuery: ModalQuery,
    private modalService: ModalService,
    private userService: UserService,
    private userQuery: UserQuery,
    private nameUniquenessValidator: NameUniquenessValidator,
  ) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required], [nameUniquenessValidator.validate()]],
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
    this.userForm.valueChanges.subscribe(() => console.log(this.userForm))

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
    this.userForm.reset({ emitEvent: false });
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
