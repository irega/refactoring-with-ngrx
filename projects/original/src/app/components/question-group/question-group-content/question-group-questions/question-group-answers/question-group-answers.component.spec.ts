import { async, ComponentFixture, TestBed } from "@angular/core/testing";

describe("QuestionGroupAnswersComponent", () => {
  let component: QuestionGroupAnswersComponent;
  let fixture: ComponentFixture<QuestionGroupAnswersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionGroupAnswersComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionGroupAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
