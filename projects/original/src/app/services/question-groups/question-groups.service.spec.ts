import { TestBed } from "@angular/core/testing";
import { QuestionGroupsService } from "./question-groups.service";

describe("QuestionGroupsService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: QuestionGroupsService = TestBed.get(QuestionGroupsService);
    expect(service).toBeTruthy();
  });
});
