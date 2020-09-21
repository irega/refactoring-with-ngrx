import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { QuestionGroupQuestionsComponent } from "./question-group-questions.component";

describe("QuestionGroupQuestionsComponent", () => {
  let component: QuestionGroupQuestionsComponent;
  let fixture: ComponentFixture<QuestionGroupQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionGroupQuestionsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionGroupQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
