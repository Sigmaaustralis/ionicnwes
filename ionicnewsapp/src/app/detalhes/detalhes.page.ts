import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FavoritosService } from '../favoritos.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})
export class DetalhesPage implements OnInit {
  noticia: any;
  isFav = false;
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private favoritosService: FavoritosService
  ) {
    const nav = this.router.getCurrentNavigation();
    this.noticia = nav?.extras.state && nav.extras.state['noticia'];
    if (this.noticia) {
      this.isFav = this.favoritosService.isFavorito(this.noticia);
    }
  }

  ngOnInit() {}

  async logout() {
    await this.afAuth.signOut();
    this.router.navigate(['/login']);
  }

  toggleFavorito() {
    if (this.isFav) {
      this.favoritosService.removeFavorito(this.noticia);
      this.isFav = false;
    } else {
      this.favoritosService.addFavorito(this.noticia);
      this.isFav = true;
    }
  }
}
