import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ShowcaseConfigModel } from '../../models/showcase-config.model';
import { NavItemGroup } from '@lab900/ui';
import { TranslatePipe } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'lab900-showcase-home',
  templateUrl: './showcase-home.component.html',
  styleUrls: ['./showcase-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, RouterLink, MatIcon, MatButton],
})
export default class ShowcaseHomeComponent {
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  protected readonly data = toSignal<{
    config: ShowcaseConfigModel;
    nav: NavItemGroup[];
  }>(
    this.activatedRoute.data as Observable<{
      config: ShowcaseConfigModel;
      nav: NavItemGroup[];
    }>
  );
}
