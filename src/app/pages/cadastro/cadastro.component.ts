import { Component } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  activeTab: string = 'tab1';

  openTab(tabName: string): void {
    this.activeTab = tabName;
  }
}
