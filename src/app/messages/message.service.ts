import { Injectable } from '@angular/core';
import { Message } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messages: Message[] = [];
  maxMessageId: number;
  messageListChangedEvent = new Subject<Message[]>();

  constructor(private http: HttpClient) {}

  getMaxId(): number {
    let maxId = 0;
    this.messages.forEach((message: Message) => {
      let currentMessageId = parseInt(message.id);

      if (currentMessageId > maxId) {
        maxId = currentMessageId;
      }
    });

    return maxId;
  }

  addMessage(newMessage: Message) {
    if (!newMessage) {
      return;
    }

    this.maxMessageId++;

    newMessage.id = this.maxMessageId.toString();

    this.messages.push(newMessage);
    
    this.storeMessages(); //This method is only for week 09 - firebase
  }

  getMessage(id: string): Message {
    return this.messages.find((message) => message.id === id);
  }

  getMessages(){
    this.http
      .get('https://cms-project-8f25d-default-rtdb.firebaseio.com/messages.json')
      .subscribe(
        // success function
        (messages: Message[]) => {
          this.messages = messages;

          this.maxMessageId = this.getMaxId();

          this.messages.sort((a, b) => (
              a.id > b.id ? 1 : b.id > a.id ? -1 : 0)
          );

          this.messageListChangedEvent.next(this.messages.slice());
        },

        //error function
        (error: any) => {
          console.log(error);
        }
      );
  }

  //This method is only for week 09 - firebase, and it is not the best approach to use storeContacts method.
  storeMessages() {
    let messages = JSON.stringify(this.messages);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .put(
        'https://cms-project-8f25d-default-rtdb.firebaseio.com/messages.json',
        messages,
        { headers: headers }
      )
      .subscribe(() => {
        this.messageListChangedEvent.next(this.messages.slice());
      });
  }
}
