import { Component } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  scanner: any;
  content: HTMLElement;
  IMG: HTMLElement;
  resultado = '';

  currentOrientation: string = '';

  constructor(
    private qrScanner: QRScanner,
    public alertController: AlertController,
    private platform: Platform, 
    private screenOrientation: ScreenOrientation
  ) { 
    this.platform.backButton.subscribeWithPriority(0, () => {
      this.content.style.opacity = '1';
      this.resultado ='';
      this.qrScanner.hide();
      this.scanner.unsubscribe();
    });
  }

  detectOrientation(){
    // detect orientation changes
    this.screenOrientation.onChange().subscribe(
      () => {
        
        this.exibirAlerta2(this.screenOrientation.type);
        
      }
    );
  }
  
  lerQrCode() {
    this.content = document.getElementsByTagName('ion-content')[0];

    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {

          // camera permission was granted --> deixando a tela transparente
          this.content.style.opacity = "0";


          // start scanning
          this.scanner = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);

            this.resultado = (text['result'])? text['result'] : text;
            this.content.style.opacity = '1';
            this.exibirAlerta(this.resultado);
            
            this.qrScanner.hide(); // hide camera preview
            this.scanner.unsubscribe(); // stop scanning
          });

        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }

  async exibirAlerta(mensagem:string) {
    const alert = await this.alertController.create({
      header: 'QRScanner',
      message: mensagem,
      buttons: ['OK']
    });

    await alert.present();

  }

  async exibirAlerta2(mensagem:string) {
    const alert = await this.alertController.create({
      header: 'Mudança de Orientação',
      message: mensagem,
      buttons: ['OK']
    });
    await alert.present();
  }

}
