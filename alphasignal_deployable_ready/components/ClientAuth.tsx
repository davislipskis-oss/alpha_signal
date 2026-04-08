'use client';

import { useEffect, useState } from 'react';
import { userStore } from '@/lib/storage';

export function ClientAuth() {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [email, setEmail] = useState('');

  useEffect(() => { setUser(userStore.get()); }, []);

  function signIn(event: React.FormEvent) {
    event.preventDefault();
    if (!email.trim()) return;
    const nextUser = { email: email.trim() };
    userStore.set(nextUser);
    setUser(nextUser);
    setEmail('');
  }

  function signOut() {
    userStore.set(null);
    setUser(null);
  }

  if (user) {
    return (
      <div className="card">
        <div className="kicker">Workspace access</div>
        <h3 style={{ marginTop: 8 }}>Signed in locally</h3>
        <p>This is a deployable demo auth layer. Swap this for Supabase auth when you are ready.</p>
        <div className="notice">Current session: {user.email}</div>
        <div style={{ marginTop: 16 }}>
          <button onClick={signOut} className="btn btn-secondary">Sign out</button>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="kicker">Workspace access</div>
      <h3 style={{ marginTop: 8 }}>Start with a local demo login</h3>
      <p>This lets you test the experience now. Replace with Supabase when you want real auth and cloud user data.</p>
      <form onSubmit={signIn} className="list">
        <input className="input" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button className="btn btn-primary" type="submit">Continue</button>
      </form>
    </div>
  );
}
