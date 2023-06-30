import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassreviewComponent } from './classreview.component';

describe('ClassreviewComponent', () => {
  let component: ClassreviewComponent;
  let fixture: ComponentFixture<ClassreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
