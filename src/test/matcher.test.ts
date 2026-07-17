import { describe, it, expect } from "vitest";
import { getMockJdResponse } from "../pages/AiLab";

describe("getMockJdResponse CV Matcher Heuristics", () => {
  it("should return a high score for highly relevant QA and React roles", () => {
    const jdText = "Looking for a Senior QA Engineer. Must have experience with React, TypeScript, automated test suites (Jest/Cypress), and PostgreSQL database design. AWS cloud experience is a plus.";
    const result = getMockJdResponse(jdText);
    
    expect(result.score).toBeGreaterThanOrEqual(80);
    expect(result.fit).toContain("Excellent match fit");
    expect(result.strengths).toContain("Senior QA manual & automated test suite design");
    expect(result.strengths).toContain("Frontend React/TypeScript UI development");
    expect(result.gaps).toContain("No major gaps identified.");
  });

  it("should return a low score and list gaps for technical roles requiring languages Malila does not have", () => {
    const jdText = "We are hiring a Python Backend Engineer with experience in Django, Kubernetes, and Angular.";
    const result = getMockJdResponse(jdText);
    
    expect(result.score).toBeLessThan(40);
    expect(result.fit).toContain("Low match fit");
    expect(result.gaps).toContain("Python/Django/Flask backend development");
    expect(result.gaps).toContain("Kubernetes container orchestration");
  });

  it("should return an extremely low score (5%) for completely unrelated non-tech roles", () => {
    const jdText = "Hiring a dental surgeon for a medical clinic. Experience in surgery required.";
    const result = getMockJdResponse(jdText);
    
    expect(result.score).toBe(5);
    expect(result.fit).toContain("Unsatisfactory fit");
    expect(result.strengths).toHaveLength(0);
    expect(result.gaps).toContain("Role is in an unrelated domain (non-IT/Software/QA)");
  });

  it("should handle extremely short or empty inputs gracefully", () => {
    const result = getMockJdResponse("Short input");
    
    expect(result.score).toBe(5);
    expect(result.fit).toContain("Unsatisfactory fit");
    expect(result.gaps).toContain("Role is in an unrelated domain (non-IT/Software/QA)");
  });
});
