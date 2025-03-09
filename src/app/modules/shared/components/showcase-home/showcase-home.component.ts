import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ShowcaseConfigModel } from '../../models/showcase-config.model';
import { NavItemGroup } from '@lab900/ui';

import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'lab900-showcase-home',
  templateUrl: './showcase-home.component.html',
  styleUrls: ['./showcase-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, TranslateModule, RouterLink, MatButtonModule, AsyncPipe],
})
export default class ShowcaseHomeComponent {
  public data$: Observable<{
    config: ShowcaseConfigModel;
    nav: NavItemGroup[];
  }> = this.activatedRoute.data as any;

  public constructor(private activatedRoute: ActivatedRoute) {}
}
