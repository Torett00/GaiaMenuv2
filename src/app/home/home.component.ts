import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable, from } from 'rxjs';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { CategorieserService } from '../services/categorieser.service';
import { ProduitservService } from '../services/produitserv.service';
import { CategorieInterface } from '../interfaces/categorie.interface';
import { CureentUserService } from '../cureent-user.service';
import { Iproduit } from '../interfaces/iproduit';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../filter-pipe';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  authService=inject(AuthService);
  firebaseAuth=inject(Auth);
  catgeoriges:CategorieInterface[]=[];
  products:Iproduit[]=[];

  
constructor(private router:Router,private servicecat:CategorieserService,private serviceprod:ProduitservService,private servicecurentuser:CureentUserService) {
  
}
navigateToProducts(categoryName: string,Famliename:string) {
  this.router.navigate(['/cat'], { queryParams: { category: categoryName } });
  // or if you want to use route parameters:
  // this.router.navigate(['/products', categoryName]);
}
getProductsByCategory(categoryName: string) {
  return this.products.filter(prod => prod.categorie_name === categoryName);
}
  ngOnInit(): void {
    this.servicecat.getallcat().subscribe((res:CategorieInterface[])=>{
      // console.log(res)
      this.catgeoriges=res;
      // this.catgeoriges = res.sort((b, a) => a.name.localeCompare(b.name));

    })

    this.serviceprod.getallproduct().subscribe((res:Iproduit[])=>{
        // console.log(res)
      this.products =res;
  })
}

  navigateToDetalis(famille_name: string,num:Number) {
    this.router.navigate(['/deta'], { queryParams: { familleey: famille_name ,nume:num} });
    // or if you want to use route parameters:
    // this.router.navigate(['/products', categoryName]);
  }
navigateToLogin(): void {
  this.router.navigate(['/login']);  // Redirect to 'target' route
}

navigateToFacebock(): void {
  window.location.href = 'https://www.facebook.com/profile.php?id=100086913193624'; // Replace with your Instagram URL
}

navigateToInsta(): void {
  window.location.href = 'https://www.instagram.com/cafe_le_garage/	'; // Replace with your Instagram URL
}

navigateToDash(): void {
  this.router.navigate(['/dash']);  // Redirect to 'target' route
}
//   logout(): Observable<void>{
//     const promise=signOut(this.firebaseAuth);
//     this.navigateToLogin();
//      return from(promise);
// }

logout(): Observable<void>{
  const promise=signOut(this.firebaseAuth);
  localStorage.removeItem('token'); 
  this.servicecurentuser.setCurrentUser(); 
  console.log('token are romoved');
   // this.cureentuserser.setcurrentuserisnNull();
   return from(promise);
}
}
