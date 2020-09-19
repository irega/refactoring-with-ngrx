import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { QuestionGroupSummaryComponent } from "./question-group-summary.component";

describe("QuestionGroupSummaryComponent", () => {
  let component: QuestionGroupSummaryComponent;
  let fixture: ComponentFixture<QuestionGroupSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionGroupSummaryComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionGroupSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
