import { ChangeDetectionStrategy, Component, computed, effect, inject, untracked } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ShowcaseRouteData } from '../../models/showcase-route.model';
import MarkdownPageComponent from '../markdown-page/markdown-page.component';
import { ExampleViewerComponent } from '../example-viewer/example-viewer.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgComponentOutlet } from '@angular/common';
import { Observable } from 'rxjs';
import { MatTabLink, MatTabNav, MatTabNavPanel } from '@angular/material/tabs';
import { ApiDocsComponent } from '../api-docs/api-docs.component';
import { CdkScrollable } from '@angular/cdk/scrolling';

type ShowcaseTab = 'guide' | 'examples' | 'api';

@Component({
  selector: 'lab900-showcase-page',
  templateUrl: './showcase-page.component.html',
  styleUrls: ['./showcase-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MarkdownPageComponent,
    ExampleViewerComponent,
    NgComponentOutlet,
    MatTabNav,
    MatTabLink,
    MatTabNavPanel,
    RouterLink,
    ApiDocsComponent,
  ],
})
export class ShowcasePageComponent {
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly router: Router = inject(Router);

  protected readonly tabLabels: Record<ShowcaseTab, string> = {
    guide: 'Guide',
    examples: 'Examples',
    api: 'API',
  };

  public queryParams = toSignal(this.activatedRoute.queryParams);
  public currentTab = computed<ShowcaseTab>(() => this.queryParams()?.tab ?? 'examples');
  public data = toSignal<ShowcaseRouteData>(this.activatedRoute.data as Observable<ShowcaseRouteData>);
  public tabs = computed<ShowcaseTab[]>(() => {
    const data = this.data();
    return [...(data?.docFile ? ['guide' as const] : []), 'examples', ...(data?.api?.length ? ['api' as const] : [])];
  });

  public constructor() {
    const scrollContainer = inject(CdkScrollable, { optional: true });
    effect(() => {
      // a tab opens at the top, not at the scroll position of the previous tab
      this.currentTab();
      scrollContainer?.scrollTo({ top: 0 });
    });
    effect(() => {
      // keep the tab of the url when the page has it, so a link to ?tab=api opens the API tab
      if (this.tabs().includes(untracked(this.queryParams)?.['tab'])) {
        return;
      }
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: { tab: this.data()?.docFile ? 'guide' : 'examples' },
      });
    });
  }
}
