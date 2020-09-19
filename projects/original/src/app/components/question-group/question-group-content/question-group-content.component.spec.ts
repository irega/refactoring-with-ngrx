import { async, ComponentFixture, TestBed } from "@angular/core/testing";

describe("QuestionGroupContentComponent", () => {
  let component: QuestionGroupContentComponent;
  let fixture: ComponentFixture<QuestionGroupContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionGroupContentComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionGroupContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
