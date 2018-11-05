import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EditJobComponent } from './edit-job.component';

describe('EditJobComponent', () => {
  let component: EditJobComponent;
  let fixture: ComponentFixture<EditJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditJobComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
