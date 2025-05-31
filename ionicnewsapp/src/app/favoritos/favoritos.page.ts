import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FavoritosService } from '../favoritos.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss']
})
export class FavoritosPage implements OnInit {
  favoritos: any[] = [];
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private favoritosService: FavoritosService
  ) { }

  ngOnInit() {
    this.loadFavoritos();
  }

  ionViewWillEnter() {
    this.loadFavoritos();
  }

  loadFavoritos() {
    this.favoritos = this.favoritosService.getFavoritos();
  }

  async logout() {
    await this.afAuth.signOut();
    this.router.navigate(['/login']);
  }

  verNoticia(noticia: any) {
    this.router.navigate(['/detalhes'], { state: { noticia } });
  }

  removerFavorito(noticia: any) {
    this.favoritosService.removeFavorito(noticia);
    this.loadFavoritos();
  }
}
