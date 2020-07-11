import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZvpComponent } from './zvp.component';

describe('ZvpComponent', () => {
  let component: ZvpComponent;
  let fixture: ComponentFixture<ZvpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZvpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZvpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
