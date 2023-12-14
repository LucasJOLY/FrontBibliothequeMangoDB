import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../book';
 
@Component({
 selector: 'app-book-form',
 template: `
   <form class="book-form" autocomplete="off" [formGroup]="bookForm" (ngSubmit)="submitForm()">
     <div class="form-floating mb-3">
       <input class="form-control" type="text" id="name" formControlName="name" placeholder="Name" required>
       <label for="name">Name</label>
     </div>
 
     <div *ngIf="name.invalid && (name.dirty || name.touched)" class="alert alert-danger">
       <div *ngIf="name.errors?.['required']">
         Le nom est obligatoire
       </div>
       <div *ngIf="name.errors?.['minlength']">
         Le nom doit avoir une taille de 3 minimum
       </div>
     </div>
 
     <div class="form-floating mb-3">
       <input class="form-control" type="text" formControlName="position" placeholder="Position" required>
       <label for="position">Position</label>
     </div>
 
     <div *ngIf="position.invalid && (position.dirty || position.touched)" class="alert alert-danger">
 
       <div *ngIf="position.errors?.['required']">
         La position est obligatoire
       </div>
       <div *ngIf="position.errors?.['minlength']">
       Le position doit avoir une taille de 5 minimum
       </div>
     </div>
 
     <div class="mb-3">
       <div class="form-check">
         <input class="form-check-input" type="radio" formControlName="level" name="level" id="level-junior" value="junior" required>
         <label class="form-check-label" for="level-junior">Junior</label>
       </div>
       <div class="form-check">
         <input class="form-check-input" type="radio" formControlName="level" name="level" id="level-mid" value="mid">
         <label class="form-check-label" for="level-mid">Mid</label>
       </div>
       <div class="form-check">
         <input class="form-check-input" type="radio" formControlName="level" name="level" id="level-senior"
           value="senior">
         <label class="form-check-label" for="level-senior">Senior</label>
       </div>
     </div>
 
     <button class="btn btn-primary" type="submit" [disabled]="bookForm.invalid">Add</button>
   </form>
 `,
 styles: [
   `.book-form {
     max-width: 560px;
     margin-left: auto;
     margin-right: auto;
   }`
 ]
})
export class BookFormComponent implements OnInit {
 @Input()
 initialState: BehaviorSubject<Book> = new BehaviorSubject({});
 
 @Output()
 formValuesChanged = new EventEmitter<Book>();
 
 @Output()
 formSubmitted = new EventEmitter<Book>();
 
 bookForm: FormGroup = new FormGroup({});
 
 constructor(private fb: FormBuilder) { }
 
 get name() { return this.bookForm.get('name')!; }
 get position() { return this.bookForm.get('position')!; }
 get level() { return this.bookForm.get('level')!; }
 
 ngOnInit() {
   this.initialState.subscribe(book => {
     this.bookForm = this.fb.group({
       name: [ book.name, [Validators.required] ],
       position: [ book.position, [ Validators.required, Validators.minLength(5) ] ],
       level: [ book.level, [Validators.required] ]
     });
   });
 
   this.bookForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
 }
 
 submitForm() {
   this.formSubmitted.emit(this.bookForm.value);
 }
}