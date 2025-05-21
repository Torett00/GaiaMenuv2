import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { CategorieInterface } from '../interfaces/categorie.interface';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, getDocs, orderBy, query, serverTimestamp, updateDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategorieserService {

constructor(private firestore:Firestore){}
// async update(cat: CategorieInterface): Promise<void> {
//   const categoryExists = await this.checkIfCategoryExists(cat.name);

//   if (categoryExists) {

//     console.log('Category with this name already exists!');
//     return; // Don't proceed if category exists
//   }
// }

async updatecat(catId: string, updatedData: Partial<CategorieInterface>): Promise<void> {

  try {
    const catDocRef = doc(this.firestore, 'Categorie', catId);
    console.log('now im int last ',catDocRef.id)

    
    await updateDoc(catDocRef, updatedData);

    console.log('Category updated successfully!');
  } catch (error) {
    console.error('Error updating category:', error);
  }
}

async addcat(cat: CategorieInterface): Promise<void> {
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
    const categoryRef = await addDoc(collection(this.firestore, 'Categorie'), categoryWithTimestamp);
    console.log('Category added successfully with ID:', categoryRef.id);
  } catch (error) {
    console.error('Error adding category:', error);
  }
}
//   getallcat():Observable<CategorieInterface[]>{
// let notref=collection(this.firestore,'Categorie')
// return collectionData(notref,{idField:'id'}) as Observable<CategorieInterface[]>
//   }

// getallcat(): Observable<CategorieInterface[]> {
//   let notref = query(collection(this.firestore, 'Categorie'), orderBy('name'));
//   return collectionData(notref, { idField: 'id' }) as Observable<CategorieInterface[]>;
// }

getallcat(): Observable<CategorieInterface[]> {
  let notref = query(
    collection(this.firestore, 'Categorie'),
    orderBy('createdAt') // Sort by creation date
  );
  return collectionData(notref, { idField: 'id' }) as Observable<CategorieInterface[]>;
}
  catobj: CategorieInterface={
    id:'',
    name:'',
    famille_name:''
  }
  async getCatById(id: string): Promise<CategorieInterface | null> {
    try {
      const docRef = doc(this.firestore, 'Categorie', id);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data() as Omit<CategorieInterface, 'id'>;
      if (docSnap.exists()) {
        
        console.log(data,'dede')
      console.log(docSnap.id)
        console.log(data.name??'ssss');
        console.log(docSnap.data.name);

        this.catobj.id=docSnap.id;
        this.catobj.name=data.name;
        this.catobj.famille_name=data.famille_name;
        return this.catobj as CategorieInterface;
      } else {
        console.warn('No category found with ID:', id);
        return null;
      }
    } catch (error) {
      console.error('Error getting category by ID:', error);
      return null;
    }
  }

  delete(key:string){
    const categorieDocRef = doc(this.firestore, 'Categorie', key); // Get the reference to the document by its ID
  return deleteDoc(categorieDocRef); // Delete the document from Firestore
  }
 

  async checkIfCategoryExists(name: string): Promise<boolean> {
    const categoriesRef = collection(this.firestore, 'Categorie');
    const q = query(categoriesRef, where('name', '==', name)); // Check for matching category name
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty; // Return true if a category with that name exists
  }
}
