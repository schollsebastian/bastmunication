import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

import Message from '../Message';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  messages: Message[] = [];
  addMessageContent = '';

  constructor(private db: AngularFireDatabase) {
  }

  async ngOnInit(): Promise<void> {
    await this.getMessages();
  }

  async getMessages(): Promise<void> {
    const messages: Observable<any[]> = this.db.list('dormunication/messages').snapshotChanges();

    messages.subscribe(data => {
      this.messages = [];

      data.forEach(msg => {
        this.messages.push({
          content: msg.payload.node_.value_,
          key: msg.key
        });
      });
    });
  }

  addMessage(): void {
    if (this.addMessageContent.trim().length !== 0) {
      this.db.list('dormunication/messages').push(this.addMessageContent);

      this.addMessageContent = '';
    }
  }

  updateMessage(msg: Message): void {
    if (msg.content.trim().length !== 0) {
      this.db.list('dormunication/messages').set(msg.key, msg.content);
    }
  }

  removeMessage(msg: Message): void {
    this.db.list('dormunication/messages').set(msg.key, null);
  }
}
