import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateuserblogComponent } from './createuserblog.component';

describe('CreateuserblogComponent', () => {
  let component: CreateuserblogComponent;
  let fixture: ComponentFixture<CreateuserblogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateuserblogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateuserblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
