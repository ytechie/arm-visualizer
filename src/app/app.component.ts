import { Component, Input, OnInit } from '@angular/core';
import { ToasterContainerComponent, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';

import { FEEDBACK_TOAST, TemplateService } from './shared/index';
import { MenuBarComponent, SidebarComponent, WorkbenchComponent } from './shared/index';

declare const __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [
    MenuBarComponent,
    SidebarComponent,
    WorkbenchComponent,
    ToasterContainerComponent
  ],
  providers: [ToasterService]
})
export class AppComponent implements OnInit {
  private isRunningInVsCode = false;

  constructor(private templateService: TemplateService) {
    window.addEventListener('message', event => {
      this.templateService.loadTemplate(event.data);
      this.isRunningInVsCode = true;
    });
  }
}
