import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Book } from './book';
 
@Injectable({
 providedIn: 'root'
})
export class BookService {
 private url = 'http://localhost:5200';
 private book$: Subject<Book[]> = new Subject();
 
 constructor(private httpClient: HttpClient) { }
 
 private refreshBook() {
   this.httpClient.get<Book[]>(`${this.url}/book`)
     .subscribe(book => {
       this.book$.next(book);
     });
 }
 
 getBooks(): Subject<Book[]> {
   this.refreshBook();
   return this.book$;
 }
 
 getBook(id: string): Observable<Book> {
   return this.httpClient.get<Book>(`${this.url}/book/${id}`);
 }
 
 createBook(book: Book): Observable<string> {
   return this.httpClient.post(`${this.url}/book`, book, { responseType: 'text' });
 }
 
 updateBook(id: string, book: Book): Observable<string> {
   return this.httpClient.put(`${this.url}/book/${id}`, book, { responseType: 'text' });
 }
 
 deleteBook(id: string): Observable<string> {
   return this.httpClient.delete(`${this.url}/book/${id}`, { responseType: 'text' });
 }
}