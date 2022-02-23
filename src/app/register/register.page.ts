import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public error = [];

  constructor(private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    public toastController: ToastController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.authService.getToken().then(() => {
      if (this.authService.isLoggedIn) {
        this.navCtrl.navigateRoot('/home');
      }
    });
  }

  loginDismiss() {
    this.modalController.dismiss();
  }

  async toast(message: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  register(form: NgForm) {
    this.authService.register(form.value.username, form.value.email, form.value.password).subscribe(
      data => {
        this.authService.login(form.value.email, form.value.password).subscribe(
          data => {
            this.toast('Daftar sukses');
            // console.log(data);
          },
          error => {
            this.error = error['status'];
            if (this.error == ['500']) {
              this.toast("Email sudah terdaftar. Silahkan login!");
            } else {
              this.toast("Input yang benar");
            }

            console.log(error);

          },
          () => {
            this.loginDismiss();

            this.navCtrl.navigateRoot('/home');
          }
        );
        this.toast(data['message']);
      },
      error => {
        this.error = error['status'];
        if (this.error == ['500']) {
          this.toast("Email sudah terdaftar. Silahkan Login!");
        } else {
          this.toast("Input yang benar");
        }

        // this.toast(error['status']);
        console.log(error['message']);
      }
    )
  }

}
