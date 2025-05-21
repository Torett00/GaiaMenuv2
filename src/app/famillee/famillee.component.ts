import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Ifamille } from '../interfaces/Ifamille';
import { FamileService } from '../services/famile.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PopupFamilleComponent } from '../popup-famille/popup-famille.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-famillee',
  imports: [ReactiveFormsModule,CommonModule,],
  templateUrl: './famillee.component.html',
  styleUrl: './famillee.component.css'
})
export class FamilleeComponent {
  familles:Ifamille[]=[];

  constructor(private servicefam:FamileService,private router: Router,private dialogRef : MatDialog) {}
  navigateToprod(): void {
    this.router.navigate(['/prod']);  // Redirect to 'target' route
  }
  navigateToCategories(): void {
    this.router.navigate(['/dash']);  // Redirect to 'target' route
  }

  ngOnInit(): void {
    // this.getallcategore();

    this.servicefam.getallcat().subscribe((res:Ifamille[])=>{
      // console.log(res)
      this.familles=res;
    })
   
}
async openDialog(key:string){

  const cat: Ifamille | null = await this.servicefam.getCatById(key);

  if (cat) {
    // console.log(cat.id,'ssssss');
    // console.log("hello khaled hhh")
    this.dialogRef.open(PopupFamilleComponent, {
      data: {
        categorie: {
          name: cat.name,
          id: cat.id,
          
        }
      
    }});
    // console.log("hello khaled hhh2");
  } 
}

  catobj: Ifamille={
    id:'',
    name:'',
   
  }
  createCategorieForm=new FormGroup( {
    name: new FormControl<string>('',{ nonNullable:true ,validators:[Validators.required ,Validators.maxLength(30)]})
  } );


 addFamille(){
  const {value}= this.createCategorieForm
  
  if (this.createCategorieForm.value.name !== undefined )  {
    this.catobj.name = this.createCategorieForm.value.name;
   
  } else {
    this.catobj.name = ''; // Or another default value
  }
  
  this.servicefam.addcat(this.catobj);
  
 }
 onDeleteFamille(id:string){
  this.servicefam.delete(id);
}

showSuccessMessage = false;
successMessage = '';
showNameRequiredError = false;
name2:string='';
onFormSubmit(){
  // console.log(this.createCategorieForm.value.name);
 

  const categoryName = this.createCategorieForm.value.name; // Get the category name from the form

  // console.log('Category Name:', categoryName); // Log the category name (optional)

  if (categoryName ) {
    const categoryData = { name: categoryName };
    this.addFamille();
    this.showNameRequiredError = false; 
    // Show success message
    this.showSuccessMessage = true;
    this.successMessage = 'Famille added successfully!';
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 2000);
    this.createCategorieForm.reset();
    // Call the addCategory method and handle the result
    // console.log('Category is there!',categoryData);
  } else {
    this.showNameRequiredError = true; 
    // console.log('Category name is required!');
  }

}
}
