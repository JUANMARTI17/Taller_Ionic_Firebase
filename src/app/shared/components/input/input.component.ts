import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';


type buttontype = "text" | "number" | "tel" | "email" | "password";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent  implements OnInit {
  @Input() label: string = "";
  @Input() control = new FormControl();
  @Input() type: buttontype = "text";
  constructor() { }

  ngOnInit() {}

  public setValue(event: any) {
    // console.log(event.target.value);
    this.control.setValue(event.target.value);
  }

}
