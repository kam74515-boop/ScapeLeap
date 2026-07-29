'use client';

import { ArrowRight, Building2, Check, LoaderCircle, UsersRound } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { BrandMark } from '@/components/BrandMark';
import { authClient } from '@/libs/AuthClient';

function normalizeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 42);
}

export function OnboardingForm({ locale, userName }: { locale: string; userName: string }) {
  const zh = locale === 'zh';
  const prefix = locale === 'en' ? '/en' : '';
  const router = useRouter();
  const [name, setName] = useState(zh ? `${userName}的设计工作室` : `${userName}'s studio`);
  const suggested = useMemo(() => normalizeSlug(name) || 'new-studio', [name]);
  const [slug, setSlug] = useState(suggested);
  const [teamSize, setTeamSize] = useState('2-10');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError('');
    const safeSlug = normalizeSlug(slug) || suggested;
    const result = await authClient.organization.create({
      name,
      slug: safeSlug,
      metadata: { teamSize, industry: 'interior_design' },
    });

    if (result.error || !result.data) {
      setError(result.error?.message ?? (zh ? '创建工作空间失败，请换一个地址标识。' : 'Could not create the workspace. Try another slug.'));
      setPending(false);
      return;
    }

    await authClient.organization.setActive({ organizationId: result.data.id });
    router.push(`${prefix}/app/${safeSlug}/dashboard`);
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#f7f7fb] px-5 py-8">
      <div className="mx-auto max-w-[980px]">
        <BrandMark href={prefix || '/'} />
        <div className="
          mt-12 grid gap-8
          lg:grid-cols-[0.8fr_1.2fr]
        "
        >
          <div>
            <span className="eyebrow">{zh ? '第 1 步，共 2 步' : 'Step 1 of 2'}</span>
            <h1 className="
              mt-6 text-4xl leading-[1.05] font-bold tracking-[-0.055em]
            "
            >
              {zh ? '先创建你的工作室。' : 'Create your studio workspace.'}
            </h1>
            <p className="mt-5 text-sm/7 text-muted-foreground">
              {zh ? '工作空间会隔离客户、项目、团队权限与商业数据。稍后可以邀请成员加入。' : 'Your workspace isolates clients, projects, permissions and commercial data. Invite your team next.'}
            </p>
            <div className="mt-8 space-y-4">
              {([
                [Building2, zh ? '独立组织空间和品牌资料' : 'Isolated organization and brand'],
                [UsersRound, zh ? '面向设计团队的角色权限' : 'Studio-specific roles and permissions'],
                [Check, zh ? '默认七阶段项目模板' : 'Seven-stage project template included'],
              ] as const).map(([Icon, text]) => (
                <div
                  key={String(text)}
                  className="flex items-center gap-3 text-xs font-semibold"
                >
                  <span className="
                    grid size-8 place-items-center rounded-xl bg-white
                    text-brand-600
                  "
                  >
                    <Icon className="size-4" />
                  </span>
                  {String(text)}
                </div>
              ))}
            </div>
          </div>

          <form
            onSubmit={submit}
            className="
              flat-card bg-white p-6
              md:p-8
            "
          >
            <h2 className="text-lg font-bold">{zh ? '工作室信息' : 'Studio details'}</h2>
            <div className="mt-6 space-y-5">
              <label className="block">
                <span className="text-xs font-bold">{zh ? '工作室名称' : 'Studio name'}</span>
                <input
                  className="
                    mt-2 h-12 w-full rounded-xl border border-input px-3.5
                    text-sm outline-none
                    focus:border-brand-400 focus:ring-4 focus:ring-brand-100
                  "
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    setSlug(normalizeSlug(event.target.value));
                  }}
                  required
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold">{zh ? '访问地址' : 'Workspace URL'}</span>
                <span className="
                  mt-2 flex h-12 items-center rounded-xl border border-input
                  bg-white px-3.5
                  focus-within:border-brand-400 focus-within:ring-4
                  focus-within:ring-brand-100
                "
                >
                  <span className="text-xs text-muted-foreground">scapeleap.com/app/</span>
                  <input
                    className="
                      min-w-0 flex-1 bg-transparent text-xs font-semibold
                      outline-none
                    "
                    value={slug}
                    onChange={event => setSlug(event.target.value)}
                    required
                  />
                </span>
              </label>
              <fieldset>
                <legend className="text-xs font-bold">{zh ? '团队规模' : 'Team size'}</legend>
                <div className="
                  mt-2 grid grid-cols-2 gap-2
                  sm:grid-cols-4
                "
                >
                  {['1', '2-10', '11-30', '31+'].map(size => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setTeamSize(size)}
                      className={`
                        rounded-xl border p-3 text-xs font-bold
                        ${teamSize === size
                      ? `border-brand-400 bg-brand-50 text-brand-700`
                      : `border-border`}
                      `}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>
            {error && (
              <p className="
                mt-5 rounded-xl bg-red-50 p-3 text-xs font-semibold text-red-700
              "
              >
                {error}
              </p>
            )}
            <button className="flat-button-primary mt-7 h-12 w-full" disabled={pending}>
              {pending
                ? <LoaderCircle className="size-4 animate-spin" />
                : (
                    <>
                      {zh ? '创建并进入工作室' : 'Create workspace'}
                      <ArrowRight className="size-4" />
                    </>
                  )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
