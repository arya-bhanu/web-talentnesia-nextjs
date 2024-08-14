export const sortRowsKeyColumnTable = (rows: any[], columns: any[]) => {
  const sortedRows = rows.map((row) => {
    return columns.reduce((acc, column) => {
      acc[column.key] = row[column.key];
      return acc;
    }, {});
  });
  return sortedRows;
};
