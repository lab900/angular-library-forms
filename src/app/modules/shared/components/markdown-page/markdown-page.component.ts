import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { SubscriptionBasedDirective } from '../../directives/subscription-based.directive';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'lab900-markdown-page',
  templateUrl: './markdown-page.component.html',
  styleUrls: ['./markdown-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MarkdownModule],
})
export default class MarkdownPageComponent extends SubscriptionBasedDirective {
  private activatedRoute = inject(ActivatedRoute);

  @Input()
  public filePath?: string;

  public constructor() {
    super();
    this.addSubscription(
      this.activatedRoute.data.pipe(
        filter(data => !!data?.filePath),
        take(1)
      ),
      data => {
        this.filePath = data.filePath;
      }
    );
  }
}
