export function exportCSV<T>(
  filename: string,
  rows: T[]
) {
  if (!rows.length) return;

  const headers =
    Object.keys(
      rows[0] as object
    );

  const csv = [
    headers.join(","),

    ...rows.map((row) =>
      headers
        .map((header) => {
          const value =
            (row as Record<
              string,
              unknown
            >)[header];

          return `"${String(
            value ?? ""
          ).replace(
            /"/g,
            '""'
          )}"`;
        })
        .join(",")
    ),
  ].join("\n");

  const blob = new Blob(
    [csv],
    {
      type: "text/csv;charset=utf-8;",
    }
  );

  const url =
    URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  link.download = filename;

  document.body.appendChild(
    link
  );

  link.click();

  document.body.removeChild(
    link
  );

  URL.revokeObjectURL(url);
}