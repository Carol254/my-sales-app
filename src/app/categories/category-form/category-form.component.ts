import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";


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
export class CategoryFormComponent {
   
  private fb = inject(FormBuilder);

  categoryForm = this.fb.group(
    {
      id:[null],
      name:["", [Validators.required ,Validators.minLength(3)]],
      description:["", Validators.required]
    }
  );
}
