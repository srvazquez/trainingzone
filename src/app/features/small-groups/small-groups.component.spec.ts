import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallGroupsComponent } from './small-groups.component';

describe('PlansComponent', () => {
  let component: SmallGroupsComponent;
  let fixture: ComponentFixture<SmallGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmallGroupsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
