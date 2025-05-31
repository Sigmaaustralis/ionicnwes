import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  news: any[] = [];
  loading = true;
  error = '';
  selectedCategory = 'general';
  searchTerm = '';

  constructor(private newsService: NewsService, private afAuth: AngularFireAuth, private router: Router) {}

  ionViewWillEnter() {
    this.getNews();
  }

  getNews() {
    this.loading = true;
    this.error = '';
    this.newsService.getTopHeadlines(this.selectedCategory).subscribe({
      next: (res) => {
        this.news = res.articles;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao buscar notícias.';
        this.loading = false;
      }
    });
  }

  searchNews() {
    if (this.searchTerm && this.searchTerm.length > 2) {
      this.loading = true;
      this.error = '';
      this.newsService.searchNews(this.searchTerm).subscribe({
        next: (res) => {
          this.news = res.articles;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Erro ao buscar notícias.';
          this.loading = false;
        }
      });
    } else {
      this.getNews();
    }
  }

  verNoticia(noticia: any) {
    this.router.navigate(['/detalhes'], { state: { noticia } });
  }

  async logout() {
    await this.afAuth.signOut();
    this.router.navigate(['/login']);
  }
}
