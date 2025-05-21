import { Component, Inject } from '@angular/core';
import { Ifamille } from '../interfaces/Ifamille';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FamileService } from '../services/famile.service';

@Component({
  selector: 'app-popup-famille',
  imports: [ReactiveFormsModule,CommonModule,],
  templateUrl: './popup-famille.component.html',
  styleUrl: './popup-famille.component.css'
})
export class PopupFamilleComponent {
  catobj: Ifamille={
    id:'',
    name:''
  }
  UpdateCategorieForm=new FormGroup( {
    name: new FormControl<string>('',{ nonNullable:true })
  } );
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { categorie: Ifamille },
    private servicefam: FamileService,
    private dialogRef: MatDialogRef<PopupFamilleComponent> // Add this
  ) {
    this.catobj = { ...data.categorie };
    // console.log(data.categorie);
  }


  showSuccessMessage = false;
  successMessage = '';
  showNameRequiredError = false; 

  
  OnsubmitFormUpdate(id: string): void {
    const categoryName = this.UpdateCategorieForm.value.name;
    if (this.UpdateCategorieForm.invalid) {
      console.warn('Form is invalidd');
      return;
    }
  
    const updatedData:Ifamille = {
      name: this.UpdateCategorieForm.value.name??'',
      id:id,
    };
    updatedData.name=this.UpdateCategorieForm.value.name??'';

   if(updatedData.name==''){
    this.showNameRequiredError = true; 
    
   }else{
    
    this.servicefam.updatecat(id, updatedData)
    .then(() => {
      // console.log('Category updated!');
      this.showNameRequiredError = false; 

      // Optionally close modal or reset form here
      this.showSuccessMessage=true;
    this.successMessage = 'Category updated successfully!';
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 2000);
    })
    .catch((error) => {
      console.error('Error updating category:', error);
    });
    
    
  
   }
  }

  closeDialog(): void {
    this.dialogRef.close();
  } 
}
