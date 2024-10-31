import { UserService } from '@/components/table/state/user.service';
import { IUser } from '@/interfaces/IUser.interface';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import {
  switchMap,
  map,
  delay,
  catchError,
  debounceTime,
  take,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NameUniquenessValidator {
  constructor(private userService: UserService) {}

  validate(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value || control.pristine) {
        return of(null);
      }
      return this.userService.getAllUsers().pipe(
        debounceTime(500),
        take(1),
        delay(3000), //backend request simulation
        map((users: IUser[]) =>
          users.find(
            (u) => u.name.toLowerCase() === control?.value?.toLowerCase(),
          ),
        ),
        switchMap((isTaken: IUser | undefined) => {
          this.userService.unsetLoading();
          return isTaken ? of({ userTaken: true }) : of(null);
        }),
        catchError(() => {
          this.userService.unsetLoading();
          return of(null);
        }),
      );
    };
  }
}
