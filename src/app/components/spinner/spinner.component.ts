import { ISpinnerConfig } from '@/interfaces/ISpinnerConfig.interface';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
})
export class SpinnerComponent {
  @Input() config: ISpinnerConfig = {
    height: 10,
    width: 10,
    margin: 5,
  };
}
