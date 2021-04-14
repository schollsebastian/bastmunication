import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss']
})
export class PublishComponent implements OnInit {

  colors: any[] = [];

  constructor(private db: AngularFireDatabase) {
  }

  ngOnInit(): void {
    this.db.list('dormunication/colors').valueChanges().subscribe((colors) => {
      this.colors = colors;
    });
  }
}
