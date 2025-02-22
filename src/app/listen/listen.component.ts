import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Howl } from 'howler';

@Component({
  selector: 'app-listen',
  templateUrl: './listen.component.html',
  styleUrls: ['./listen.component.scss']
})
export class ListenComponent implements OnInit {

  message = '';

  constructor(private db: AngularFireDatabase) {
  }

  async ngOnInit(): Promise<void> {
    await this.getMessage();
  }

  async getMessage(): Promise<void> {
    const message: Observable<any> = this.db.object('bastmunication/message').valueChanges();
    let timeout: any;

    let sound = new Howl({
      src: ['assets/notification.mp3']
    });

    this.db.object('bastmunication/notification').valueChanges().subscribe((path) => {
      sound = new Howl({
        src: [path + '']
      });
    });

    message.subscribe(data => {
      clearTimeout(timeout);
      this.message = data;
      sound.play();

      timeout = setTimeout(() => {
        this.message = '';
      }, 15 * 1000);
    });
  }
}
