import { Component, Input } from '@angular/core';
import { TableRowAction } from '../../models/table-action.model';
import { TooltipPosition } from '@angular/material/tooltip';

@Component({
  selector: 'lab900-table-action',
  templateUrl: './table-action.component.html',
})
export class Lab900TableActionComponent {
  @Input()
  public action: TableRowAction;

  @Input()
  public element: any;

  public get actionLabel(): string {
    return this.getLabel(this.action);
  }

  public get tooltipPosition(): TooltipPosition {
    return this.action?.tooltip?.position ?? 'above';
  }

  public getLabel(action: TableRowAction): string {
    return typeof action?.label === 'function' ? action.label(this.element) : action.label;
  }
}
