import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

//rxjs
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'; 

import { News } from './../../models/news/news';

/*
  Generated class for the NewsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NewsProvider {
	//list variables
	newsCollectionRef: AngularFirestoreCollection<News>;
  newsCollection: Observable<News[]>;
  
	//object variables
	newsDocumentRef: AngularFirestoreDocument<News>;
  newsDocument: Observable<News>;
  constructor(private afDb: AngularFirestore) {
    console.log('Hello NewsProvider Provider');
  }
  getNewsCollection() {
    this.newsCollectionRef = this.afDb.collection('news', 
    ref => ref.orderBy('news_timestamp_post_created', 'desc'));
    this.newsCollection = this.newsCollectionRef.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as News;
        const id = a.payload.doc.id;
        return { id, ...data };
      })),
    );
    return this.newsCollection;
    // console.log(this.newsList);
   }
   getLatestNewsCollection(){
    let newsCollectionRef = this.afDb.collection('news', 
    ref => ref.orderBy('news_timestamp_post_created', 'desc').limit(2));
    let newsCollection = newsCollectionRef.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as News;
        const id = a.payload.doc.id;
        return { id, ...data };
      })),
    );
    return newsCollection;
    // console.log(this.newsList);
  }
   getNewsDocument(id:string) {
    this.newsDocumentRef = this.afDb.doc(`news/${id}`);
    this.newsDocument = this.newsDocumentRef.valueChanges();
    return this.newsDocument;
  }

}
