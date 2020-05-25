import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionsBoxComponent } from './collections-box.component';

describe('CollectionsBoxComponent', () => {
  let component: CollectionsBoxComponent;
  let fixture: ComponentFixture<CollectionsBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionsBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
