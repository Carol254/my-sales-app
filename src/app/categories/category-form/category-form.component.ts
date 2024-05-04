import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { Category } from '../category.dto';


@Component({
  selector: 'category-category-form',
  standalone: true,
  imports: [
              MatButtonModule,
              MatCardModule,
              MatInputModule,
              ReactiveFormsModule
           ],
  templateUrl: './category-form.component.html',
  styles: ``
})
export class CategoryFormComponent implements OnInit{

  @Output() back = new EventEmitter();
  @Output() save = new EventEmitter<Category>();

  ngOnInit(): void {
  }
   
  private fb = inject(FormBuilder);

  categoryForm = this.fb.group(
    {
      id:[null],
      name:["", [Validators.required ,Validators.minLength(3)]],
      description:["", Validators.required]
    }
  );

  onSubmit(){
    console.log('button save clicked in the categoryformcomponent');
    this.save.emit(this.categoryForm.value as Category);
  }

  onBack(){
    this.back.emit();
  }
}
