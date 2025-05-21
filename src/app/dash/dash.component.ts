import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Firestore ,doc,addDoc, collection, collectionData} from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategorieInterface } from '../interfaces/categorie.interface';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { CommonModule } from '@angular/common';
import { CategorieserService } from '../services/categorieser.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { Router } from '@angular/router';
import { Ifamille } from '../interfaces/Ifamille';
import { FamileService } from '../services/famile.service';



Validators

@Component({
  selector: 'app-dash',
  imports: [ReactiveFormsModule,CommonModule,],
  templateUrl: './dash.component.html',
  styleUrl: './dash.component.css'
})
export class DashComponent implements OnInit {

  catgeoriges:CategorieInterface[]=[];
  familles:Ifamille[]=[];
  catobjaupdate: CategorieInterface={
    id:'',
    name:'',
    famille_name:''
  }
  
  constructor(private servicecat:CategorieserService,private servicefam:FamileService,private dialogRef : MatDialog,private router: Router) {}

  
  navigateToprod(): void {
    this.router.navigate(['/prod']);  // Redirect to 'target' route
  }
  navigateToFamille(): void {
    this.router.navigate(['/fam']);  // Redirect to 'target' route
  }
  navigateToHome(): void {
    this.router.navigate(['/home']);  // Redirect to 'target' route
  }
  navigateToProducts(categoryName: string) {
    this.router.navigate(['/cat'], { queryParams: { category: categoryName } });
    // or if you want to use route parameters:
    // this.router.navigate(['/products', categoryName]);
  }
 async openDialog(key:string){

    const cat: CategorieInterface | null = await this.servicecat.getCatById(key);

    if (cat) {
      // console.log(cat.id,'ssssss');
      // console.log("hello khaled hhh")
      this.dialogRef.open(PopupComponent, {
        data: {
          categorie: {
            name: cat.name,
            id: cat.id,
            
          }
        
      }});
      // console.log("hello khaled hhh2");
    } 
  }
  ngOnInit(): void {
    // this.getallcategore();

    this.servicecat.getallcat().subscribe((res:CategorieInterface[])=>{
      // console.log(res)
      this.catgeoriges=res;
    })
    this.servicefam.getallcat().subscribe((res2:Ifamille[])=>{
      // console.log(res2)
      this.familles=res2;
    })
   
}

  // constructor(private firestore: AngularFirestore) {}
  
  catobj: CategorieInterface={
    id:'',
    name:'',
    famille_name:'' 
  }
  
  createCategorieForm=new FormGroup( {
    name: new FormControl<string>('',{ nonNullable:true ,validators:[Validators.required ,Validators.maxLength(30)]}),
    famille_name: new FormControl<string>('',{ nonNullable:true ,validators:[Validators.required ,Validators.maxLength(30)]}),

  } );


 addCategor(){
  const {value}= this.createCategorieForm
  
  if (this.createCategorieForm.value.name !== undefined )  {
    this.catobj.name = this.createCategorieForm.value.name;
   
  } else {
    this.catobj.name = ''; // Or another default value
  }
  
  this.servicecat.addcat(this.catobj);
  
 }

 onDeleteCategorie(id:string){
    this.servicecat.delete(id);
  }
  showNameRequiredError2=false;
  showSuccessMessage = false;
  successMessage = '';
  showNameRequiredError = false;
  name2:string='';


  onFormSubmit(){
    // console.log(this.createCategorieForm.value.name);
   
 
    const categoryName = this.createCategorieForm.value.name; // Get the category name from the form
    const famille_name = this.createCategorieForm.value.famille_name; 

    // console.log('Category Name:', categoryName); // Log the category name (optional)
    if (famille_name) {
    this.showNameRequiredError2 = false; 
      // Call the addCategory method and handle the result
      // console.log('Category is there!',categoryData);
    } else {
      this.showNameRequiredError2 = true; 

      // console.log('Category name is required!');
    }
    if (categoryName ) {
      const categoryData = { name: categoryName };
      this.showNameRequiredError = false; 
    }else{
      this.showNameRequiredError = true; 

    }
    if(this.showNameRequiredError2==false && this.showNameRequiredError==false) {

      this.addCategor();
     
      // Show success message
      this.showSuccessMessage = true;
      this.successMessage = 'Category added successfully!';
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 2000);
      this.createCategorieForm.reset();
      // Call the addCategory method and handle the result
      // console.log('Category is there!',categoryData);
    } 

  }


  

}
