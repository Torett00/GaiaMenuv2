import { Injectable, Query } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, getDocs, orderBy, query, serverTimestamp, updateDoc, where } from '@angular/fire/firestore';
import { Iproduit } from '../interfaces/iproduit';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitservService {

  constructor(private firestore:Firestore){}


  getallproduct():Observable<Iproduit[]>{
    let notref=query(collection(this.firestore,'Products'),orderBy('createdAt'));
    return collectionData(notref,{idField:'id'}) as Observable<Iproduit[]>
  }

  delete(key:string){
    const categorieDocRef = doc(this.firestore, 'Products', key); // Get the reference to the document by its ID
  return deleteDoc(categorieDocRef); // Delete the document from Firestore
  }

  async addcat(cat: Iproduit): Promise<void> {
    // Check if the category already exists
    const categoryExists = await this.checkIfproductExists(cat.name);
     const categoryWithTimestamp = {
      ...cat,
      createdAt: serverTimestamp(), // Firebase server-side timestamp
     // Clean up whitespace
    };
    // if (categoryExists) {
    //   console.log('Product with this name already exists!');
    //   return; // Don't proceed if category exists
    // }
  
    // Add the new category to Firestore
    try {
      const categoryRef = await addDoc(collection(this.firestore, 'Products'), categoryWithTimestamp);
      console.log('produit added successfully with ID:', categoryRef.id);
    } catch (error) {
      console.error('Error adding produit:', error);
    }
  }

 
  async checkIfproductExists(name: string): Promise<boolean> {
    const produitsRef = collection(this.firestore, 'Products');
    const q = query(produitsRef, where('name', '==', name)); // Check for matching category name
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty; // Return true if a category with that name exists
  }
  
  // async addproduit(cat: Iproduit): Promise<void> {
  //   // Check if the category already exists
  //   const categoryExists = await this.checkIfproductExists(cat.name);
  //   const categoryWithTimestamp = {
  //     ...cat,
  //     createdAt: serverTimestamp(), // Firebase server-side timestamp
  //    // Clean up whitespace
  //   };
  //   if (categoryExists) {
  //     console.log('Product with this name already exists!');
  //     return; // Don't proceed if category exists
  //   }
  
  //   // Add the new category to Firestore
  //   try {
  //     const categoryRef = await addDoc(collection(this.firestore, 'Products'), categoryWithTimestamp);
  //     console.log('Product added successfully with ID:', categoryRef.id);
  //   } catch (error) {
  //     console.error('Error adding Product:', error); 
  //   }
  // }

  catobj: Iproduit={
    id:'',
    name:'',
    prix:0,
    categorie_name:'',
    description:'',
  }
  async getCatById(id: string): Promise<Iproduit | null> {
    try {
      const docRef = doc(this.firestore, 'Products', id);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data() as Omit<Iproduit, 'id'>;
      if (docSnap.exists()) {
        
        console.log(data,'dede')
        console.log(docSnap.id)
        console.log(data.name??'ssss');
        console.log(docSnap.data.name);

        this.catobj.id=docSnap.id;
        this.catobj.name=data.name;
        this.catobj.categorie_name=data.categorie_name;
        this.catobj.prix=data.prix;
        this.catobj.description=data.description;
        return this.catobj as Iproduit;
      } else {
        console.warn('No Product found with ID:', id);
        return null;
      }
    } catch (error) {
      console.error('Error getting Product by ID:', error);
      return null;
    }
  }

  async updateprod(catId: string, updatedData: Partial<Iproduit>): Promise<void> {

    try {
      const catDocRef = doc(this.firestore, 'Products', catId);
      console.log('now im int last ',catDocRef.id)
  
      console.log(updatedData,'ssss');
      await updateDoc(catDocRef, updatedData);
  
      console.log('product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  }
  
}
