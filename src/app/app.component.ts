import { Component } from '@angular/core';
import { TableComponent } from './components/table/component/table.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [TableComponent],
})
export class AppComponent {}
