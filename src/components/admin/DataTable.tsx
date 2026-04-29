'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

interface DataTableProps<T> {
  columns: { header: string; accessor: keyof T | ((row: T) => React.ReactNode); className?: string }[];
  data: T[];
  searchable?: boolean;
}

export function DataTable<T extends { id: string | number }>({ columns, data, searchable = true }: DataTableProps<T>) {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  // Simple search on first column (mock implementation)
  const filtered = query 
    ? data.filter(item => {
        const firstCol = columns[0].accessor;
        const val = typeof firstCol === 'function' ? '' : String(item[firstCol]).toLowerCase();
        return val.includes(query.toLowerCase());
      })
    : data;

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="bg-card-bg border border-border rounded-2xl overflow-hidden">
      {searchable && (
        <div className="p-4 border-b border-border flex justify-between items-center bg-bg-secondary">
          <div className="relative w-72">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search..." 
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-input-bg border border-border rounded-lg focus:outline-none focus:border-primary-600"
            />
          </div>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-bg-secondary text-text-secondary border-b border-border uppercase text-xs tracking-wider">
            <tr>
              {columns.map((col, i) => (
                <th key={i} className={`px-6 py-4 font-medium ${col.className || ''}`}>{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginated.map((row) => (
              <tr key={row.id} className="hover:bg-primary-50/50 dark:hover:bg-primary-900/10 transition-colors">
                {columns.map((col, i) => (
                  <td key={i} className={`px-6 py-4 ${col.className || ''}`}>
                    {typeof col.accessor === 'function' ? col.accessor(row) : (row[col.accessor] as any)}
                  </td>
                ))}
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-6 py-8 text-center text-text-muted">No results found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="p-4 border-t border-border flex items-center justify-between bg-bg-secondary">
          <p className="text-xs text-text-muted">
            Showing {(page - 1) * itemsPerPage + 1} to {Math.min(page * itemsPerPage, filtered.length)} of {filtered.length} entries
          </p>
          <div className="flex gap-1">
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1 rounded bg-input-bg border border-border disabled:opacity-50"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1 rounded bg-input-bg border border-border disabled:opacity-50"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
