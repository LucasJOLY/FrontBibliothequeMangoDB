import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../book';
import { BookService } from '../book.service';
 
@Component({
 selector: 'app-edit-book.component.ts',
 template: `
   <h2 class="text-center m-5">Edit an Book</h2>
   <app-book-form [initialState]="book" (formSubmitted)="editBook($event)"></app-book-form>
 `
})
export class EditBookComponent implements OnInit {
 book: BehaviorSubject<Book> = new BehaviorSubject({});
 
 constructor(
   private router: Router,
   private route: ActivatedRoute,
   private bookService: BookService,
 ) { }
 
 ngOnInit() {
   const id = this.route.snapshot.paramMap.get('id');
   if (!id) {
     alert('Aucune id donné');
   }
 
   this.bookService.getBook(id !).subscribe((book) => {
     this.book.next(book);
   });
 }
 
 editBook(book: Book) {
   this.bookService.updateBook(this.book.value._id || '', book)
     .subscribe({
       next: () => {
         this.router.navigate(['/book']);
       },
       error: (error) => {
         alert('Erreur dans la mise a jour du livre');
         console.error(error);
       }
     })
 }
}