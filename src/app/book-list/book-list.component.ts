import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Book } from '../book';
import { map } from 'rxjs/operators';
import { BookService } from '../book.service';
import './style.css';
 
@Component({
 selector: 'app-book-list',
 styleUrls: ['./style.css'],
 template: `
   <h2 class="text-center m-5">Bibliothèque</h2>
   <button class="btn marginButton" (click)="refreshBooks(searchInput)">Actualiser</button>
   <div class="search-bar-container position-relative">
      <input #searchInput type="text" class="form-control" placeholder="Rechercher un livre" (input)="searchBook(searchInput.value)">

      <span class="position-absolute top-50 end-0 translate-middle-y me-3" (click)="clearSearch(searchInput)">
        X
      </span>
  </div>
   <table class="table table-striped table-bordered">
       <thead>
           <tr>
               <th>Nom</th>
               <th>Auteur</th>
                <th>Prix</th>
               <th>Type de livre</th>
                <th>Description</th>
               <th>Action</th>
           </tr>
       </thead>
 
       <tbody>
           <tr *ngFor="let book of book$ | async">
               <td>{{book.name}}</td>
               <td>{{book.auteur}}</td>
                <td>{{book.prix}}</td>
               <td>{{book.type}}</td>
                <td>{{book.description}}</td>
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
  private books: Book[] = [];
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
    this.book$.subscribe((books) => {
        this.books = books;
    });

 }
 clearSearch(inputElement: HTMLInputElement): void {
  inputElement.value = ''; // Efface le champ de saisie
  this.searchBook(''); // Appelle searchBook avec une chaîne vide pour réinitialiser le filtre
}

refreshBooks(inputElement: HTMLInputElement): void {
  this.fetchBook(); // Recharge la liste des livres
  inputElement.value = ''; // Réinitialise la barre de recherche
  this.book$ = of(this.books); // Remet la liste complète des livres
}

 searchBook(searchTerm: string): void {
  if (!searchTerm) {
    this.book$ = of(this.books);
    return;
  }
  console.log(searchTerm);
  console.log(this.books);  

  this.book$ = of(this.books.filter(book => 
    book.name?.toLowerCase().includes(searchTerm.toLowerCase())
  ));
}
}