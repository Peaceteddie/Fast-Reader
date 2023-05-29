describe("endsWith", () => {
  it("should return true if the sentence ends with any of the given characters", () => {
    const sentence = "Hello world.";
    const chars = [".", "?", "!"];
    expect(endsWith(sentence, chars)).toBe(true);
  });

  it("should return false if the sentence does not end with any of the given characters", () => {
    const sentence = "Hello world";
    const chars = [".", "?", "!"];
    expect(endsWith(sentence, chars)).toBe(false);
  });
});

describe("endsWithNewline", () => {
  it("should return true if the sentence ends with a newline character", () => {
    const sentence = "Hello world\n";
    expect(endsWithNewline(sentence)).toBe(true);
  });

  it("should return false if the sentence does not end with a newline character", () => {
    const sentence = "Hello world";
    expect(endsWithNewline(sentence)).toBe(false);
  });
});
