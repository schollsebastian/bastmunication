import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-publish-part',
  templateUrl: './publish-part.component.html',
  styleUrls: ['./publish-part.component.scss']
})
export class PublishPartComponent implements OnInit {

  @Input() color = '';
  messages: string[] = [];
  toAnimate = '';

  constructor(private db: AngularFireDatabase) {
  }

  async ngOnInit(): Promise<void> {
    await this.getMessages();
  }

  async getMessages(): Promise<void> {
    const messages: Observable<any[]> = this.db.list('dormunication/messages').valueChanges();

    messages.subscribe(data => {
      this.messages = data;
    });
  }

  async publish(message: string): Promise<void> {
    await this.db.object('dormunication/message').set({message, color: this.color}).then(() => {

      this.toAnimate = message;

      setTimeout(() => {
        this.toAnimate = '';
      }, 750);
    });
  }

}
