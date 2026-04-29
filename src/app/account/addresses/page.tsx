'use client';
import { useState } from 'react';
import { MapPin, Plus, Trash2, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AddressesPage() {
  const [addresses, setAddresses] = useState([
    { id: 1, street: '123 Baker Street', city: 'London', postalCode: 'NW1 6XE', country: 'UK', isDefault: true }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-text-primary">Saved Addresses</h1>
        <Button size="sm" icon={<Plus size={16} />}>Add New</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map(addr => (
          <div key={addr.id} className="bg-card-bg border border-border rounded-2xl p-6 relative">
            {addr.isDefault && (
              <span className="absolute top-4 right-4 text-[10px] uppercase tracking-wider font-bold bg-primary-100 text-primary-700 px-2 py-1 rounded">Default</span>
            )}
            <div className="flex items-start gap-3 mb-4">
              <MapPin className="text-text-muted shrink-0 mt-0.5" size={20} />
              <div className="text-sm text-text-secondary leading-relaxed">
                <p className="font-medium text-text-primary mb-1">{addr.street}</p>
                <p>{addr.city}, {addr.postalCode}</p>
                <p>{addr.country}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <button className="text-xs font-medium text-text-muted hover:text-primary-600 flex items-center gap-1 cursor-pointer"><Edit2 size={12}/> Edit</button>
              <button className="text-xs font-medium text-text-muted hover:text-red-500 flex items-center gap-1 cursor-pointer"><Trash2 size={12}/> Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
