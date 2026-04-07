'use client';

import { useEffect, useMemo, useState } from 'react';
import { STORAGE_KEYS, UserRecord, readJson, writeJson } from '@/lib/storage';

type Props = {
  children: (sessionEmail: string) => React.ReactNode;
};

export function AuthGate({ children }: Props) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setSessionEmail(readJson<string | null>(STORAGE_KEYS.session, null));
  }, []);

  const title = useMemo(
    () => (mode === 'login' ? 'Login to your sealed dashboard' : 'Create your collector account'),
    [mode]
  );

  function submit() {
    setError('');
    const users = readJson<UserRecord[]>(STORAGE_KEYS.users, []);

    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    if (mode === 'register') {
      if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
        setError('That email already exists.');
        return;
      }
      const nextUsers = [...users, { email, password, createdAt: new Date().toISOString() }];
      writeJson(STORAGE_KEYS.users, nextUsers);
      writeJson(STORAGE_KEYS.session, email);
      setSessionEmail(email);
      return;
    }

    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
      setError('Invalid email or password.');
      return;
    }

    writeJson(STORAGE_KEYS.session, user.email);
    setSessionEmail(user.email);
  }

  function logout() {
    writeJson(STORAGE_KEYS.session, null);
    setSessionEmail(null);
  }

  if (!sessionEmail) {
    return (
      <div className="authWrap">
        <div className="authCard">
          <h2>{title}</h2>
          <p className="muted">
            This MVP uses browser-side authentication so you can ship immediately on Vercel without setting up a separate database.
          </p>
          <div className="authFields">
            <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error ? <p className="errorText">{error}</p> : null}
          <div className="row gap12">
            <button className="button" onClick={submit}>
              {mode === 'login' ? 'Login' : 'Create account'}
            </button>
            <button className="button buttonGhost" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
              {mode === 'login' ? 'Need an account?' : 'Already have an account?'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="topSessionBar">
        <span>Logged in as {sessionEmail}</span>
        <button className="linkButton" onClick={logout}>Logout</button>
      </div>
      {children(sessionEmail)}
    </>
  );
}
