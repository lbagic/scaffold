import { GC } from '@/api/grpc';
import Button from '@/components/NextUi/Button';
import Input from '@/components/NextUi/Input';
import { $account } from '@/modules/account';
import { useState } from 'react';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function login() {
    const res = await GC.AuthService.login({ email, password });
    $account.set({ token: res.token, user: res.user });
  }

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        login();
      }}
      className="grid gap-4"
    >
      <Input
        label="Email"
        value={email}
        type="email"
        isRequired
        autoComplete="username"
        onValueChange={setEmail}
      />
      <Input
        label="Password"
        value={password}
        type="password"
        isRequired
        autoComplete="current-password"
        onValueChange={setPassword}
      />
      <Button type="submit" size="lg" className="mt-6">
        Login
      </Button>
    </form>
  );
}
