import {
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-toggle',
  standalone: true,
  templateUrl: './toggle-component.component.html',
  styleUrl: './toggle-component.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleComponent),
      multi: true,
    },
  ],
})
export class ToggleComponent implements ControlValueAccessor {
  @Input() value!: boolean;

  onChange = (val: boolean) => {};
  onTouched = () => {};

  onInputChange(): void {
    this.value = !this.value;
    this.onChange(this.value);
  }

  writeValue(value: boolean): void {
    this.value = value;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
