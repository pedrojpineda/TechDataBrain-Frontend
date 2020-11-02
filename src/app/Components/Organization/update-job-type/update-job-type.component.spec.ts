import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateJobTypeComponent } from './update-job-type.component';

describe('UpdateJobTypeComponent', () => {
  let component: UpdateJobTypeComponent;
  let fixture: ComponentFixture<UpdateJobTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateJobTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateJobTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
