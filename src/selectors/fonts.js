import isEqual from "lodash.isequal";

export default function() {
  const memo = {
    filters: {},
    result: []
  };

  return function(fonts, filters) {
    const families = Object.keys(fonts);

    if (families.length === 0) {
      memo.filters = { ...filters };
      memo.result = [];

      return [];
    }

    if (
      (memo.result.length === 0 && families.length > 0) ||
      !isEqual(memo.filters, filters)
    ) {
      memo.filters = { ...filters };

      const { title, categories, sorting } = filters;

      const filteredFonts = families.filter(family => {
        const { category } = fonts[family];

        const titleMatch = family
          .toLowerCase()
          .includes(title.trim().toLowerCase());
        const categoryMatch = categories[category];

        return titleMatch && categoryMatch;
      });

      if (sorting.param === "alpha") {
        const sortedFonts = filteredFonts.sort((a, b) =>
          a.localeCompare(b, {}, { caseFirst: "upper" })
        );

        memo.result =
          sorting.order === "asc" ? sortedFonts : sortedFonts.reverse();
      } else {
        memo.result =
          sorting.order === "asc" ? filteredFonts : filteredFonts.reverse();
      }
    }

    return memo.result;
  };
}
