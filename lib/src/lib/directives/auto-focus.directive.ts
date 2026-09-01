import { Directive, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { MatInput } from '@angular/material/input';

@Directive({
  selector: '[lab900InputAutofocus]',
})
export class AutofocusDirective implements OnChanges {
  private matInput = inject(MatInput);

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
