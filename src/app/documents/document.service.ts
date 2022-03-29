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
      .get<{ message: string, documents: Document[]}>(
        'http://localhost:3000/documents'
      )
      .subscribe(
        // success function
        (documentData) => {
          this.documents = documentData.documents;

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
  //  storeDocuments() {
  //   let documents = JSON.stringify(this.documents);

  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  //   this.http
  //     .put(
  //       'https://cms-project-8f25d-default-rtdb.firebaseio.com/documents.json',
  //       documents,
  //       { headers: headers }
  //     )
  //     .subscribe(() => {
  //       this.documentListChangedEvent.next(this.documents.slice());
  //     });
  // }


  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }

    // make sure id of the new Document is empty
    newDocument.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, document: Document }>('http://localhost:3000/documents',
      document,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.documents.push(responseData.document);
          this.documentListChangedEvent.next(this.documents.slice());
        }
      );
  }



  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === originalDocument.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;
    newDocument['_id'] = originalDocument['_id'];

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/documents/' + originalDocument.id,
      newDocument, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.documents[pos] = newDocument;
          this.documentListChangedEvent.next(this.documents.slice());
        }
      );
  }

  deleteDocument(document: Document) {

    if (!document) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === document.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/documents/' + document.id)
      .subscribe(
        (response: Response) => {
          this.documents.splice(pos, 1);
          this.documentListChangedEvent.next(this.documents.slice());
        }
      );
  }
}
