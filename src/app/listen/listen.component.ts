import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';

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
    const message: Observable<any> = this.db.object('dormunication/message').valueChanges();
    let timeout: any;

    message.subscribe(data => {
      clearTimeout(timeout);
      this.message = data;

      timeout = setTimeout(() => {
        this.message = '';
      }, 15 * 1000);
    });
  }
}
