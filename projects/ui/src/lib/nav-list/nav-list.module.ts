import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { NavItemComponent } from './components/nav-item/nav-item.component';
import { NavListComponent } from './components/nav-list/nav-list.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [NavListComponent, NavItemComponent],
  imports: [CommonModule, MatListModule, TranslateModule],
  exports: [NavListComponent],
})
export class Lab900NavListModule {}