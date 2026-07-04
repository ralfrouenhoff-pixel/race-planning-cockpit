type StatusTableProps = {
  columns: string[];
  rows: string[][];
  title: string;
};

export function StatusTable({ columns, rows, title }: StatusTableProps) {
  return (
    <section>
      <h1 className="text-2xl font-semibold tracking-normal">{title}</h1>
      <div className="mt-5 overflow-hidden border border-cockpit-line bg-white">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              {columns.map((column) => (
                <th className="border-b border-cockpit-line px-4 py-3 font-semibold" key={column}>
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr className="border-b border-cockpit-line last:border-b-0" key={row.join(":")}>
                {row.map((cell) => (
                  <td className="px-4 py-3 text-slate-700" key={cell}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
