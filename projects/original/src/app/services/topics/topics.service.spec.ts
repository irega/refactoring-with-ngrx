import { TestBed } from "@angular/core/testing";
import { TopicsService } from "./topics.service";

describe("TopicsService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: TopicsService = TestBed.get(TopicsService);
    expect(service).toBeTruthy();
  });
});
