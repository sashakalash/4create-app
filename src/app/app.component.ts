import { UserService } from '@/components/table-component/state/user.service';
import { Component } from '@angular/core';
import { TableComponent } from './components/table-component/table-page/table.component';
import { UserModalComponent } from './components/modal/component/user-modal.component';

const USERS = [
  { id: 1, name: 'User1', active: true },
  { id: 2, name: 'User2', active: false },
  { id: 3, name: 'User3', active: true },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [TableComponent, UserModalComponent],
})
export class AppComponent {
  constructor(private userService: UserService) {
    this.userService.setInitialUsers(USERS);
  }
}
