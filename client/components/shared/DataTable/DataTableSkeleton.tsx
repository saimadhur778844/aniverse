interface Props {
  columns: number;
  rows?: number;
}

export default function DataTableSkeleton({
  columns,
  rows = 8,
}: Props) {
  return (
    <tbody>
      {Array.from({
        length: rows,
      }).map((_, row) => (
        <tr
          key={row}
          className="border-b border-zinc-800"
        >
          {Array.from({
            length: columns,
          }).map((_, col) => (
            <td
              key={col}
              className="px-6 py-4"
            >
              <div className="h-4 w-full animate-pulse rounded bg-zinc-700" />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}