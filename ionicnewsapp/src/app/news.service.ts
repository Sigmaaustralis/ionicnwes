import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NewsService {
  private apiKey = 'e47bd2c1061b48cea7db244c6e091c1c'; // Chave da NewsAPI
  private apiUrl = 'https://newsapi.org/v2/top-headlines';

  constructor(private http: HttpClient) {}

  getTopHeadlines(category: string = 'general', country: string = 'br'): Observable<any> {
    return this.http.get(`${this.apiUrl}?country=${country}&category=${category}&apiKey=${this.apiKey}`);
  }

  searchNews(query: string, country: string = 'br'): Observable<any> {
    return this.http.get(`${this.apiUrl}?country=${country}&q=${query}&apiKey=${this.apiKey}`);
  }
}
