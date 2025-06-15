import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieserService } from '../services/categorieser.service';
import { ProduitservService } from '../services/produitserv.service';
import { Iproduit } from '../interfaces/iproduit';
import { CategorieInterface } from '../interfaces/categorie.interface';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalis',
  imports: [ReactiveFormsModule,CommonModule,],
  templateUrl: './detalis.component.html',
  styleUrl: './detalis.component.css'
})
export class DetalisComponent {


  categories:CategorieInterface[]=[]
  filteredCategorie:CategorieInterface[]=[];

  products:Iproduit[]=[];
  filteredProducts:Iproduit[]=[];
  categoryName: string = ''; 
  FamilleName:string='';
  num:Number=10;
  constructor(private router:Router,private servicecat:CategorieserService,private serviceprod:ProduitservService,private route: ActivatedRoute) {
  
  }
  ngOnInit(): void {
    // First load all products
    this.servicecat.getallcat().subscribe((res:CategorieInterface[])=>{
      // console.log(res)
      this.categories=res;
    })
    this.serviceprod.getallproduct().subscribe((res: Iproduit[]) => {
      this.products = res;

      // console.log('All products loaded:', this.products.length);
      
      // Then check route params
      this.route.queryParams.subscribe(params => {
        this.categoryName = params['category'];
        this.FamilleName=params['familleey'];
        this,this.num=params['nume'];
        // console.log('Category parameter:', this.categoryName);
        if (this.FamilleName) {
          console.log('Checking categories for famille:', this.FamilleName);
          this.categories.forEach(prod => {
            console.log(`Category ${prod.id} has famille_name:`, prod.famille_name, 
                        'Match?', prod.famille_name === this.FamilleName);
          });
          
          this.filteredCategorie = this.getcategorieByfamille(this.FamilleName);
        }
        if (this.categoryName) {
          this.filteredProducts = this.getProductsByCategory(this.categoryName);
          // console.log('Filtered products:', this.filteredProducts);
        } else {
          // If no category, show all products or empty array
          this.filteredProducts = this.products; // or = []
        }
      });
    });
  }

  getProductsByCategory(categoryName: string) {
    return this.products.filter(prod => prod.categorie_name === categoryName);
  }


  getProductsfinal(categoryName: string,FamilleName:string) {
    return this.products.filter(prod => prod.categorie_name === categoryName);
  }

  getcategorieByfamille(FamilleName: string) {
    if (!FamilleName || !this.categories) return [];
    
    // Trim and normalize both strings for comparison
    const searchName = FamilleName.trim().toLowerCase();
    
    return this.categories.filter(prod => {
      // Add null checks and normalization
      const prodFamille = prod.famille_name ? prod.famille_name.trim().toLowerCase() : '';
      return prodFamille === searchName;
    });
  }
}
