import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../book';
import { BookService } from '../book.service';
 
@Component({
 selector: 'app-book-list',
 template: `
   <h2 class="text-center m-5">Bibliothèque</h2>
 
   <table class="table table-striped table-bordered">
       <thead>
           <tr>
               <th>Nom</th>
               <th>Position</th>
               <th>Niveau</th>
               <th>Action</th>
           </tr>
       </thead>
 
       <tbody>
           <tr *ngFor="let book of book$ | async">
               <td>{{book.name}}</td>
               <td>{{book.position}}</td>
               <td>{{book.level}}</td>
               <td>
                   <button class="btn btn-primary me-1" [routerLink]="['edit/', book._id]">Mettre a jour</button>
                   <button class="btn btn-danger" (click)="deleteBook(book._id || '')">Supprimer</button>
               </td>
           </tr>
       </tbody>
   </table>
 
   <button class="btn btn-primary mt-3" [routerLink]="['new']">Ajouter un livre</button>
 `
})
export class BookListComponent implements OnInit {
 book$: Observable<Book[]> = new Observable();
 
 constructor(private bookService: BookService) { }
 
 ngOnInit(): void {
   this.fetchBook();
 }
 
 deleteBook(id: string): void {
   this.bookService.deleteBook(id).subscribe({
     next: () => this.fetchBook()
   });
 }
 
 private fetchBook(): void {
   this.book$ = this.bookService.getBooks();
 }
}