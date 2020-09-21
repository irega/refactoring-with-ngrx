import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { QuestionGroupTopicsComponent } from "./question-group-topics.component";

describe("QuestionGroupTopicsComponent", () => {
  let component: QuestionGroupTopicsComponent;
  let fixture: ComponentFixture<QuestionGroupTopicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionGroupTopicsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionGroupTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
