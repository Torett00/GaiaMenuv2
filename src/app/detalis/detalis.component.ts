import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategorieserService } from '../services/categorieser.service';
import { ProduitservService } from '../services/produitserv.service';
import { Iproduit } from '../interfaces/iproduit';
import { CategorieInterface } from '../interfaces/categorie.interface';
import { FamileService } from '../services/famile.service';
import { Ifamille } from '../interfaces/Ifamille';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalis',
  imports: [CommonModule],
  templateUrl: './detalis.component.html',
  styleUrl: './detalis.component.css'
})
export class DetalisComponent {
  FamilleName: string = '';
  categoriesList: CategorieInterface[] = []
  productsList: Iproduit[] = [];
  filteredProducts: Iproduit[] = [];
  filteredCategorie: CategorieInterface[] = [];
  FamilleList: Ifamille[] = [];
  groupedProducts: { [key: string]: Iproduit[] } = {};

  constructor(private router: Router,
    private serviceprod: ProduitservService,
    private servicecat: CategorieserService,
    private famileService: FamileService) {
  }
  ngOnInit(): void {
    if (this.famileService.getfamilename() == "") {
      this.router.navigateByUrl("/home");
    }
    this.loaddata();
    setTimeout(() => {
      this.filtredData();
    }, 2000);
  }
  loaddata() {
    this.servicecat.getallcat().subscribe({
      next: (response) => {
        this.categoriesList = response;
      }
    })
    this.serviceprod.getallproduct().subscribe({
      next: (response) => {
        this.productsList = response;
      }
    })
    this.famileService.getallcat().subscribe({
      next: (response) => {
        this.FamilleList = response;
      }
    })
  }

  filtredData() {
    this.FamilleName = this.famileService.getfamilename();

    this.filteredCategorie = this.categoriesList.filter(cat =>
      cat.famille_name === this.FamilleName
    );

    const categorieNames = this.filteredCategorie.map(cat => cat.name);

    this.filteredProducts = this.productsList.filter(prod =>
      categorieNames.includes(prod.categorie_name)
    );
    this.groupedProducts = {};
    this.filteredProducts.forEach(product => {
      const category = product.categorie_name;
      if (!this.groupedProducts[category]) {
        this.groupedProducts[category] = [];
      }
      this.groupedProducts[category].push(product);
    });
  }
}