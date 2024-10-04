import { Component, Input, OnInit } from '@angular/core';


type colorbuttontype = "success" | "danger" | "warning" | "secondary" | "primary" ;
type buttontype = "button" | "submit" ;
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent  implements OnInit {
@Input({required: true}) value = "";
@Input() type: buttontype= "button";
@Input() color: colorbuttontype = "success";
@Input() disable = false;
  constructor() { }

  ngOnInit() {}

}
