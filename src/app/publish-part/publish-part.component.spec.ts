import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishPartComponent } from './publish-part.component';

describe('PublishPartComponent', () => {
  let component: PublishPartComponent;
  let fixture: ComponentFixture<PublishPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublishPartComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
