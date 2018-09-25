import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root = 'HomePage';
  tab2Root = 'NewsPage';
  tab3Root = 'EventsPage';
  tab4Root = 'ProgramsPage';

  constructor() {
  }
}
