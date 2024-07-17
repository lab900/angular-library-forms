import { ShowcaseConfigModel } from '../shared/models/showcase-config.model';
import packageInfo from 'lib/package.json';

export const showcaseFormsConfig: ShowcaseConfigModel = {
  title: 'forms.title',
  description: 'forms.description',
  icon: 'dynamic_form',
  version: packageInfo.version,
};
