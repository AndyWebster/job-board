import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MyJobsComponent } from './my-jobs.component';

describe('MyJobsComponent', () => {
  let component: MyJobsComponent;
  let fixture: ComponentFixture<MyJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyJobsComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
