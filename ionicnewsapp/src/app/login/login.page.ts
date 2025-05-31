import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email = '';
  password = '';
  registerEmail = '';
  registerPassword = '';
  showRegister = false;
  errorMessage = '';

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  async login() {
    this.errorMessage = '';
    try {
      await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
      this.router.navigate(['/home']);
    } catch (error: any) {
      this.errorMessage = this.getErrorMessage(error);
    }
  }

  async register() {
    this.errorMessage = '';
    try {
      await this.afAuth.createUserWithEmailAndPassword(this.registerEmail, this.registerPassword);
      this.showRegister = false;
      this.email = this.registerEmail;
      this.password = this.registerPassword;
      this.registerEmail = '';
      this.registerPassword = '';
      this.errorMessage = 'Conta criada! Faça login.';
    } catch (error: any) {
      this.errorMessage = this.getErrorMessage(error);
    }
  }

  getErrorMessage(error: any): string {
    if (error.code === 'auth/user-not-found') return 'Usuário não encontrado.';
    if (error.code === 'auth/wrong-password') return 'Senha incorreta.';
    if (error.code === 'auth/email-already-in-use') return 'E-mail já cadastrado.';
    if (error.code === 'auth/invalid-email') return 'E-mail inválido.';
    if (error.code === 'auth/weak-password') return 'Senha fraca (mínimo 6 caracteres).';
    return 'Erro: ' + error.message;
  }
}
