import { Inbox, LayoutDashboard, PackageSearch } from 'lucide-react';
import Link from 'next/link';

type AdminSection = 'dashboard' | 'enquiries' | 'products';

const items = [
  {
    key: 'dashboard' as const,
    href: '/admin',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    key: 'enquiries' as const,
    href: '/admin/enquiries',
    label: 'Enquiries',
    icon: Inbox,
  },
  {
    key: 'products' as const,
    href: '/admin/products',
    label: 'Products',
    icon: PackageSearch,
  },
];

export function AdminNavigation({ current }: { current: AdminSection }) {
  return (
    <nav
      aria-label="Administrator sections"
      className="mt-8 flex flex-wrap gap-2 rounded-2xl border border-[color:var(--line)] bg-white p-2 shadow-sm"
    >
      {items.map((item) => {
        const Icon = item.icon;
        const active = item.key === current;
        return (
          <Link
            aria-current={active ? 'page' : undefined}
            className={`inline-flex min-h-11 items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${
              active
                ? 'bg-[color:var(--ink)] text-white'
                : 'text-[color:var(--muted)] hover:bg-[color:var(--cream)] hover:text-[color:var(--ink)]'
            }`}
            href={item.href}
            key={item.key}
          >
            <Icon size={17} /> {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
