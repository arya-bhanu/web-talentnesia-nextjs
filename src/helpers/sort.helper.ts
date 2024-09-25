interface Column {
  key: string;
}

export const sortRowsKeyColumnTable = <T extends Record<string, unknown>>(rows: T[], columns: Column[]): Partial<T>[] => {
  const sortedRows = rows.map((row) => {
    return columns.reduce((acc, column) => {
      acc[column.key as keyof T] = row[column.key as keyof T];
      return acc;
    }, {} as Partial<T>);
  });
  return sortedRows;
};
