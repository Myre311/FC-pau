// Composant de tableau admin responsive : tableau classique en desktop,
// liste de cartes empilées en mobile (CLAUDE.md : "Tableaux longs :
// conversion en cartes empilées en mobile, pas de scroll-x").
//
// Usage :
//   <AdminTable
//     columns={[{ key: 'name', label: 'Nom' }, ...]}
//     rows={items}
//     renderRow={(it) => ({ name: it.name, status: <StatusBadge ... />, ... })}
//   />

export function AdminTable({ columns, rows, renderRow, empty, mobileCardLabel }) {
  if (rows.length === 0) {
    return (
      <div className="border border-dashed border-gray-200/15 px-6 py-12 text-center">
        <p className="font-sans text-gray-900/60">{empty ?? 'Aucune donnée'}</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop : tableau */}
      <div className="hidden border border-gray-200/10 lg:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200/10 bg-pau-primary/30">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.2em] text-gray-900/50 ${col.align === 'right' ? 'text-right' : ''}`}
                  style={col.width ? { width: col.width } : undefined}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const rendered = renderRow(row);
              return (
                <tr
                  key={row.id ?? i}
                  className="border-b border-gray-200/5 last:border-0 hover:bg-white/[0.02]"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`px-4 py-3 font-sans text-sm text-gray-900/85 ${col.align === 'right' ? 'text-right' : ''}`}
                    >
                      {rendered[col.key]}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile : cartes empilées */}
      <ul className="space-y-3 lg:hidden">
        {rows.map((row, i) => {
          const rendered = renderRow(row);
          return (
            <li key={row.id ?? i} className="border border-gray-200/10 bg-pau-primary/20 p-4">
              {mobileCardLabel && (
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-pau-yellow">
                  {mobileCardLabel(row)}
                </p>
              )}
              <dl className="space-y-2">
                {columns.map((col) => (
                  <div key={col.key} className="flex items-start justify-between gap-3">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-900/40">
                      {col.label}
                    </dt>
                    <dd className="text-right font-sans text-sm text-gray-900">
                      {rendered[col.key]}
                    </dd>
                  </div>
                ))}
              </dl>
            </li>
          );
        })}
      </ul>
    </>
  );
}
