import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'lab900-markdown-page',
  templateUrl: './markdown-page.component.html',
  styleUrls: ['./markdown-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MarkdownComponent],
})
export default class MarkdownPageComponent {
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  public readonly filePath = input<string | undefined>(undefined);
  protected routeFilePath = toSignal(
    this.activatedRoute.data.pipe(map((data: { filePath?: string }) => data?.filePath))
  );

  protected readonly path = computed(() => this.routeFilePath() ?? this.filePath());
}
