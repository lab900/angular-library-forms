import { Injectable } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { NgxMatMomentAdapter } from '@angular-material-components/moment-adapter';

@Injectable({ providedIn: 'root' })
export class CustomDateAdapter extends MomentDateAdapter {
  public static DATE = 'dd/MM/yyyy';
  public static DATE_FORMATS = {
    parse: {
      dateInput: 'DD/MM/YYYY',
    },
    display: {
      dateInput: 'DD/MM/YYYY',
      monthYearLabel: 'MMMM YYYY',
      dateA11yLabel: 'DD/MM/YYYY',
      monthYearA11yLabel: 'MMMM YYYY',
    },
  };

  public constructor() {
    super('nl');
  }

  public getFirstDayOfWeek(): number {
    return 2;
  }
}

@Injectable({ providedIn: 'root' })
export class CustomDateTimeAdapter extends NgxMatMomentAdapter {
  public static DATE_TIME = 'dd/MM/yyyy, HH:mm';
  public static DATE_FORMATS = {
    parse: {
      dateInput: 'DD/MM/YYYY, HH:mm',
    },
    display: {
      dateInput: 'DD/MM/YYYY, HH:mm',
      monthYearLabel: 'MMMM YYYY',
      dateA11yLabel: 'dd/MM/yyyy',
      monthYearA11yLabel: 'MMMM YYYY',
    },
  };

  public constructor() {
    super('nl');
  }

  public getFirstDayOfWeek(): number {
    return 2;
  }
}
