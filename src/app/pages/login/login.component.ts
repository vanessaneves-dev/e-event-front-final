import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  activeTab: string = 'tab1';

  openTab(tabName: string): void {
    this.activeTab = tabName;
  }
}
