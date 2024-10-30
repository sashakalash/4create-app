import { IUser } from '@/interfaces/IUser.interface';
import { UserQuery } from './../components/table-component/state/user.query';
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
} from 'rxjs/operators';

function isUsernameUnique(
  name: string,
  existedUsers: IUser[],
): Observable<boolean> {
  return of(
    existedUsers.find((u) => u.name.toLowerCase() === name.toLowerCase()),
  ).pipe(
    delay(1000),
    switchMap((user) => of(!!user)),
  );
}

export function nameUniqueValidator(userQuery: UserQuery): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value || control.pristine) {
      return of(null);
    }
    return of(control.value).pipe(
      debounceTime(500),
      switchMap((value) =>
        isUsernameUnique(value, userQuery.getAll()).pipe(
          map((isTaken: boolean) => (isTaken ? { userTaken: true } : null)),
          catchError(() => of(null)),
        ),
      ),
    );
  };
}
