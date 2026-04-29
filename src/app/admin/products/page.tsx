'use client';
import { mockProducts } from '@/lib/mock-data';
import { DataTable } from '@/components/admin/DataTable';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import { Plus } from 'lucide-react';

export default function AdminProductsPage() {
  const columns = [
    { 
      header: 'Product', 
      accessor: (row: typeof mockProducts[0]) => (
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-bg-secondary">
            <Image src={row.images[0]} alt={row.name} fill className="object-cover" />
          </div>
          <div>
            <p className="font-medium text-text-primary">{row.name}</p>
            <p className="text-xs text-text-muted capitalize">{row.category}</p>
          </div>
        </div>
      ) 
    },
    { header: 'Price', accessor: (row: typeof mockProducts[0]) => formatPrice(row.price) },
    { 
      header: 'Stock', 
      accessor: (row: typeof mockProducts[0]) => (
        <span className={row.stock < 5 ? 'text-tangerine font-bold' : ''}>{row.stock}</span>
      ) 
    },
    { 
      header: 'Status', 
      accessor: (row: typeof mockProducts[0]) => (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${row.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
          {row.isActive ? 'Active' : 'Draft'}
        </span>
      ) 
    },
    { 
      header: 'Actions', 
      accessor: () => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Edit</Button>
        </div>
      )
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-text-primary">Products Inventory</h1>
        <Button icon={<Plus size={16} />}>Add Product</Button>
      </div>

      <DataTable columns={columns} data={mockProducts} />
    </div>
  );
}
