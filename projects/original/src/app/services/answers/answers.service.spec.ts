import { TestBed } from "@angular/core/testing";
import { AnswersService } from "./answers.service";

describe("AnswersService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: AnswersService = TestBed.get(AnswersService);
    expect(service).toBeTruthy();
  });
});
