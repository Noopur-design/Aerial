'use client';

import SignIn from '@/components/account/SignIn';
import Dashboard from '@/components/account/Dashboard';
import { useStore } from '@/store/useStore';

export default function AccountView() {
  const hydrated = useStore((s) => s.hydrated);
  const user = useStore((s) => s.user);
  if (!hydrated) return <div className="min-h-[70vh]" aria-busy="true" />;
  return user ? <Dashboard key={user.email} /> : <SignIn />;
}
