import type { MarketingLocale } from './content';
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  Boxes,
  Check,
  CircleDollarSign,
  Clock3,
  Files,
  FolderKanban,
  LayoutDashboard,
  Menu,
  MessageSquareText,
  MousePointer2,
  PackageCheck,
  PanelsTopLeft,
  Play,
  Plus,
  ScanLine,
  Search,
  ShieldCheck,
  Sparkles,
  UsersRound,
  WandSparkles,
} from 'lucide-react';
import Link from 'next/link';
import { BrandMark } from '@/components/BrandMark';
import { marketingCopy } from './content';

const stageNames = ['需求洞察', '现场勘测', '概念提案', '方案设计', '深化设计', '施工图', '交付复盘'];

function path(locale: MarketingLocale, href: string) {
  return locale === 'en' ? `/en${href === '/' ? '' : href}` : href;
}

function ProductPreview() {
  const sideItems = [
    [LayoutDashboard, '工作台'],
    [UsersRound, '客户'],
    [FolderKanban, '项目'],
    [Boxes, '资源库'],
    [CircleDollarSign, '设计费'],
  ] as const;

  return (
    <div className="relative mx-auto mt-16 w-full max-w-[1120px]">
      <div className="
        absolute -top-12 -right-4 size-28 rounded-full bg-sun/30 blur-2xl
      "
      />
      <div className="
        absolute -bottom-10 -left-4 size-36 rounded-full bg-brand-300/30
        blur-3xl
      "
      />
      <div className="
        relative overflow-hidden rounded-[24px] border border-[#dfdfee]
        bg-[#f7f7fb] p-2 shadow-[0_32px_80px_rgba(38,32,91,0.16)]
      "
      >
        <div className="
          flex min-h-[610px] overflow-hidden rounded-[17px] bg-white
        "
        >
          <aside className="
            hidden w-[190px] shrink-0 border-r border-[#ededf3] bg-[#fbfbfd] p-4
            md:block
          "
          >
            <BrandMark compact />
            <button className="
              mt-5 flex w-full items-center justify-between rounded-xl border
              border-[#e7e7ef] bg-white px-3 py-2.5 text-left
            "
            >
              <span>
                <span className="block text-[10px] font-semibold text-[#9292a0]">工作空间</span>
                <span className="mt-0.5 block text-xs font-bold">未形设计事务所</span>
              </span>
              <span className="text-[#9292a0]">⌄</span>
            </button>
            <nav className="mt-5 space-y-1">
              {sideItems.map(([Icon, label], index) => (
                <div
                  key={label}
                  className={`
                    flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs
                    font-semibold
                    ${
                index === 2
                  ? 'bg-brand-50 text-brand-700'
                  : `text-[#747482]`
                }
                  `}
                >
                  <Icon className="size-4" />
                  {label}
                </div>
              ))}
            </nav>
            <div className="mt-8">
              <p className="
                px-3 text-[10px] font-bold tracking-[0.12em] text-[#ababba]
                uppercase
              "
              >
                智能助手
              </p>
              <div className="
                mt-2 flex items-center gap-3 rounded-xl bg-[#191820] p-3 text-xs
                font-semibold text-white
              "
              >
                <Sparkles className="size-4 text-[#bf8cff]" />
                构境 AI
                <span className="ml-auto size-1.5 rounded-full bg-mint" />
              </div>
            </div>
            <div className="mt-[165px] rounded-xl bg-[#efeff5] p-3">
              <div className="flex items-center gap-2 text-xs font-bold">
                <span className="
                  grid size-7 place-items-center rounded-lg bg-[#d9d7ff]
                  text-brand-700
                "
                >
                  林
                </span>
                林予安
              </div>
              <p className="mt-2 text-[10px] text-[#888895]">主创建筑设计师</p>
            </div>
          </aside>

          <main className="min-w-0 flex-1">
            <header className="
              flex h-[66px] items-center gap-3 border-b border-[#ededf3] px-4
              md:px-6
            "
            >
              <Menu className="
                size-5
                md:hidden
              "
              />
              <div>
                <p className="text-[11px] font-medium text-[#9999a7]">项目 / 住宅</p>
                <h3 className="text-sm font-bold tracking-[-0.02em]">青山湖 · 云栖住宅</h3>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <button className="
                  hidden rounded-lg border border-[#e6e6ed] px-3 py-2
                  text-[11px] font-bold
                  sm:block
                "
                >
                  客户预览
                </button>
                <button className="
                  flex items-center gap-2 rounded-lg bg-brand-600 px-3 py-2
                  text-[11px] font-bold text-white
                "
                >
                  <Plus className="size-3.5" />
                  新建内容
                </button>
              </div>
            </header>

            <div className="
              p-4
              md:p-6
            "
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold text-brand-600">方案设计 · 第 4 阶段</p>
                  <h2 className="
                    mt-1 text-xl font-bold tracking-[-0.04em]
                    md:text-2xl
                  "
                  >
                    让空间决策更快发生
                  </h2>
                </div>
                <div className="flex -space-x-2">
                  {['林', '陈', '许', '+3'].map((name, index) => (
                    <span
                      key={name}
                      className={`
                        grid size-8 place-items-center rounded-full border-2
                        border-white text-[10px] font-bold
                        ${
                    ['bg-[#d9d7ff] text-brand-800', `
                      bg-[#ffe2a6] text-[#815710]
                    `, `bg-[#c8f7e6] text-[#18775a]`, `
                      bg-[#ececf2] text-[#676774]
                    `][index]
                    }
                      `}
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto pb-1">
                {stageNames.map((stage, index) => (
                  <div
                    key={stage}
                    className={`
                      min-w-[90px] flex-1 rounded-xl p-3
                      ${
                  index === 3
                    ? 'bg-brand-600 text-white'
                    : index < 3
                      ? `bg-[#efefff] text-brand-800`
                      : `bg-[#f2f2f6] text-[#8a8a97]`
                  }
                    `}
                  >
                    <span className="block text-[9px] font-bold opacity-60">
                      0
                      {index + 1}
                    </span>
                    <span className="
                      mt-2 block text-[10px] font-bold whitespace-nowrap
                    "
                    >
                      {stage}
                    </span>
                  </div>
                ))}
              </div>

              <div className="
                mt-5 grid gap-4
                lg:grid-cols-[1.45fr_0.75fr]
              "
              >
                <div className="
                  overflow-hidden rounded-2xl border border-[#e9e9ef]
                  bg-[#f4f2ef]
                "
                >
                  <div className="
                    flex h-10 items-center border-b border-[#e1dfdc] bg-white/80
                    px-3
                  "
                  >
                    <span className="text-[10px] font-bold">客厅概念画布</span>
                    <div className="
                      ml-auto flex items-center gap-2 text-[#8f8f9c]
                    "
                    >
                      <MousePointer2 className="size-3.5" />
                      <ScanLine className="size-3.5" />
                      <Search className="size-3.5" />
                    </div>
                  </div>
                  <div className="
                    relative h-[290px] overflow-hidden bg-[#e9e5df] p-4
                  "
                  >
                    <div className="
                      absolute inset-0
                      bg-[linear-gradient(#ffffff_1px,transparent_1px),linear-gradient(90deg,#ffffff_1px,transparent_1px)]
                      bg-size-[24px_24px] opacity-30
                    "
                    />
                    <div className="
                      absolute top-7 left-8 h-[126px] w-[44%] -rotate-2
                      overflow-hidden rounded-sm bg-[#b8b0a5] shadow-lg
                    "
                    >
                      <div className="
                        absolute inset-x-0 bottom-0 h-[72%] bg-[#777b70]
                      "
                      />
                      <div className="
                        absolute bottom-3 left-4 h-12 w-28 rounded-t-[36px]
                        bg-[#e9dfce]
                      "
                      />
                      <div className="
                        absolute top-5 right-6 size-12 rounded-full bg-[#e3c68d]
                      "
                      />
                    </div>
                    <div className="
                      absolute top-10 right-7 w-[38%] rotate-2 rounded-sm
                      bg-white p-3 shadow-lg
                    "
                    >
                      <p className="text-[9px] font-black tracking-[0.12em]">MATERIAL NOTES</p>
                      <div className="mt-2 grid grid-cols-3 gap-1.5">
                        <span className="aspect-square bg-[#665f50]" />
                        <span className="aspect-square bg-[#d4c6ad]" />
                        <span className="aspect-square bg-[#9aa18d]" />
                      </div>
                      <p className="mt-2 text-[7px] leading-relaxed text-[#777]">温润木材、矿物涂料与低饱和织物，保持空间安静的层次。</p>
                    </div>
                    <div className="
                      absolute bottom-5 left-[28%] flex w-[48%] -rotate-1
                      items-center gap-3 rounded-xl bg-[#1b1a22] px-3 py-2.5
                      text-white shadow-xl
                    "
                    >
                      <span className="
                        grid size-7 place-items-center rounded-lg bg-ai/25
                      "
                      >
                        <WandSparkles className="size-3.5 text-[#cf9cff]" />
                      </span>
                      <span className="min-w-0 flex-1 truncate text-[9px]">把材质调整得更克制、自然…</span>
                      <span className="
                        rounded-md bg-white px-2 py-1 text-[8px] font-bold
                        text-[#222]
                      "
                      >
                        生成
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl bg-[#191820] p-4 text-white">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">AI 创作任务</span>
                      <span className="
                        rounded-full bg-mint/20 px-2 py-1 text-[9px] font-bold
                        text-mint
                      "
                      >
                        进行中
                      </span>
                    </div>
                    <p className="mt-5 text-2xl font-bold tracking-tighter">12 / 16</p>
                    <div className="
                      mt-3 h-1.5 overflow-hidden rounded-full bg-white/10
                    "
                    >
                      <div className="h-full w-3/4 rounded-full bg-ai" />
                    </div>
                    <p className="
                      mt-3 text-[10px] leading-relaxed text-white/55
                    "
                    >
                      正在生成客厅材质变体，大约还需 26 秒。
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[#e8e8ef] p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">待团队确认</span>
                      <span className="text-[10px] font-bold text-brand-600">查看全部</span>
                    </div>
                    {[
                      ['玄关收口方案', '今天 16:00'],
                      ['主材样板确认', '明天 11:30'],
                      ['灯具清单 v3', '周五'],
                    ].map(([title, time], index) => (
                      <div
                        key={title}
                        className="
                          mt-3 flex items-center gap-3 border-t border-[#f0f0f4]
                          pt-3
                        "
                      >
                        <span className={`
                          size-2 rounded-full
                          ${['bg-coral', `bg-sun`, `bg-mint`][index]}
                        `}
                        />
                        <span className="
                          min-w-0 flex-1 truncate text-[10px] font-semibold
                        "
                        >
                          {title}
                        </span>
                        <span className="text-[9px] text-[#9999a5]">{time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="
        animate-float-soft absolute -right-2 -bottom-6 hidden items-center gap-3
        rounded-2xl border border-white/70 bg-white px-4 py-3
        shadow-[0_16px_40px_rgba(40,36,90,0.15)]
        md:flex
      "
      >
        <span className="
          grid size-9 place-items-center rounded-xl bg-[#dcfaef] text-[#168562]
        "
        >
          <BadgeCheck className="size-5" />
        </span>
        <span>
          <span className="block text-[10px] font-semibold text-[#90909c]">客户刚刚确认</span>
          <span className="mt-0.5 block text-xs font-bold">客厅概念方案 v3</span>
        </span>
      </div>
    </div>
  );
}

function FeatureIcon({ children, tone }: { children: React.ReactNode; tone: string }) {
  return (
    <span className={`
      grid size-11 place-items-center rounded-xl
      ${tone}
    `}
    >
      {children}
    </span>
  );
}

export function MarketingSite({ locale }: { locale: MarketingLocale }) {
  const copy = marketingCopy[locale];
  const isZh = locale === 'zh';

  return (
    <div className="overflow-x-hidden bg-white">
      <header className="
        fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-white/88
        backdrop-blur-xl
      "
      >
        <div className="scape-container flex h-[68px] items-center">
          <BrandMark href={path(locale, '/')} />
          <nav className="
            ml-10 hidden items-center gap-7
            lg:flex
          "
          >
            {([
              [copy.nav.product, '/product'],
              [copy.nav.solutions, '/solutions/studios'],
              [copy.nav.pricing, '/pricing'],
              [copy.nav.resources, '/resources'],
            ] as const).map(([label, href]) => (
              <Link
                key={href}
                href={path(locale, href)}
                className="
                  text-sm font-semibold text-[#626270] transition
                  hover:text-brand-600
                "
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Link
              href={locale === 'zh' ? '/en' : '/'}
              className="
                hidden rounded-lg px-3 py-2 text-xs font-bold text-[#777784]
                hover:bg-[#f3f3f7]
                sm:block
              "
            >
              {locale === 'zh' ? 'EN' : '中文'}
            </Link>
            <Link
              href={path(locale, '/sign-in')}
              className="
                hidden px-3 py-2 text-sm font-semibold
                sm:block
              "
            >
              {copy.nav.signIn}
            </Link>
            <Link
              href={path(locale, '/sign-up')}
              className="
                flat-button-primary px-4 py-2 text-xs
                sm:text-sm
              "
            >
              {copy.nav.start}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden pt-36 pb-24">
          <div className="
            absolute top-20 left-[7%] size-52 rounded-full bg-brand-100/65
            blur-[90px]
          "
          />
          <div className="
            absolute top-36 right-[5%] size-64 rounded-full bg-[#ecd6ff]/65
            blur-[100px]
          "
          />
          <div className="scape-container relative text-center">
            <span className="eyebrow">
              <Sparkles className="size-3.5" />
              {copy.hero.eyebrow}
            </span>
            <h1 className="
              display-title mx-auto mt-7 max-w-[1050px] text-balance
            "
            >
              {copy.hero.titleA}
              <span className="relative whitespace-nowrap text-brand-600">
                {copy.hero.titleB}
                <svg
                  className="
                    absolute -bottom-3 left-1/2 w-[94%] -translate-x-1/2
                  "
                  viewBox="0 0 600 18"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M4 12.5C132 3.5 385 3.5 596 9" stroke="#a6a8ff" strokeWidth="7" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p className="
              mx-auto mt-9 max-w-[760px] text-base/8 text-balance text-[#686876]
              md:text-lg
            "
            >
              {copy.hero.description}
            </p>
            <div className="
              mt-8 flex flex-col items-center justify-center gap-3
              sm:flex-row
            "
            >
              <Link
                href={path(locale, '/sign-up')}
                className="flat-button-primary min-w-40 py-3.5"
              >
                {copy.hero.primary}
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href={path(locale, '/product')}
                className="flat-button-secondary min-w-40 py-3.5"
              >
                <Play className="size-4 fill-current" />
                {copy.hero.secondary}
              </Link>
            </div>
            <p className="mt-4 text-xs font-medium text-[#9292a0]">{copy.hero.note}</p>
            <ProductPreview />
          </div>
        </section>

        <section className="border-y border-[#ededf2] bg-[#fafafd] py-9">
          <div className="scape-container">
            <p className="
              text-center text-xs font-bold tracking-[0.16em] text-[#a0a0ad]
              uppercase
            "
            >
              {isZh ? '一套系统，贯穿设计工作室的完整价值链' : 'One operating system for the complete studio lifecycle'}
            </p>
            <div className="
              mt-7 grid grid-cols-2 gap-5 text-center
              sm:grid-cols-3
              lg:grid-cols-6
            "
            >
              {copy.proof.map((item, index) => (
                <div
                  key={item}
                  className="
                    flex items-center justify-center gap-2 text-xs font-bold
                    text-[#555561]
                  "
                >
                  {[UsersRound, FolderKanban, Bot, PackageCheck, CircleDollarSign, BadgeCheck].map((Icon, iconIndex) =>
                    iconIndex === index
                      ? (
                          <Icon
                            key={iconIndex}
                            className="size-4 text-brand-500"
                          />
                        )
                      : null,
                  )}
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="product" className="py-28">
          <div className="scape-container">
            <div className="max-w-[720px]">
              <span className="eyebrow">{isZh ? '不只是项目管理' : 'Beyond project management'}</span>
              <h2 className="section-title mt-6 text-balance">
                {isZh ? '让每一次设计决策，都能继续向前。' : 'Keep every design decision moving forward.'}
              </h2>
              <p className="mt-6 max-w-[630px] text-base/8 text-[#71717e]">
                {isZh
                  ? '没有割裂的表格、聊天记录和文件夹。项目上下文、专业数据与团队动作保持在同一条链路里。'
                  : 'Replace scattered sheets, messages and folders with one connected flow of context, data and team action.'}
              </p>
            </div>

            <div className="
              mt-14 grid gap-4
              md:grid-cols-2
              lg:grid-cols-3
            "
            >
              {[
                {
                  icon: <FolderKanban className="size-5" />,
                  tone: 'bg-brand-100 text-brand-700',
                  title: isZh ? '项目全景' : 'Project command',
                  text: isZh ? '七阶段设计流程、里程碑、负责人和客户决策，一眼掌握。' : 'Seven design stages, milestones, owners and client decisions in one view.',
                },
                {
                  icon: <WandSparkles className="size-5" />,
                  tone: 'bg-[#f1ddff] text-[#8a2dc9]',
                  title: isZh ? 'AI 设计画布' : 'AI design canvas',
                  text: isZh ? '从灵感搜集到风格变体，AI 生成始终保留项目上下文与人工确认。' : 'Go from references to visual variants while keeping project context and human approval.',
                },
                {
                  icon: <PackageCheck className="size-5" />,
                  tone: 'bg-[#d9f8ed] text-[#157a5c]',
                  title: 'FF&E Schedule',
                  text: isZh ? '产品、材质、供应商、预算、交期与变更状态保持实时一致。' : 'Keep products, materials, vendors, budget, lead times and changes in sync.',
                },
                {
                  icon: <CircleDollarSign className="size-5" />,
                  tone: 'bg-[#fff0cf] text-[#966814]',
                  title: isZh ? '设计费与报价' : 'Fees and proposals',
                  text: isZh ? '合同、报价、变更单、发票与回款，直接关联客户和项目。' : 'Connect contracts, proposals, change orders, invoices and payments to every project.',
                },
                {
                  icon: <UsersRound className="size-5" />,
                  tone: 'bg-[#ffe1df] text-[#b34239]',
                  title: isZh ? '团队与权限' : 'Teams and access',
                  text: isZh ? '多工作室、项目成员、岗位角色和数据权限，为 B2B 团队而设计。' : 'Organizations, project teams, studio roles and permissions built for B2B work.',
                },
                {
                  icon: <MessageSquareText className="size-5" />,
                  tone: 'bg-[#e4ecff] text-[#315db9]',
                  title: isZh ? '客户门户' : 'Client portal',
                  text: isZh ? '让客户查看方案、确认清单与反馈，不必进入团队后台。' : 'Let clients review designs, approve schedules and comment without entering your workspace.',
                },
              ].map(feature => (
                <article
                  key={feature.title}
                  className="
                    flat-card p-6 transition duration-300
                    hover:-translate-y-1 hover:border-brand-200
                  "
                >
                  <FeatureIcon tone={feature.tone}>{feature.icon}</FeatureIcon>
                  <h3 className="mt-6 text-lg font-bold tracking-[-0.03em]">{feature.title}</h3>
                  <p className="mt-3 text-sm/7 text-[#737380]">{feature.text}</p>
                  <Link
                    href={path(locale, '/product')}
                    className="
                      mt-6 inline-flex items-center gap-1.5 text-xs font-bold
                      text-brand-600
                    "
                  >
                    {isZh ? '了解更多' : 'Learn more'}
                    {' '}
                    <ArrowRight className="size-3.5" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#18171f] py-28 text-white">
          <div className="scape-container">
            <div className="
              grid items-center gap-16
              lg:grid-cols-[0.78fr_1.22fr]
            "
            >
              <div>
                <span className="
                  inline-flex items-center gap-2 rounded-full bg-white/8 px-3
                  py-1.5 text-xs font-bold tracking-[0.12em] text-[#c9a5ff]
                  uppercase
                "
                >
                  <Sparkles className="size-3.5" />
                  {isZh ? 'AI 是团队成员，不是黑盒' : 'AI as a teammate, not a black box'}
                </span>
                <h2 className="section-title mt-6 text-balance">
                  {isZh ? '快速探索，仍由你做决定。' : 'Explore quickly. Keep the final call.'}
                </h2>
                <p className="mt-6 text-base/8 text-white/55">
                  {isZh
                    ? '每个 AI 任务都有输入、状态、版本和结果记录。你可以取消、重试、比较，再把确认结果推入设计流程。'
                    : 'Every AI job keeps its input, state, versions and results. Cancel, retry, compare, then move an approved direction into the design flow.'}
                </p>
                <div className="mt-8 space-y-4">
                  {[
                    isZh ? '项目上下文驱动，而不是空白对话框' : 'Project-aware, not another empty chat box',
                    isZh ? '生成任务可追踪、可取消、可重试' : 'Traceable, cancellable and retryable jobs',
                    isZh ? '人工作出关键确认，结果进入正式数据' : 'Human approval before results become project data',
                  ].map(item => (
                    <div
                      key={item}
                      className="
                        flex items-center gap-3 text-sm font-semibold
                        text-white/80
                      "
                    >
                      <span className="
                        grid size-5 place-items-center rounded-full bg-ai/25
                        text-[#c998ff]
                      "
                      >
                        <Check className="size-3" />
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="
                relative rounded-[24px] bg-[#25232e] p-4
                md:p-6
              "
              >
                <div className="
                  grid gap-3
                  md:grid-cols-2
                "
                >
                  <div className="
                    relative min-h-[380px] overflow-hidden rounded-2xl
                    bg-[#d6d0c8]
                  "
                  >
                    <div className="
                      absolute inset-x-0 bottom-0 h-[66%] bg-[#8b9183]
                    "
                    />
                    <div className="
                      absolute right-[8%] bottom-[9%] h-[120px] w-[72%]
                      rounded-t-[64px] bg-[#ece3d4]
                    "
                    />
                    <div className="
                      absolute top-[10%] left-[10%] h-[130px] w-[42%]
                      bg-[#b7ad9e]
                    "
                    />
                    <div className="
                      absolute top-[14%] left-[14%] h-[115px] w-[34%]
                      bg-[#3f423c]
                    "
                    />
                    <span className="
                      absolute top-4 left-4 rounded-full bg-white/85 px-3 py-1.5
                      text-[10px] font-bold text-[#333]
                    "
                    >
                      方案 A · 静谧自然
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="rounded-2xl bg-[#302d3a] p-4">
                      <div className="flex items-center gap-3">
                        <span className="
                          grid size-9 place-items-center rounded-xl bg-ai/20
                          text-[#c998ff]
                        "
                        >
                          <Bot className="size-5" />
                        </span>
                        <span>
                          <span className="block text-xs font-bold">{isZh ? '构境 AI 正在推理' : 'Scape AI is working'}</span>
                          <span className="mt-1 block text-[10px] text-white/45">{isZh ? '读取需求、材质与预算' : 'Reading brief, materials and budget'}</span>
                        </span>
                      </div>
                      <div className="
                        mt-5 h-1.5 overflow-hidden rounded-full bg-white/10
                      "
                      >
                        <div className="h-full w-[68%] rounded-full bg-ai" />
                      </div>
                    </div>
                    <div className="
                      flex-1 rounded-2xl bg-white p-4 text-[#22222c]
                    "
                    >
                      <p className="
                        text-[10px] font-black tracking-[0.13em] text-brand-600
                        uppercase
                      "
                      >
                        {isZh ? '设计依据' : 'Design rationale'}
                      </p>
                      <p className="mt-4 text-sm/6 font-bold">{isZh ? '降低材质对比，以自然光和触感建立空间层次。' : 'Reduce material contrast and use natural light and texture to build hierarchy.'}</p>
                      <div className="mt-5 grid grid-cols-4 gap-2">
                        {['#D8CDBA', '#858B7B', '#423F38', '#EAE4DA'].map(color => (
                          <span
                            key={color}
                            className="aspect-square rounded-lg"
                            style={{ background: color }}
                          />
                        ))}
                      </div>
                      <button className="
                        mt-5 flex w-full items-center justify-center gap-2
                        rounded-xl bg-brand-600 py-3 text-xs font-bold
                        text-white
                      "
                      >
                        <BadgeCheck className="size-4" />
                        {isZh ? '采纳为设计方向' : 'Approve direction'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-28">
          <div className="scape-container">
            <div className="text-center">
              <span className="eyebrow">{isZh ? '从提案到落地' : 'From proposal to delivery'}</span>
              <h2 className="
                section-title mx-auto mt-6 max-w-[820px] text-balance
              "
              >
                {isZh ? '一条清晰的项目链，少一点来回确认。' : 'One clear project chain. Fewer status meetings.'}
              </h2>
            </div>
            <div className="
              mt-16 grid gap-px overflow-hidden rounded-2xl border
              border-[#e7e7ee] bg-[#e7e7ee]
              lg:grid-cols-3
            "
            >
              {([
                [PanelsTopLeft, isZh ? '设计团队' : 'Design team', isZh ? '需求、概念、方案、深化与施工图共享同一份项目上下文。' : 'Brief, concept, design development and documentation share one project context.'],
                [PackageCheck, isZh ? '采购与财务' : 'Procurement & finance', isZh ? 'Schedule 确认后生成报价依据，变更与回款状态可追踪。' : 'Approved schedules flow into proposals, changes and payment tracking.'],
                [MessageSquareText, isZh ? '客户与交付' : 'Client & delivery', isZh ? '客户在专属门户确认、评论与查看进度，重要决定被正式记录。' : 'Clients approve, comment and follow delivery from a focused portal.'],
              ] as const).map(([Icon, title, text], index) => (
                <article key={String(title)} className="bg-white p-7">
                  <span className="text-xs font-black text-brand-500">
                    0
                    {index + 1}
                  </span>
                  <Icon className="mt-8 size-7 text-[#30303b]" />
                  <h3 className="mt-5 text-xl font-bold tracking-[-0.035em]">{String(title)}</h3>
                  <p className="mt-4 text-sm/7 text-[#747481]">{String(text)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-brand-50 py-24">
          <div className="
            scape-container grid items-center gap-14
            lg:grid-cols-[1fr_0.9fr]
          "
          >
            <div>
              <span className="eyebrow bg-white">
                <ShieldCheck className="size-3.5" />
                {isZh ? '你的数据，你的服务器' : 'Your data. Your server.'}
              </span>
              <h2 className="section-title mt-6 text-balance">
                {isZh ? '为私有部署准备，而不是锁在平台里。' : 'Built for private deployment, not platform lock-in.'}
              </h2>
              <p className="mt-6 max-w-[650px] text-base/8 text-[#6f6f7c]">
                {isZh
                  ? '应用、认证、PostgreSQL 与对象存储都可以运行在你的基础设施上。清晰的组织隔离、角色权限和审计日志保护每一份项目资产。'
                  : 'Run the app, authentication, PostgreSQL and object storage on your infrastructure with organization isolation, RBAC and audit trails.'}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {([
                [ShieldCheck, isZh ? '组织级数据隔离' : 'Org data isolation'],
                [UsersRound, isZh ? '精细角色权限' : 'Granular roles'],
                [Files, isZh ? '私有对象存储' : 'Private storage'],
                [Clock3, isZh ? '完整审计记录' : 'Audit trails'],
              ] as const).map(([Icon, label]) => (
                <div
                  key={String(label)}
                  className="rounded-2xl border border-brand-100 bg-white p-5"
                >
                  <Icon className="size-5 text-brand-600" />
                  <p className="mt-8 text-sm font-bold">{String(label)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-28">
          <div className="scape-container">
            <div className="
              relative overflow-hidden rounded-[28px] bg-brand-600 px-6 py-16
              text-center text-white
              md:px-12 md:py-20
            "
            >
              <div className="
                absolute -top-20 -left-20 size-64 rounded-full border-44
                border-white/8
              "
              />
              <div className="
                absolute -right-8 -bottom-24 size-72 rounded-full border-50
                border-white/8
              "
              />
              <div className="relative">
                <span className="
                  inline-flex items-center gap-2 rounded-full bg-white/12 px-3
                  py-1.5 text-xs font-bold
                "
                >
                  <Sparkles className="size-3.5" />
                  {isZh ? '开始你的下一次跃迁' : 'Make your next leap'}
                </span>
                <h2 className="
                  section-title mx-auto mt-6 max-w-[800px] text-balance
                "
                >
                  {isZh ? '让团队把时间留给设计，而不是找信息。' : 'Give your team more time to design, not chase information.'}
                </h2>
                <p className="
                  mx-auto mt-5 max-w-[620px] text-sm/7 text-white/70
                  md:text-base
                "
                >
                  {isZh ? '从一个真实项目开始，体验从需求到交付的完整工作流。' : 'Start with one real project and experience the complete workflow from brief to delivery.'}
                </p>
                <div className="
                  mt-8 flex flex-col justify-center gap-3
                  sm:flex-row
                "
                >
                  <Link
                    href={path(locale, '/sign-up')}
                    className="
                      flat-button bg-white px-6 py-3.5 text-brand-700
                      hover:bg-brand-50
                    "
                  >
                    {isZh ? '免费开始使用' : 'Start free'}
                    <ArrowRight className="size-4" />
                  </Link>
                  <Link
                    href={path(locale, '/contact')}
                    className="
                      flat-button border border-white/25 bg-white/8 px-6 py-3.5
                      text-white
                      hover:bg-white/14
                    "
                  >
                    {isZh ? '预约产品演示' : 'Book a demo'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#ececf2] bg-[#fafafd] py-14">
        <div className="scape-container">
          <div className="
            grid gap-10
            md:grid-cols-[1.5fr_1fr_1fr_1fr]
          "
          >
            <div>
              <BrandMark href={path(locale, '/')} />
              <p className="mt-4 max-w-[290px] text-sm/7 text-[#777784]">
                {isZh ? '面向室内设计团队的 AI Studio OS，让灵感成为可交付的成果。' : 'The AI Studio OS that turns interior design ideas into delivered work.'}
              </p>
            </div>
            {([
              [isZh ? '产品' : 'Product', [[isZh ? '功能' : 'Features', '/product'], [isZh ? '价格' : 'Pricing', '/pricing'], [isZh ? '安全' : 'Security', '/security']]],
              [isZh ? '资源' : 'Resources', [[isZh ? '博客' : 'Blog', '/resources/blog'], [isZh ? '指南' : 'Guides', '/resources/guides'], [isZh ? '模板' : 'Templates', '/resources/templates']]],
              [isZh ? '公司' : 'Company', [[isZh ? '关于' : 'About', '/about'], [isZh ? '联系' : 'Contact', '/contact'], [isZh ? '文档' : 'Docs', '/docs']]],
            ] as const).map(([title, links]) => (
              <div key={String(title)}>
                <p className="text-xs font-black tracking-widest uppercase">{String(title)}</p>
                <div className="mt-4 space-y-3">
                  {links.map(([label, href]) => (
                    <Link
                      key={href}
                      href={path(locale, href)}
                      className="
                        block text-sm text-[#777784]
                        hover:text-brand-600
                      "
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="
            mt-12 flex flex-col gap-3 border-t border-[#e7e7ee] pt-6 text-xs
            text-[#92929e]
            sm:flex-row sm:items-center
          "
          >
            <p>© 2026 ScapeLeap. All rights reserved.</p>
            <p className="sm:ml-auto">{isZh ? '私有部署 · 自有数据 · 全球团队' : 'Private deployment · Your data · Global teams'}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
