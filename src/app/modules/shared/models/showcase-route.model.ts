import { Route } from '@angular/router';
import { ShowcasePageComponent } from '../components/showcase-page/showcase-page.component';
import { Type } from '@angular/core';
import { ShowcaseExample } from './showcase-example.model';
import { ShowcaseApiSection } from './showcase-api.model';

export interface ShowcaseRouteData {
  title: string;
  path: string;
  examples?: ShowcaseExample[];
  docFile?: string;
  api?: ShowcaseApiSection[];
}
export class ShowcaseRoute implements Route {
  public component: Type<any> = ShowcasePageComponent;
  public data: ShowcaseRouteData;

  /**
   * @param path
   * @param title
   * @param examples
   * @param docFile
   * @param api the sections of the API tab; the tab is hidden without them
   */
  public constructor(
    public path: string,
    title: string,
    examples?: ShowcaseExample[],
    docFile?: string,
    api?: ShowcaseApiSection[]
  ) {
    this.data = { title, path, examples, docFile, api };
  }
}
