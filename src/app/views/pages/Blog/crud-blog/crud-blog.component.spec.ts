import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudBlogComponent } from './crud-blog.component';

describe('CrudBlogComponent', () => {
  let component: CrudBlogComponent;
  let fixture: ComponentFixture<CrudBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudBlogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
