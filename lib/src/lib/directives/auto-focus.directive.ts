import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatLegacyInput as MatInput } from '@angular/material/legacy-input';

@Directive({
  selector: '[lab900InputAutofocus]',
})
export class AutofocusDirective implements OnChanges {
  @Input()
  public autofocus = false;

  public constructor(private matInput: MatInput) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.autofocus && changes.autofocus.currentValue === true) {
      setTimeout(() => {
        this.matInput.focus();
      });
    }
  }
}
