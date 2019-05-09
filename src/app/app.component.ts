import { Component, Input, OnInit } from '@angular/core';
import { ToasterContainerComponent, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import { Router } from '@angular/router';

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

  constructor(private router: Router, private templateService: TemplateService) {
    let isVsEmbed = window.location.href.indexOf('vsembed') >= 0;
    if(isVsEmbed) {
      console.log('Running in embedded mode. URL: ' + window.location.href);

      this.isRunningInVsCode = true;
      this.templateService.loadTemplate(
        `{
          "$schema": "https://schema.management.azure.com/schemas/2015-01-01/deploymentTemplate.json#",
          "contentVersion": "",
          "parameters": {  },
          "variables": {  },
          "functions": [  ],
          "resources": [  ],
          "outputs": {  }
      }`);
    }

    window.addEventListener('message', event => {
      console.log('Designer received template. Size: ' + event.data.template);
      console.log(event);
      this.templateService.loadTemplate(event.data.template);
    });
  }
}
