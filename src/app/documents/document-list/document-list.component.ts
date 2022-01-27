import { Component, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit {

  constructor() {}

  //@Output() selectedContactEvent = new EventEmitter<Contact>();

  documents: Document[] = [
    new Document(
      '1',
      'Subject 1',
      'Message Text 1',
      '',
      []
    ),
    new Document(
      '2',
      'Subject 2',
      'Message Text 2',
      '',
      []
    ),
    new Document(
      '3',
      'Subject 3',
      'Mssage Text 3',
      '',
      []
    )
  ];

  ngOnInit() {}

  onAddMessage(document: Document) {
    this.documents.push(document);
  }
}
