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
  colors: any[] = [];
  color: any;

  constructor(private db: AngularFireDatabase) {
  }

  async ngOnInit(): Promise<void> {
    await this.getMessage();
  }

  async getMessage(): Promise<void> {
    const message: Observable<any> = this.db.object('dormunication/message').valueChanges();
    let timeout: any;

    let sound = new Howl({
      src: ['assets/notification.mp3']
    });

    this.db.list('dormunication/colors').valueChanges().subscribe((colors) => {
      this.colors = colors;
    });

    message.subscribe(data => {
      clearTimeout(timeout);
      this.message = data.message;

      this.color = this.colors.filter(c => c.color === data.color)[0];
      const path = this.color.sound;

      sound = new Howl({
        src: [path]
      });

      sound.play();

      timeout = setTimeout(() => {
        this.message = '';
      }, 15 * 1000);
    });
  }
}
