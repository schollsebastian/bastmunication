import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss']
})
export class PublishComponent implements OnInit {

  messages: string[] = [];
  toAnimate = '';

  constructor(private db: AngularFireDatabase) {
  }

  async ngOnInit(): Promise<void> {
    await this.getMessages();
  }

  async getMessages(): Promise<void> {
    const messages: Observable<any[]> = this.db.list('bastmunication/messages').valueChanges();

    messages.subscribe(data => {
      this.messages = data;
    });
  }

  async publish(message: string): Promise<void> {
    await this.db.object('bastmunication/message').set(message).then(() => {

      this.toAnimate = message;

      setTimeout(() => {
        this.toAnimate = '';
      }, 750);
    });
  }
}
