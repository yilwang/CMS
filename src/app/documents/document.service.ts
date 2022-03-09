import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private documents: Document[] = [];
  maxDocumentId: number;
  documentListChangedEvent = new Subject<Document[]>();

  constructor(private http: HttpClient) {

  }

  getDocument(id: string) {
    return this.documents.find((document) => document.id === id);
  }

  getDocuments(){
    this.http
      .get(
        'https://cms-project-8f25d-default-rtdb.firebaseio.com/documents.json'
      )
      .subscribe(
        // success function
        (documents: Document[]) => {
          this.documents = documents;

          this.maxDocumentId = this.getMaxId();

          this.documents.sort((a, b) =>
            a.name > b.name ? 1 : b.name > a.name ? -1 : 0
          );

          this.documentListChangedEvent.next(this.documents.slice());
        },

        //error function
        (error: any) => {
          console.log(error);
        }
      );
  }

  getMaxId(): number {
    let maxId = 0;
    this.documents.forEach((document: Document) => {
      let currentDocumentId = parseInt(document.id);

      if (currentDocumentId > maxId) {
        maxId = currentDocumentId;
      }
    });
    return maxId;
  }
  
   //This method is only for week 09 - firebase, and it is not the best approach to use storeContacts method.
   storeDocuments() {
    let documents = JSON.stringify(this.documents);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .put(
        'https://cms-project-8f25d-default-rtdb.firebaseio.com/documents.json',
        documents,
        { headers: headers }
      )
      .subscribe(() => {
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }


  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }

    this.maxDocumentId++;

    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    this.storeDocuments(); //This method is only for week 09 - firebase
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) return;

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.storeDocuments(); //This method is only for week 09 - firebase
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }

    this.documents.splice(pos, 1);

    this.storeDocuments(); //This method is only for week 09 - firebase
  }
}
