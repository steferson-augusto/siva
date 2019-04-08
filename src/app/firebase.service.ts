import { Injectable } from '@angular/core'
import {AngularFirestore, AngularFirestoreDocument  } from 'angularfire2/firestore'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private afs: AngularFirestore) { }

  getTabelas(){
    const id = 'gRGmo0252uViJrr9MrqS'
    const collection: AngularFirestoreDocument<any> = this.afs.doc('tabelas/'+id)
    return collection
  }

  getConfig(){
    const collection: AngularFirestoreDocument<any> = this.afs.doc('config/1')
    return collection
  }
}
