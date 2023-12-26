import { Component } from '@angular/core';

@Component({
  selector: 'app-connection-page',
  templateUrl: './connection-page.component.html',
  styleUrls: ['./connection-page.component.css']
})
export class ConnectionPageComponent {

  showConnect: boolean = true;
  showRegister: boolean = false;


  switchForms(){
    this.showRegister = !this.showRegister;
    this.showConnect = !this.showConnect;
  }
}
