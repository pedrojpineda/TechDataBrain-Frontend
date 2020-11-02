import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateJobTitleComponent } from './update-job-title.component';

describe('UpdateJobTitleComponent', () => {
  let component: UpdateJobTitleComponent;
  let fixture: ComponentFixture<UpdateJobTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateJobTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateJobTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
