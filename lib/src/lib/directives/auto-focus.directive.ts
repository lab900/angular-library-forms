import { Directive, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { MatInput } from '@angular/material/input';

@Directive({
  selector: '[lab900InputAutofocus]',
})
export class AutofocusDirective implements OnChanges {
  private matInput = inject(MatInput);

  /**
   * Focuses the `matInput` when it turns true, including later on, so a field revealed by a condition
   * still takes the caret. With more than one on a page the last one to turn true wins.
   * @default false
   */
  @Input()
  public autofocus = false;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.autofocus && changes.autofocus.currentValue === true) {
      setTimeout(() => {
        this.matInput.focus();
      });
    }
  }
}
