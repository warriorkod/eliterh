import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidaturesBySactoryComponent } from './candidatures-by-sactory.component';

describe('CandidaturesBySactoryComponent', () => {
  let component: CandidaturesBySactoryComponent;
  let fixture: ComponentFixture<CandidaturesBySactoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidaturesBySactoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidaturesBySactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
