export function formatColumns(columns) {
  return columns.map((column) => {
    if (typeof column === "object") {
      if (!column.name) {
        console.error(
          `Table error: Column name is missing. Try provide 'name' attribute or pass a string instead of object. Received: ${JSON.stringify(
            column
          )}`
        );
      }
      // fill up all the default config if not provided
      return {
        name: column.name,
        label: column.name,
        align: "left",
        ...column
      };
    } else if (typeof column === "string") {
      return {
        name: column,
        label: column,
        align: "left"
      };
    }
    console.error(
      `Table error: Pass in either column name string, or column object. Received: ${JSON.stringify(
        column
      )}`
    );
  });
}
