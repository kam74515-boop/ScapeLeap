'use client';

import { ArrowRight, Eye, EyeOff, LoaderCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { authClient } from '@/libs/AuthClient';

export function AuthForm({ mode, locale }: { mode: 'sign-in' | 'sign-up'; locale: string }) {
  const isZh = locale === 'zh';
  const isSignUp = mode === 'sign-up';
  const prefix = locale === 'en' ? '/en' : '';
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError('');

    const result = isSignUp
      ? await authClient.signUp.email({ email, name, password })
      : await authClient.signIn.email({ email, password });

    if (result.error) {
      setError(result.error.message ?? (isZh ? '操作失败，请稍后再试。' : 'Something went wrong. Please try again.'));
      setPending(false);
      return;
    }

    router.push(isSignUp ? `${prefix}/onboarding` : `${prefix}/app/scapeleap/dashboard`);
    router.refresh();
  }

  return (
    <div className="w-full max-w-[420px]">
      <span className="eyebrow">{isSignUp ? (isZh ? '创建工作空间' : 'Create your workspace') : (isZh ? '欢迎回来' : 'Welcome back')}</span>
      <h1 className="mt-5 text-3xl font-bold tracking-[-0.045em]">
        {isSignUp ? (isZh ? '开始构建更好的设计流程' : 'Build a better design workflow') : (isZh ? '登录 ScapeLeap' : 'Sign in to ScapeLeap')}
      </h1>
      <p className="mt-3 text-sm/6 text-muted-foreground">
        {isSignUp
          ? (isZh ? '14 天完整体验，之后可继续使用免费版。' : 'Get full access for 14 days, then continue on Free.')
          : (isZh ? '继续进入你的团队工作空间。' : 'Continue to your team workspace.')}
      </p>

      <form className="mt-8 space-y-4" onSubmit={submit}>
        {isSignUp && (
          <label className="block">
            <span className="text-xs font-bold">{isZh ? '姓名' : 'Name'}</span>
            <input
              className="
                mt-2 h-12 w-full rounded-xl border border-input bg-white px-3.5
                text-sm transition outline-none
                focus:border-brand-400 focus:ring-4 focus:ring-brand-100
              "
              value={name}
              onChange={event => setName(event.target.value)}
              placeholder={isZh ? '你的姓名' : 'Your name'}
              autoComplete="name"
              required
            />
          </label>
        )}
        <label className="block">
          <span className="text-xs font-bold">{isZh ? '工作邮箱' : 'Work email'}</span>
          <input
            className="
              mt-2 h-12 w-full rounded-xl border border-input bg-white px-3.5
              text-sm transition outline-none
              focus:border-brand-400 focus:ring-4 focus:ring-brand-100
            "
            value={email}
            onChange={event => setEmail(event.target.value)}
            placeholder="name@studio.com"
            autoComplete="email"
            type="email"
            required
          />
        </label>
        <label className="block">
          <span className="text-xs font-bold">{isZh ? '密码' : 'Password'}</span>
          <span className="relative mt-2 block">
            <input
              className="
                h-12 w-full rounded-xl border border-input bg-white px-3.5 pr-11
                text-sm transition outline-none
                focus:border-brand-400 focus:ring-4 focus:ring-brand-100
              "
              value={password}
              onChange={event => setPassword(event.target.value)}
              placeholder={isZh ? '至少 10 位字符' : 'At least 10 characters'}
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
              type={showPassword ? 'text' : 'password'}
              minLength={10}
              required
            />
            <button
              className="
                absolute inset-y-0 right-0 grid w-11 place-items-center
                text-muted-foreground
              "
              type="button"
              onClick={() => setShowPassword(value => !value)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword
                ? <EyeOff className="size-4" />
                : (
                    <Eye className="size-4" />
                  )}
            </button>
          </span>
        </label>

        {error && (
          <p className="
            rounded-xl bg-red-50 px-3.5 py-3 text-xs font-semibold text-red-700
          "
          >
            {error}
          </p>
        )}

        <button className="flat-button-primary h-12 w-full" type="submit" disabled={pending}>
          {pending
            ? <LoaderCircle className="size-4 animate-spin" />
            : (
                <>
                  {isSignUp ? (isZh ? '创建账户' : 'Create account') : (isZh ? '登录' : 'Sign in')}
                  <ArrowRight className="size-4" />
                </>
              )}
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        {isSignUp ? (isZh ? '已有账户？' : 'Already have an account?') : (isZh ? '还没有账户？' : 'New to ScapeLeap?')}
        {' '}
        <Link
          href={`${prefix}/${isSignUp ? 'sign-in' : 'sign-up'}`}
          className="font-bold text-brand-600"
        >
          {isSignUp ? (isZh ? '直接登录' : 'Sign in') : (isZh ? '免费注册' : 'Create account')}
        </Link>
      </p>
      <p className="mt-8 text-center text-[10px]/5 text-[#a0a0aa]">
        {isZh ? '继续即表示你同意服务条款和隐私政策。' : 'By continuing, you agree to the Terms and Privacy Policy.'}
      </p>
    </div>
  );
}
