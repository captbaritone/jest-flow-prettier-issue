const foo = {
  // NOTE: Quotes here are required for Flow to be able to parse the file.
  "1": "Some value",
};
test("repro", () => {
  expect("a").toMatchInlineSnapshot(`"b"`);
});
