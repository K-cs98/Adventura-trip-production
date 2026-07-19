import AdminNav from '@/components/admin/AdminNav';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <AdminNav />
      <div className="max-w-6xl mx-auto px-6 py-10">{children}</div>
    </div>
  );
}
