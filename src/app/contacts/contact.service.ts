import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contacts: Contact[] = [];
  maxContactId: number;
  //contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  getContacts(): Contact[] {
    return this.contacts
      .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
      .slice();
  }

  getContact(id: string): Contact {
    return this.contacts.find((contact) => contact.id === id);
  }

  getMaxId(): number {
    let maxId = 0;
    this.contacts.forEach((contact: Contact) => {
      let currentContactId = parseInt(contact.id);

      if (currentContactId > maxId) {
        maxId = currentContactId;
      }
    });

    return maxId;
  }


  addContact(newContact: Contact) {
    if (!newContact) { 
        return;
     }

    this.maxContactId++;

    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    const contactListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactListClone);
}


updateContact(originalContact: Contact, newContact: Contact) {
    if ( !originalContact || !newContact){
        return;
    }

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) return;

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    const documentsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(documentsListClone);
  }



  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);

    const contactsListClone = this.contacts.slice();
 
    this.contactListChangedEvent.next(contactsListClone);
  }
}
