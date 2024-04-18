import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowcaseRouteData } from '../../models/showcase-route.model';
import { Lab900PageHeaderComponent, PageHeaderNavItem } from '@lab900/ui';
import { SubscriptionBasedDirective } from '../../directives/subscription-based.directive';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MarkdownPageComponent } from '../markdown-page/markdown-page.component';
import { ExampleViewerComponent } from '../example-viewer/example-viewer.component';

@Component({
  selector: 'lab900-showcase-page',
  templateUrl: './showcase-page.component.html',
  styleUrls: ['./showcase-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MarkdownPageComponent,
    ExampleViewerComponent,
    Lab900PageHeaderComponent,
  ],
})
export class ShowcasePageComponent extends SubscriptionBasedDirective {
  private readonly guideNav: PageHeaderNavItem = {
    label: 'Guide',
    queryParams: { tab: 'guide' },
  };

  private readonly exampleNav: PageHeaderNavItem = {
    label: 'Examples',
    queryParams: { tab: 'examples' },
  };

  public currentTab?: 'guide' | 'examples';
  public data?: ShowcaseRouteData;
  public navItems: PageHeaderNavItem[] = [];

  public constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    super();
    this.addSubscription(this.activatedRoute.queryParams, (queryParams) => {
      this.data = this.activatedRoute.snapshot.data as ShowcaseRouteData;
      if (queryParams?.tab) {
        this.currentTab = queryParams?.tab;
      } else {
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: { tab: this.data?.docFile ? 'guide' : 'examples' },
        });
      }
      this.navItems = !this.data?.docFile
        ? [this.exampleNav]
        : [this.guideNav, this.exampleNav];
    });
  }
}
