import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-main',
  templateUrl: './button-main.component.html',
  styleUrls: ['./button-main.component.css']
})
export class ButtonMainComponent {
  @Input() href: string = '';
  @Input() text: string = '';
  @Input() type: string = '';

  
}
