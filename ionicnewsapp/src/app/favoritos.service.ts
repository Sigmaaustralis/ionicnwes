import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FavoritosService {
  private storageKey = 'favoritos';

  getFavoritos(): any[] {
    const fav = localStorage.getItem(this.storageKey);
    return fav ? JSON.parse(fav) : [];
  }

  addFavorito(noticia: any) {
    const favoritos = this.getFavoritos();
    if (!favoritos.find((n: any) => n.url === noticia.url)) {
      favoritos.push(noticia);
      localStorage.setItem(this.storageKey, JSON.stringify(favoritos));
    }
  }

  removeFavorito(noticia: any) {
    let favoritos = this.getFavoritos();
    favoritos = favoritos.filter((n: any) => n.url !== noticia.url);
    localStorage.setItem(this.storageKey, JSON.stringify(favoritos));
  }

  isFavorito(noticia: any): boolean {
    return this.getFavoritos().some((n: any) => n.url === noticia.url);
  }
}
