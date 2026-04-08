'use client';

import { useEffect, useState } from 'react';
import { getSessionEmail, loginUser, logoutUser, registerUser } from '@/lib/storage';

export function AuthPanel({ onSessionChange }: { onSessionChange: (email: string | null) => void }) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const session = getSessionEmail();
    setSessionEmail(session);
    onSessionChange(session);
  }, [onSessionChange]);

  function submit() {
    setMessage(null);
    setError(null);
    try {
      if (mode === 'login') {
        const user = loginUser(email.trim(), password);
        setSessionEmail(user.email);
        onSessionChange(user.email);
        setMessage('You are now inside the Oracle terminal on this browser.');
      } else {
        const user = registerUser(email.trim(), password);
        setSessionEmail(user.email);
        onSessionChange(user.email);
        setMessage('Account forged. Your local Oracle vault is ready.');
      }
      setPassword('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown auth error');
    }
  }

  function signOut() {
    logoutUser();
    setSessionEmail(null);
    onSessionChange(null);
    setMessage('Signed out from this browser profile.');
  }

  return (
    <div className="card cardPad">
      <div className="actions" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div className="eyebrow">Access layer</div>
          <h3 style={{ margin: '14px 0 8px', fontSize: 28, letterSpacing: '-0.04em' }}>Enter the Oracle terminal</h3>
          <p className="copyBlock" style={{ margin: 0 }}>
            Fast-launch auth stores accounts in this browser only. It is perfect for MVP validation, not yet for multi-device paid production.
          </p>
        </div>
        {sessionEmail ? <button className="btnGhost" onClick={signOut}>Sign out</button> : null}
      </div>
      <div className="hr" />
      {sessionEmail ? (
        <div className="ok">Signed in as <strong>{sessionEmail}</strong>. Portfolio and alerts are now unlocked in this browser.</div>
      ) : (
        <>
          <div className="actions" style={{ marginBottom: 12 }}>
            <button className={mode === 'login' ? 'btn' : 'btnGhost'} onClick={() => setMode('login')}>Login</button>
            <button className={mode === 'register' ? 'btn' : 'btnGhost'} onClick={() => setMode('register')}>Register</button>
          </div>
          <div className="grid2">
            <input className="textInput" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input className="textInput" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
          </div>
          <div className="actions" style={{ marginTop: 12 }}>
            <button className="btn" onClick={submit}>{mode === 'login' ? 'Unlock my dashboard' : 'Create my account'}</button>
          </div>
        </>
      )}
      {message ? <div className="notice" style={{ marginTop: 12 }}>{message}</div> : null}
      {error ? <div className="error" style={{ marginTop: 12 }}>{error}</div> : null}
    </div>
  );
}
