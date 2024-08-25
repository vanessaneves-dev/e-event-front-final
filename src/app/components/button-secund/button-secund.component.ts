import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-secund',
  templateUrl: './button-secund.component.html',
  styleUrls: ['./button-secund.component.css']
})
export class ButtonSecundComponent {
  @Input() href: string = '';
  @Input() text: string = '';
  @Input() type: string = '';
}
