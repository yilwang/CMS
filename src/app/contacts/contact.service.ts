import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contacts: Contact[] = [];
  maxContactId: number;
  contactListChangedEvent = new Subject<Contact[]>();

  constructor(private http: HttpClient) {} // This is the dependency injection.

  getContacts() {
    this.http
      .get(
        'https://cms-project-8f25d-default-rtdb.firebaseio.com/contacts.json'
      )
      .subscribe(
        // success function
        (contacts: Contact[]) => {
          this.contacts = contacts;

          this.maxContactId = this.getMaxId();

          this.contacts.sort((a, b) =>
            a.name > b.name ? 1 : b.name > a.name ? -1 : 0
          );

          this.contactListChangedEvent.next(this.contacts.slice());
        },

        //error function
        (error: any) => {
          console.log(error);
        }
      );
  }

  getContact(id: string): Contact {
    return this.contacts.find((contact) => contact.id === id);
  }

  // getContact(id: string): Contact {
  //  for(const contact of this.contacts){
  //    if(cotact.id === id){
  //      return contact;
  //    }
  //  }
  //  return null;
  //}

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

  //This method is only for week 09 - firebase, and it is not the best approach to use storeContacts method.
  storeContacts() {
    let contacts = JSON.stringify(this.contacts);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .put(
        'https://cms-project-8f25d-default-rtdb.firebaseio.com/contacts.json',
        contacts,
        { headers: headers }
      )
      .subscribe(() => {
        this.contactListChangedEvent.next(this.contacts.slice());
      });
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }

    this.maxContactId++;

    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.storeContacts(); //This method is only for week 09 - firebase
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) return;

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.storeContacts(); //This method is only for week 09 - firebase
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1); // call it from a local array.
    this.storeContacts();
  }
}
