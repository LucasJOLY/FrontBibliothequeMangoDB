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
       <label for="name">Nom du Livre</label>
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
      <input class="form-control" type="text" formControlName="auteur" placeholder="Auteur" required>
      <label for="auteur">Nom de l'Auteur</label>
    </div>
    <div *ngIf="auteur.invalid && (auteur.dirty || auteur.touched)" class="alert alert-danger">
       <div *ngIf="auteur.errors?.['required']">
         Le nom de l'auteur obligatoire
       </div>
    </div>
    <div class="form-floating mb-3">
    <input class="form-control" type="number" formControlName="prix" placeholder="Prix" required>
    <label for="prix">Prix</label>
    </div>
    <div *ngIf="prix.invalid && (prix.dirty || prix.touched)" class="alert alert-danger">
       <div *ngIf="prix.errors?.['required']">
         Le prix est obligatoire
       </div>
    </div>
     <div class="mb-3">
      <label for="type">Type de Livre</label>
      <select class="form-select" id="type" formControlName="type" required>
        <option value="">Choisir...</option>
        <option value="Bande déssinée">Bande dessinée</option>
        <option value="Roman">Roman</option>
        <option value="Biographie">Biographie</option>
        <option value="Science Fiction">Science-fiction</option>
        <option value="Fantasy">Fantasy</option>
      </select>
     </div>
     <div *ngIf="type.invalid && (type.dirty || type.touched)" class="alert alert-danger">
       <div *ngIf="type.errors?.['required']">
         Le type de livre est obligatoire
       </div>
    </div>
     <div class="form-floating mb-3">
      <textarea class="form-control" formControlName="description" placeholder="Description" required></textarea>
      <label for="description">Description</label>
    </div>
    <div *ngIf="description.invalid && (description.dirty || description.touched)" class="alert alert-danger">
       <div *ngIf="description.errors?.['required']">
         La description est obligatoire
       </div>
    </div>

 
     <button class="btn btn-primary" type="submit" [disabled]="bookForm.invalid">Ajouter</button>
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
 get auteur() { return this.bookForm.get('auteur')!; }
 get type() { return this.bookForm.get('type')!; }
  get prix() { return this.bookForm.get('prix')!; }
  get description() { return this.bookForm.get('description')!; }
 
 ngOnInit() {
   this.initialState.subscribe(book => {
     this.bookForm = this.fb.group({
       name: [ book.name, [Validators.required] ],
       auteur: [ book.auteur, [ Validators.required ] ],
        prix: [ book.prix, [ Validators.required ] ],
        description : [ book.description, [ Validators.required ] ],
       type: [ book.type, [Validators.required] ]
     });
   });
   console.log(this.bookForm);
   
   this.bookForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
 }
 
 submitForm() {
   this.formSubmitted.emit(this.bookForm.value);
 }
}