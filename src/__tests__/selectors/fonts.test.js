import createFilteredFontsSelector from "../../selectors/fonts";
import fonts from "../../fixtures/fonts";
import filters from "../../fixtures/filters";
import isEqual from "lodash.isequal";

jest.mock("lodash.isequal");

const setup = () => jest.fn(createFilteredFontsSelector());

afterEach(() => {
  jest.clearAllMocks();
});

it("should return empty array on initial call (fonts not fetched)", () => {
  const selectFonts = setup();

  const selected = selectFonts({}, filters);

  expect(selected).toEqual([]);
});

it("should filter by font family title", () => {
  const selectFonts = setup();

  const title = "Roboto";
  const selected = selectFonts(fonts, { ...filters, title });

  expect(selected.length).toBe(3);
  expect(selected).toEqual(["Roboto", "Roboto Condensed", "Roboto Slab"]);

  const selectedEmpty = selectFonts(fonts, { ...filters, title: "abcdefg" });

  expect(selectedEmpty).toEqual([]);
});

it("should filter by font category", () => {
  const selectFonts = setup();

  let categories = {
    serif: false,
    "sans-serif": false,
    display: false,
    monospace: true,
    handwriting: true
  };
  const selected = selectFonts(fonts, { ...filters, categories });

  expect(selected.length).toBe(5);
  expect(selected).toEqual([
    "Inconsolata",
    "Nova Mono",
    "Qwigley",
    "Sriracha",
    "Fondamento"
  ]);

  categories = {
    ...categories,
    monospace: false,
    handwriting: false
  };
  const selectedEmpty = selectFonts(fonts, { ...filters, categories });

  expect(selectedEmpty).toEqual([]);
});

it("should sort by popularity", () => {
  const selectFonts = setup();

  expect(filters.sorting.param).toBe("popularity");

  const selected = selectFonts(fonts, filters);

  // Note: Google Fonts API serves fonts list
  //       sorted by popularity by default
  expect(selected).toEqual(Object.keys(fonts));
});

it("should sort alphabetically", () => {
  const selectFonts = setup();

  const title = "sans";
  const sorting = {
    param: "alpha",
    order: "asc"
  };
  const selected = selectFonts(fonts, { ...filters, title, sorting });

  expect(selected).toEqual([
    "Noto Sans",
    "Open Sans",
    "Open Sans Condensed",
    "PT Sans",
    "Source Sans Pro"
  ]);
});

it("should sort in ascending order", () => {
  const selectFonts = setup();

  const title = "sans";
  let sorting = {
    param: "popularity",
    order: "asc"
  };
  let selected = selectFonts(fonts, { ...filters, title, sorting });

  expect(selected).toEqual([
    "Open Sans",
    "Source Sans Pro",
    "PT Sans",
    "Open Sans Condensed",
    "Noto Sans"
  ]);

  sorting = {
    param: "alpha",
    order: "asc"
  };

  selected = selectFonts(fonts, { ...filters, title, sorting });

  expect(selected).toEqual([
    "Noto Sans",
    "Open Sans",
    "Open Sans Condensed",
    "PT Sans",
    "Source Sans Pro"
  ]);
});

it("should sort in descending order", () => {
  const selectFonts = setup();

  const title = "sans";
  let sorting = {
    param: "popularity",
    order: "des"
  };
  let selected = selectFonts(fonts, { ...filters, title, sorting });

  expect(selected).toEqual([
    "Noto Sans",
    "Open Sans Condensed",
    "PT Sans",
    "Source Sans Pro",
    "Open Sans"
  ]);

  sorting = {
    param: "alpha",
    order: "des"
  };

  selected = selectFonts(fonts, { ...filters, title, sorting });

  expect(selected).toEqual([
    "Source Sans Pro",
    "PT Sans",
    "Open Sans Condensed",
    "Open Sans",
    "Noto Sans"
  ]);
});

it("should not compare passed filters", () => {
  const selectFonts = setup();

  selectFonts({}, filters);

  expect(selectFonts).toHaveLastReturnedWith([]);
  expect(isEqual).not.toHaveBeenCalled();

  selectFonts({}, { ...filters, title: "roboto " });

  expect(selectFonts).toHaveLastReturnedWith([]);
  expect(isEqual).not.toHaveBeenCalled();

  selectFonts(fonts, filters);

  expect(selectFonts).toHaveLastReturnedWith(Object.keys(fonts));
  expect(isEqual).not.toHaveBeenCalled();

  selectFonts(fonts, { ...filters, title: "roboto" });

  expect(selectFonts).toHaveLastReturnedWith([
    "Roboto",
    "Roboto Condensed",
    "Roboto Slab"
  ]);
  expect(isEqual).toHaveBeenCalledTimes(1);
  expect(isEqual).toHaveBeenCalledWith(filters, {
    ...filters,
    title: "roboto"
  });
});

it("should compare passed filters", () => {
  const selectFonts = setup();
  selectFonts(fonts, filters);

  expect(selectFonts).toHaveLastReturnedWith(Object.keys(fonts));
  expect(isEqual).not.toHaveBeenCalled();

  selectFonts(fonts, { ...filters, title: "roboto" });

  expect(selectFonts).toHaveLastReturnedWith([
    "Roboto",
    "Roboto Condensed",
    "Roboto Slab"
  ]);
  expect(isEqual).toHaveBeenCalledTimes(1);
  expect(isEqual).toHaveBeenCalledWith(filters, {
    ...filters,
    title: "roboto"
  });
});
