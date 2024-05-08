import { Category } from './category.dto';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { CategoriesDataSource, CategoriesItem } from './categories-datasource';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from './category.service';
import { lastValueFrom } from 'rxjs';
import { CategoryFormComponent } from './category-form/category-form.component';
import { MatIconModule } from '@angular/material/icon';
import { LoadingBarComponent } from '../loading-bar.component';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styles: `
    .full-width-table {
      width: 100%;
    }
    
  `,
  standalone: true,
  imports: [MatTableModule, 
            MatPaginatorModule, 
            MatSortModule,
            MatTableModule,
            MatPaginatorModule,
            MatSortModule,
            MatCardModule,
            MatButtonModule,
            MatIconModule,
            CategoryFormComponent,
            LoadingBarComponent
          ]
})
export class CategoriesComponent implements AfterViewInit,OnInit {

  showForm:Boolean = false;
  showLoading:Boolean = false;

  constructor(private categoryService:CategoryService){}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CategoriesItem>;
  dataSource = new MatTableDataSource<Category>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name','description','actions'];

  category!:Category;

  ngOnInit(): void {}
   
  onNewCategoryClick(){
    this.category = {
      id: 0,
      name: "",
      description: "",
      };
      this.showForm = true;
      
  }

  hideCategoryForm(){
    this.showForm = false;
    this.loadCategories();
  }

  onEditCategory(category:Category){
    console.log("edit category",category);
    this.category = {
      id:category.id,
      name:category.name,
      description:category.description
    }
    this.showForm = true;
  }

  async onDeleteCategoryClick(category:Category) {
    if (confirm(`Delete "${category.name}" with id ${category.id} ?`)) {
      this.showLoading = true;
    await lastValueFrom(this.categoryService.delete(category.id));
     this.showLoading = false;
     this.loadCategories();
    }
    }

  onSave(category:Category){
    const saved = lastValueFrom(this.categoryService.save(category));
    console.log('saved', saved);
    this.hideCategoryForm();
  }


  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.loadCategories();
  }

  async loadCategories():Promise<void>{
    this.showLoading = true;
    const categories = await lastValueFrom(this.categoryService.getAll());
    this.dataSource = new MatTableDataSource(categories);

    this.table.dataSource = this.dataSource;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
     this.showLoading = false;
  }

 
}
