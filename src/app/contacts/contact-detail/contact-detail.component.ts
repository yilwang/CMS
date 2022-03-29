import { Component, OnInit , Input } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
})

export class ContactDetailComponent implements OnInit {
  contact: Contact;
  id: string;

  constructor(private contactService: ContactService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe((params: Params) => {
      this.id = params['id'];

      this.contactService.getContact(this.id).subscribe(contactData => {
          this.contact = contactData.contact;
        });
    }); 
  }
  
  onDelete(){
    this.contactService.deleteContact(this.contact);
    this.router.navigateByUrl('/contacts');
  }

}
