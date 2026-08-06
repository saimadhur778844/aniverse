interface Props {
  columns: number;

  message: string;
}

export default function DataTableEmpty({
  columns,

  message,
}: Props) {
  return (
    <tbody>
      <tr>
        <td
          colSpan={columns}
          className="px-6 py-16 text-center text-zinc-500"
        >
          {message}
        </td>
      </tr>
    </tbody>
  );
}