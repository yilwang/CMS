import { Component, OnInit} from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  
  contacts: Contact[] =[];
  subscription: Subscription;
  
  constructor(private contactService: ContactService) {}


  ngOnInit() {
    this.subscription = this.contactService.contactListChangedEvent.subscribe(
      (contacts: Contact[]) => {
      this.contacts = contacts;
    });
    
    this.contacts = this.contactService.getContacts();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
