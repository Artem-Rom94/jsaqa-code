const sorting = require("../../app");

describe("Books names test suit", () => {
  it("Books names should be sorted in ascending order", () => {
    expect(
      sorting.sortByName([
        "Гарри Поттер",
        "Властелин Колец",
        "Волшебник изумрудного города",
      ]),
    ).toEqual([
      "Властелин Колец",
      "Волшебник изумрудного города",
      "Гарри Поттер",
    ]);
  });

  it("Should return same array if already sorted", () => {
    const input = ["Азбука", "Букварь", "Грамматика"];
    expect(sorting.sortByName(input)).toEqual([
      "Азбука",
      "Букварь",
      "Грамматика",
    ]);
  });

  it("Should be case-insensitive", () => {
    const input = ["b", "A", "c"];
    expect(sorting.sortByName(input)).toEqual(["A", "b", "c"]);
  });

  it("Should handle equal names", () => {
    const input = ["a", "a"];
    expect(sorting.sortByName(input)).toEqual(["a", "a"]);
  });
});
