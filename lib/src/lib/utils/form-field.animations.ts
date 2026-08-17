import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

/**
 * Animation that transitions the error and hint messages of a form field.
 *
 * Angular Material exported this as `matFormFieldAnimations.transitionMessages` and removed it in v21.
 * The form fields in this library render their own subscript wrapper instead of a `mat-form-field`, so
 * Material's own styling does not cover them. The trigger keeps the name and the timings Material used,
 * which keeps the templates and the behaviour unchanged.
 */
export const transitionMessages: AnimationTriggerMetadata = trigger('transitionMessages', [
  state('enter', style({ opacity: 1, transform: 'translateY(0%)' })),
  transition('void => enter', [
    style({ opacity: 0, transform: 'translateY(-5px)' }),
    animate('300ms cubic-bezier(0.55, 0, 0.55, 0.2)'),
  ]),
]);
