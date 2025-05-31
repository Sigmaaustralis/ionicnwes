import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss']
})
export class CategoriasPage implements OnInit {
  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {}

  async logout() {
    await this.afAuth.signOut();
    this.router.navigate(['/login']);
  }
}
