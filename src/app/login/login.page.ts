import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { RegisterPage } from '../register/register.page';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    public toastController: ToastController) { }

  ionViewWillEnter() {
    this.authService.getToken().then(() => {
      if (this.authService.isLoggedIn) {
        this.navCtrl.navigateRoot('/home');
      }
    });
  }

  ngOnInit() {
  }

  async toastSuccess() {
    const toast = await this.toastController.create({
      message: 'Berhasil Login',
      duration: 2000
    });
    toast.present();
  }

  async toastError() {
    const toast = await this.toastController.create({
      message: 'Gagal Login',
      duration: 2000
    });
    toast.present();
  }

  loginDismiss() {
    this.modalController.dismiss();
  }

  async modalRegister() {
    this.loginDismiss();
    const modalRegister = await this.modalController.create({
      component: RegisterPage
    });

    return await modalRegister.present();
  }

  login(form: NgForm) {
    this.authService.login(form.value.email, form.value.password).subscribe(
      data => {
        this.toastSuccess();
      },
      error => {
        this.toastError();
      },
      () => {
        this.navCtrl.navigateRoot('/home');
      }
    );
  }

}
