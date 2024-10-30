import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { UserModalComponent } from './components/modal/component/user-modal.component';
import { TableComponent } from './components/table-component/table-page/table.component';
import { BrowserModule } from '@angular/platform-browser';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';

@NgModule({
  imports: [
    BrowserModule,
    TableComponent,
    UserModalComponent,
    AkitaNgDevtools.forRoot(),
  ],
  exports: [TableComponent, UserModalComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
