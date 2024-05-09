import {
  Button,
  Cell,
  CellGroup,
  Search,
  Dialog,
  Loading,
  Overlay,
  Sticky,
  Tab,
  Tabs,
  Form,
  Field,
  Uploader,
} from 'vant';
import type { App } from 'vue';

export function setupVant(app: App<Element>) {
  app
    .use(Button)
    .use(CellGroup)
    .use(Cell)
    .use(Search)
    .use(Dialog)
    .use(Loading)
    .use(Overlay)
    .use(Sticky)
    .use(Form)
    .use(Field)
    .use(Uploader)
    .use(Tab)
    .use(Tabs);
}
