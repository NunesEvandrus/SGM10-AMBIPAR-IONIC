import { Component } from '@angular/core';
import { InternoSplitPanelController } from 'src/app/interno/interno-split-panel.controller';

@Component({
  selector: 'app-menu-toggle',
  templateUrl: './menu-toggle.component.html',
  styleUrls: ['./menu-toggle.component.scss'],
})
export class MenuToggleComponent {
  constructor(private readonly internoMenuCtrl: InternoSplitPanelController) {}

  async toggleSplitPanel() {
    this.internoMenuCtrl.disable = !this.internoMenuCtrl.disable;
  }
}
