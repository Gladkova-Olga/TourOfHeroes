import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handlerError<Hero[]>('getHeroes', []))
    );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_=> this.log(`fetched hero id=${id}`)),
      catchError(this.handlerError<Hero>(`get hero id=${id}`))
    )
    
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`)
        }
        
  private heroesUrl = 'api/heroes';
  private handlerError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message} `);
      return of(result as T);
    }
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handlerError<any>('update hero'))
    )
  }
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handlerError<Hero>('added hero'))
    );
  }
  deleteHero(id: number): Observable<Hero> {
    const url = `{${this.heroesUrl}/${id}}`;
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_=>this.log(`deleled hero id=${id}`)),
      catchError(this.handlerError<Hero>('delete hero'))
    );
  }



      
}
