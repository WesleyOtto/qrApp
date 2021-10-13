import { Component } from '@angular/core';
import { Platform } from '@ionic/angular'; 

import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [ ScreenOrientation]
})

export class AppComponent {
  constructor( ) { }
 
  
}
