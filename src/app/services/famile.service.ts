import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, getDocs, orderBy, query, serverTimestamp, updateDoc, where } from '@angular/fire/firestore';
import { Ifamille } from '../interfaces/Ifamille';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FamileService {

  constructor(private firestore:Firestore){}

  async addcat(cat: Ifamille): Promise<void> {
    // Check if the category already exists
    const categoryExists = await this.checkIfCategoryExists(cat.name);
  
    if (categoryExists) {
      console.log('Category with this name already exists!');
      return; // Don't proceed if category exists
    }
   // Add createdAt timestamp
   const categoryWithTimestamp = {
    ...cat,
    createdAt: serverTimestamp(), // Firebase server-side timestamp
    name: cat.name.trim() // Clean up whitespace
  };
    // Add the new category to Firestore
    try {
      const categoryRef = await addDoc(collection(this.firestore, 'Famille'), categoryWithTimestamp);
      console.log('Famille added successfully with ID:', categoryRef.id);
    } catch (error) {
      console.error('Error adding Famille:', error);
    }
  }

  async updatecat(catId: string, updatedData: Partial<Ifamille>): Promise<void> {

    try {
      const catDocRef = doc(this.firestore, 'Famille', catId);
      console.log('now im int last ',catDocRef.id)
  
      
      await updateDoc(catDocRef, updatedData);
  
      console.log('Famille updated successfully!');
    } catch (error) {
      console.error('Error updating Famille:', error);
    }
  }
  getallcat(): Observable<Ifamille[]> {
    let notref = query(
      collection(this.firestore, 'Famille'),
      orderBy('createdAt') // Sort by creation date
    );
    return collectionData(notref, { idField: 'id' }) as Observable<Ifamille[]>;
  }


  catobj: Ifamille={
    id:'',
    name:''
  }

  async getCatById(id: string): Promise<Ifamille | null> {
    try {
      const docRef = doc(this.firestore, 'Famille', id);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data() as Omit<Ifamille, 'id'>;
      if (docSnap.exists()) {
        
        console.log(data,'dede')
      console.log(docSnap.id)
        console.log(data.name??'ssss');
        console.log(docSnap.data.name);

        this.catobj.id=docSnap.id;
        this.catobj.name=data.name;
        return this.catobj as Ifamille;
      } else {
        console.warn('No Famille found with ID:', id);
        return null;
      }
    } catch (error) {
      console.error('Error getting category by ID:', error);
      return null;
    }
  }
  delete(key:string){
    const categorieDocRef = doc(this.firestore, 'Famille', key); // Get the reference to the document by its ID
  return deleteDoc(categorieDocRef); // Delete the document from Firestore
  }

  async checkIfCategoryExists(name: string): Promise<boolean> {
    const categoriesRef = collection(this.firestore, 'Famille');
    const q = query(categoriesRef, where('name', '==', name)); // Check for matching category name
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty; // Return true if a category with that name exists
  }
}
