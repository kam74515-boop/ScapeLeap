'use client';

import {
  Bell,
  Bot,
  Boxes,
  ChevronDown,
  CircleDollarSign,
  FolderKanban,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  Search,
  Settings,
  UsersRound,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { BrandMark } from '@/components/BrandMark';
import { authClient } from '@/libs/AuthClient';

const nav = [
  { id: 'dashboard', label: '工作台', en: 'Dashboard', icon: LayoutDashboard },
  { id: 'customers', label: '客户', en: 'Customers', icon: UsersRound },
  { id: 'projects', label: '项目', en: 'Projects', icon: FolderKanban },
  { id: 'ai', label: 'AI Studio', en: 'AI Studio', icon: Bot },
  { id: 'resources', label: '资源库', en: 'Resources', icon: Boxes },
  { id: 'finance', label: '设计费', en: 'Finance', icon: CircleDollarSign },
  { id: 'team', label: '团队', en: 'Team', icon: UsersRound },
  { id: 'inbox', label: '收件箱', en: 'Inbox', icon: Inbox, badge: '6' },
];

export function StudioShell({
  children,
  orgSlug,
  locale,
  userName,
}: {
  children: React.ReactNode;
  orgSlug: string;
  locale: string;
  userName: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefix = locale === 'en' ? '/en' : '';
  const root = `${prefix}/app/${orgSlug}`;

  async function signOut() {
    await authClient.signOut();
    router.push(`${prefix}/sign-in`);
    router.refresh();
  }

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex h-[68px] items-center justify-between px-4">
        <BrandMark href={`${root}/dashboard`} />
        <button
          className="
            grid size-9 place-items-center rounded-lg
            hover:bg-secondary
            lg:hidden
          "
          onClick={() => setMobileOpen(false)}
          aria-label="Close navigation"
        >
          <X className="size-4" />
        </button>
      </div>

      <div className="px-3">
        <button className="
          flex w-full items-center gap-3 rounded-xl border border-border
          bg-white px-3 py-2.5 text-left transition
          hover:border-brand-200
        "
        >
          <span className="
            grid size-8 place-items-center rounded-lg bg-brand-100 text-xs
            font-black text-brand-700
          "
          >
            未
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-xs font-bold">未形设计事务所</span>
            <span className="mt-0.5 block text-[10px] text-muted-foreground">Business</span>
          </span>
          <ChevronDown className="size-3.5 text-muted-foreground" />
        </button>
      </div>

      <nav className="mt-5 flex-1 space-y-1 px-3">
        {nav.map((item) => {
          const href = `${root}/${item.id}`;
          const active = pathname === href || pathname.startsWith(`${href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`
                flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px]
                font-semibold transition
                ${
            active
              ? 'bg-brand-50 text-brand-700'
              : `
                text-[#6d6d79]
                hover:bg-[#f1f1f5] hover:text-foreground
              `
            }
              `}
            >
              <Icon className="size-[17px]" strokeWidth={active ? 2.3 : 1.8} />
              <span>{locale === 'zh' ? item.label : item.en}</span>
              {item.badge && (
                <span className="
                  ml-auto rounded-full bg-coral px-1.5 py-0.5 text-[9px]
                  font-bold text-white
                "
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 pb-3">
        <div className="mb-2 rounded-xl bg-[#191820] p-3 text-white">
          <div className="flex items-center gap-2">
            <span className="
              grid size-7 place-items-center rounded-lg bg-ai/20 text-[#c797ff]
            "
            >
              <Bot className="size-4" />
            </span>
            <span className="text-xs font-bold">构境 AI</span>
            <span className="ml-auto size-1.5 rounded-full bg-mint" />
          </div>
          <p className="mt-3 text-[10px]/5 text-white/45">
            {locale === 'zh' ? '3 个生成任务正在进行' : '3 generation jobs running'}
          </p>
        </div>
        <Link
          href={`${root}/settings`}
          className={`
            flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px]
            font-semibold
            ${pathname.startsWith(`${root}/settings`)
      ? `bg-brand-50 text-brand-700`
      : `
        text-[#6d6d79]
        hover:bg-[#f1f1f5]
      `}
          `}
        >
          <Settings className="size-[17px]" />
          {locale === 'zh' ? '设置' : 'Settings'}
        </Link>
        <div className="
          mt-2 flex items-center gap-3 border-t border-border px-2 pt-3
        "
        >
          <span className="
            grid size-9 place-items-center rounded-xl bg-[#dcd9ff] text-xs
            font-black text-brand-800
          "
          >
            {userName.slice(0, 1).toUpperCase()}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-xs font-bold">{userName}</span>
            <span className="mt-0.5 block text-[10px] text-muted-foreground">{locale === 'zh' ? '工作室管理员' : 'Studio admin'}</span>
          </span>
          <button
            onClick={signOut}
            className="
              grid size-8 place-items-center rounded-lg text-muted-foreground
              hover:bg-secondary hover:text-foreground
            "
            aria-label="Sign out"
          >
            <LogOut className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f7f7fb]">
      <aside className="
        fixed inset-y-0 left-0 z-40 hidden w-[224px] border-r border-border
        bg-[#fbfbfd]
        lg:block
      "
      >
        {sidebar}
      </aside>
      {mobileOpen && (
        <div className="
          fixed inset-0 z-50
          lg:hidden
        "
        >
          <button className="absolute inset-0 bg-black/35" onClick={() => setMobileOpen(false)} aria-label="Close navigation backdrop" />
          <aside className="relative h-full w-[280px] bg-[#fbfbfd] shadow-2xl">{sidebar}</aside>
        </div>
      )}

      <div className="lg:pl-[224px]">
        <header className="
          sticky top-0 z-30 flex h-[68px] items-center border-b border-border
          bg-white/90 px-4 backdrop-blur-xl
          md:px-6
        "
        >
          <button
            className="
              mr-3 grid size-9 place-items-center rounded-lg
              hover:bg-secondary
              lg:hidden
            "
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
          >
            <Menu className="size-5" />
          </button>
          <button className="
            flex h-10 w-full max-w-[420px] items-center gap-3 rounded-xl
            bg-[#f2f2f6] px-3 text-left text-xs text-[#888895]
          "
          >
            <Search className="size-4" />
            <span className="
              hidden
              sm:block
            "
            >
              {locale === 'zh' ? '搜索项目、客户、产品或文件…' : 'Search projects, clients, products or files…'}
            </span>
            <span className="
              ml-auto hidden rounded-md border border-[#dddde6] bg-white px-1.5
              py-0.5 text-[9px] font-bold
              sm:block
            "
            >
              ⌘ K
            </span>
          </button>
          <div className="ml-auto flex items-center gap-2">
            <button
              className="
                relative grid size-10 place-items-center rounded-xl border
                border-border bg-white
                hover:bg-secondary
              "
              aria-label="Notifications"
            >
              <Bell className="size-4" />
              <span className="
                absolute top-2.5 right-2.5 size-1.5 rounded-full bg-coral ring-2
                ring-white
              "
              />
            </button>
            <Link
              href={`${root}/projects/new`}
              className="
                flat-button-primary h-10 px-3
                md:px-4
              "
            >
              <Plus className="size-4" />
              <span className="
                hidden
                sm:inline
              "
              >
                {locale === 'zh' ? '新建项目' : 'New project'}
              </span>
            </Link>
          </div>
        </header>
        <main className="
          min-h-[calc(100vh-68px)] p-4
          md:p-6
          xl:p-8
        "
        >
          {children}
        </main>
      </div>
    </div>
  );
}
