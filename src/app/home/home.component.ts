import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { CategorieInterface } from '../interfaces/categorie.interface';
import { Iproduit } from '../interfaces/iproduit';
import { CommonModule } from '@angular/common';
import { FamileService } from '../services/famile.service';
import { Ifamille } from '../interfaces/Ifamille';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  authService = inject(AuthService);
  firebaseAuth = inject(Auth);
  catgeoriges: CategorieInterface[] = [];
  products: Iproduit[] = [];
  categories: CategorieInterface[] = [];
  familles: Ifamille[] = [];

  constructor(private router: Router,
    private famileService: FamileService) {

  }

  ngOnInit(): void {
    this.famileService.clearfamilename();
  }

  navigateToMenus(name: string) {
    this.famileService.setfamilename(name);
    this.router.navigateByUrl("/deta");
  }
 navigateToFacebock(): void {
  window.location.href = 'https://www.instagram.com/khaled_charbti/'; // Replace with your Instagram URL
}
 navigateSOICLAMEDOA(item: string): void {
  
    window.location.href = item;
  // window.location.href = 'https://www.facebook.com/profile.php?id=100086913193624'; 
}


}