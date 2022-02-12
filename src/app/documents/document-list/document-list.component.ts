import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit {

  constructor() {}

  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document(
      '1',
      'CIT 260 -Object Oriented Programming',
      'Description 1',
      '',
      []
    ),
    new Document(
      '2',
      'CIT 366 - Full Stack Development',
      'Description 2',
      '',
      []
    ),
    new Document(
      '3',
      'CIT 425 -Data Warehousing',
      'Description 3',
      '',
      []
    ),
    new Document(
      '4',
      'CIT 460 - Enterprise Development',
      'Description 4',
      '',
      []
    ),
    new Document(
      '4',
      'CIT 495 - Senior Practicum',
      'Description 5',
      '',
      []
    )

  ];

  ngOnInit() {}
 
  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

  onAddMessage(document: Document) {
    this.documents.push(document);
  }
}
