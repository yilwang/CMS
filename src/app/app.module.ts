import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactItemComponent } from './contacts/contact-item/contact-item.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';

import {FormsModule} from "@angular/forms";

import { HeaderComponent } from './contacts/header.component';

import { MessageEditComponent } from './messages/message-edit/message-edit.component';
import { MessageItemComponent } from './messages/message-item/message-item.component';
import { MessageListComponent } from './/messages/message-list/message-list.component';

import { DocumentsComponent } from './documents/documents.component';
import { DocumentListComponent } from './documents/document-list/document-list.component';
import { DocumentItemComponent } from './documents/document-item/document-item.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';

import{ DropdownDirective } from './dropdown.directive';

@NgModule({
  declarations: [
    AppComponent,

    ContactsComponent,
    ContactListComponent,
    ContactDetailComponent,
    ContactItemComponent,
 

    HeaderComponent,

    MessageEditComponent,
    MessageItemComponent,
    MessageListComponent,

    DocumentsComponent,
    DocumentListComponent,
    DocumentDetailComponent,
    DocumentItemComponent,

    DropdownDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
