import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit {

  documents: Document[] = [];
  
  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
  }
 
  onSelectedDocument(document: Document) {
    this.documentService.documentSelectedEvent.emit(document);
  }

  onAddDocument(document: Document) {
    this.documents.push(document);
  }
}


