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
        <h3 style={{ marginTop: 8 }}>Workspace active</h3>
        <p>Your portfolio and alert settings are currently stored on this device so you can test the full workflow immediately.</p>
        <div className="notice">Signed in as {user.email}</div>
        <div style={{ marginTop: 16 }}>
          <button onClick={signOut} className="btn btn-secondary">Sign out</button>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="kicker">Workspace access</div>
      <h3 style={{ marginTop: 8 }}>Create a private workspace</h3>
      <p>Use a lightweight local sign-in to save portfolio entries and threshold alerts on this device.</p>
      <form onSubmit={signIn} className="list">
        <input className="input" type="email" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button className="btn btn-primary" type="submit">Continue</button>
      </form>
    </div>
  );
}
