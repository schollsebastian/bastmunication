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

    message.subscribe(data => {
      this.message = data;
    });
  }
}
