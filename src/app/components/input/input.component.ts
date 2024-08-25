import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @Input() type: string = '';
  @Input() text: string = '';
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() control!: FormControl;
  // @Input() placeholder: string = '';
  // @Input() for: string = '';
  // value: any = '';
  // onChange: (value: any) => void = () => {};
  // onTouched: () => void = () => {};

  // writeValue(value: any): void {
  //   this.value = value;
  // }

  // registerOnChange(fn: (value: any) => void): void {
  //   this.onChange = fn;
  // }

  // registerOnTouched(fn: () => void): void {
  //   this.onTouched = fn;
  // }

  // setDisabledState?(isDisabled: boolean): void {
  //   // Implementar lógica para desabilitar o input se necessário
  // }

  // handleChange(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   this.value = input.value;
  //   this.onChange(this.value);
  // }

  // handleBlur(): void {
  //   this.onTouched();
  // }
}
