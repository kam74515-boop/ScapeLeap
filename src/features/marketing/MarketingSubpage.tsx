import type { MarketingLocale } from './content';
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  CircleDollarSign,
  FileText,
  FolderKanban,
  Globe2,
  LockKeyhole,
  MessageSquareText,
  PackageCheck,
  Server,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from 'lucide-react';
import Link from 'next/link';
import { BrandMark } from '@/components/BrandMark';

const pageContent = {
  product: {
    zh: ['产品全景', '从第一条客户需求，到最后一次现场交付。', 'ScapeLeap 将设计工作室的专业流程组织成一条清晰、可追踪、可协作的项目链。'],
    en: ['Product', 'From the first client brief to the final site handover.', 'ScapeLeap turns the professional studio workflow into one clear, traceable and collaborative project chain.'],
  },
  pricing: {
    zh: ['价格方案', '随工作室一起成长，按真实需求选择。', '先从完整体验开始，再根据成员、项目规模和权限需求升级。私有部署方案单独配置。'],
    en: ['Pricing', 'Start focused. Scale with your studio.', 'Begin with full access, then choose a plan based on seats, project scale and permission needs. Private deployments are configured separately.'],
  },
  security: {
    zh: ['安全与数据', '设计资产值得被认真保护。', '自托管应用、数据库与对象存储，配合组织隔离、角色权限、审计和备份策略。'],
    en: ['Security', 'Design assets deserve serious protection.', 'Self-host the app, database and object storage with organization isolation, role controls, audit trails and backups.'],
  },
  about: {
    zh: ['关于 ScapeLeap', '让创意团队拥有真正适合自己的系统。', '我们相信 AI 应该放大专业判断，而不是绕过它；软件应该连接创作与交付，而不是制造更多表格。'],
    en: ['About ScapeLeap', 'A system that genuinely fits creative teams.', 'AI should amplify professional judgment, not bypass it. Software should connect creation to delivery, not produce more spreadsheets.'],
  },
  contact: {
    zh: ['联系团队', '聊聊你的工作室和真实流程。', '无论你在评估私有部署、团队迁移还是定制集成，我们都会从业务流程出发。'],
    en: ['Contact', 'Tell us how your studio really works.', 'Whether you are evaluating private deployment, migration or custom integrations, we start with your operating workflow.'],
  },
  docs: {
    zh: ['产品文档', '从工作空间设置到完整项目交付。', '面向管理员、设计师、采购、财务与客户协作的操作指南。'],
    en: ['Documentation', 'From workspace setup to complete project delivery.', 'Guides for admins, designers, procurement, finance and client collaboration.'],
  },
  resources: {
    zh: ['资源中心', '更好地管理设计工作室。', '项目模板、FF&E 指南、商业实践与 AI 设计工作流。'],
    en: ['Resources', 'Run a better design studio.', 'Project templates, FF&E guides, commercial practices and AI design workflows.'],
  },
} as const;

function href(locale: MarketingLocale, path: string) {
  return locale === 'en' ? `/en${path}` : path;
}

function MarketingHeader({ locale }: { locale: MarketingLocale }) {
  return (
    <header className="border-b border-border bg-white">
      <div className="scape-container flex h-[68px] items-center">
        <BrandMark href={href(locale, '/')} />
        <nav className="
          ml-10 hidden gap-7
          md:flex
        "
        >
          {([
            [locale === 'zh' ? '产品' : 'Product', '/product'],
            [locale === 'zh' ? '解决方案' : 'Solutions', '/solutions/studios'],
            [locale === 'zh' ? '价格' : 'Pricing', '/pricing'],
            [locale === 'zh' ? '资源' : 'Resources', '/resources'],
          ] as const).map(([label, path]) => (
            <Link
              key={path}
              href={href(locale, path)}
              className="
                text-sm font-semibold text-muted-foreground
                hover:text-brand-600
              "
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link
          href={href(locale, '/sign-in')}
          className="ml-auto text-sm font-semibold"
        >
          {locale === 'zh' ? '登录' : 'Sign in'}
        </Link>
        <Link
          href={href(locale, '/sign-up')}
          className="flat-button-primary ml-4 h-10"
        >
          {locale === 'zh' ? '开始使用' : 'Get started'}
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </header>
  );
}

function Pricing({ locale }: { locale: MarketingLocale }) {
  const zh = locale === 'zh';
  const plans = [
    { name: 'Free', price: '¥0', desc: zh ? '个人与小型工作室起步' : 'For individuals and small studios', features: zh ? ['1 个工作空间', '2 位成员', '3 个活跃项目', '基础项目与客户管理'] : ['1 workspace', '2 members', '3 active projects', 'Core project and CRM'], featured: false },
    { name: 'Studio', price: '¥299', desc: zh ? '成长中的专业设计团队' : 'For growing professional teams', features: zh ? ['10 位成员', '无限活跃项目', 'AI Studio 与 Schedule', '客户门户与报价'] : ['10 members', 'Unlimited projects', 'AI Studio and Schedule', 'Client portal and proposals'], featured: true },
    { name: 'Business', price: '¥899', desc: zh ? '多团队与复杂权限管理' : 'For multi-team operations', features: zh ? ['30 位成员', '高级 RBAC 与审计', '自定义项目模板', 'API 与优先支持'] : ['30 members', 'Advanced RBAC and audit', 'Custom project templates', 'API and priority support'], featured: false },
  ];
  return (
    <div className="
      mt-14 grid gap-4
      lg:grid-cols-3
    "
    >
      {plans.map(plan => (
        <article
          key={plan.name}
          className={`
            rounded-2xl border p-6
            ${plan.featured
          ? `border-brand-400 bg-[#191820] text-white ring-4 ring-brand-100`
          : `border-border bg-white`}
          `}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">{plan.name}</h2>
            {plan.featured && (
              <span className="
                rounded-full bg-brand-500 px-2.5 py-1 text-[9px] font-bold
              "
              >
                {zh ? '最受欢迎' : 'Popular'}
              </span>
            )}
          </div>
          <p className={`
            mt-3 text-xs
            ${plan.featured
          ? 'text-white/50'
          : `text-muted-foreground`}
          `}
          >
            {plan.desc}
          </p>
          <p className="mt-8 text-4xl font-bold tracking-[-0.055em]">
            {plan.price}
            <span className={`
              ml-1 text-xs font-medium
              ${plan.featured
          ? `text-white/40`
          : `text-muted-foreground`}
            `}
            >
              /
              {zh ? '月' : 'mo'}
            </span>
          </p>
          <Link
            href={href(locale, '/sign-up')}
            className={`
              flat-button mt-7 w-full
              ${plan.featured
          ? `
            bg-white text-[#222]
            hover:bg-brand-50
          `
          : `
            bg-brand-600 text-white
            hover:bg-brand-700
          `}
            `}
          >
            {zh ? '开始使用' : 'Get started'}
          </Link>
          <div className="mt-7 space-y-3">
            {plan.features.map(feature => (
              <div
                key={feature}
                className={`
                  flex items-center gap-2 text-xs
                  ${plan.featured
                ? `text-white/70`
                : `text-[#5f5f6b]`}
                `}
              >
                <CheckCircle />
                {feature}
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

function CheckCircle() {
  return (
    <span className="
      grid size-5 shrink-0 place-items-center rounded-full bg-emerald-50
      text-emerald-700
    "
    >
      <BadgeCheck className="size-3.5" />
    </span>
  );
}

export function MarketingSubpage({ locale, slug }: { locale: MarketingLocale; slug: keyof typeof pageContent }) {
  const content = pageContent[slug][locale];
  const zh = locale === 'zh';
  const features = [
    [FolderKanban, zh ? '项目与七阶段设计' : 'Projects & seven-stage design', zh ? '从需求、勘测、概念到施工图和复盘。' : 'From brief and survey to documentation and review.'],
    [Bot, zh ? 'AI Studio' : 'AI Studio', zh ? '带项目上下文、状态与人工确认的生成工作流。' : 'Context-aware generation with states and human approval.'],
    [PackageCheck, 'FF&E Schedule', zh ? '产品、供应商、预算、交期与变更保持同步。' : 'Products, vendors, budget, lead times and changes in sync.'],
    [CircleDollarSign, zh ? '报价与收款' : 'Proposals & payments', zh ? '商业文件直接关联客户、项目和交付。' : 'Commercial documents linked to clients and delivery.'],
    [UsersRound, zh ? '多租户与团队权限' : 'Multi-tenant teams', zh ? '组织、团队、项目成员与岗位 RBAC。' : 'Organizations, teams, project members and RBAC.'],
    [MessageSquareText, zh ? '客户门户' : 'Client portal', zh ? '方案确认、评论与进度共享的专属入口。' : 'A focused place for approvals, comments and progress.'],
  ] as const;

  return (
    <div className="min-h-screen bg-white">
      <MarketingHeader locale={locale} />
      <main>
        <section className="border-b border-border bg-[#fafafd] py-24">
          <div className="scape-container text-center">
            <span className="eyebrow">
              <Sparkles className="size-3.5" />
              {content[0]}
            </span>
            <h1 className="
              section-title mx-auto mt-7 max-w-[900px] text-balance
            "
            >
              {content[1]}
            </h1>
            <p className="
              mx-auto mt-6 max-w-[680px] text-base/8 text-balance
              text-muted-foreground
            "
            >
              {content[2]}
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <Link
                href={href(locale, '/sign-up')}
                className="flat-button-primary"
              >
                {zh ? '免费开始' : 'Start free'}
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href={href(locale, '/contact')}
                className="flat-button-secondary"
              >
                {zh ? '预约演示' : 'Book a demo'}
              </Link>
            </div>
          </div>
        </section>

        {slug === 'pricing'
          ? <section className="py-20"><div className="scape-container"><Pricing locale={locale} /></div></section>
          : slug === 'security'
            ? (
                <section className="py-20">
                  <div className="
                    scape-container grid gap-4
                    md:grid-cols-2
                  "
                  >
                    {([
                      [Server, zh ? '自有基础设施' : 'Your infrastructure', zh ? '应用、PostgreSQL 与对象存储运行在你的服务器。' : 'Run the app, PostgreSQL and object storage on your servers.'],
                      [LockKeyhole, zh ? '组织隔离' : 'Organization isolation', zh ? '所有业务表以组织为数据访问边界。' : 'Every business table is scoped to an organization.'],
                      [ShieldCheck, zh ? '角色权限' : 'Role-based access', zh ? '岗位级 RBAC 覆盖项目、财务、文件和 AI。' : 'Studio RBAC covers projects, finance, files and AI.'],
                      [FileText, zh ? '审计与备份' : 'Audit & backup', zh ? '关键行为可追踪，支持数据库和对象存储备份。' : 'Trace key actions and back up databases and objects.'],
                    ] as const).map(([Icon, title, text]) => (
                      <article
                        key={String(title)}
                        className="flat-card p-7"
                      >
                        <span className="
                          grid size-11 place-items-center rounded-xl
                          bg-brand-100 text-brand-700
                        "
                        >
                          <Icon className="size-5" />
                        </span>
                        <h2 className="mt-6 text-lg font-bold">
                          {String(title)}
                        </h2>
                        <p className="mt-3 text-sm/7 text-muted-foreground">{String(text)}</p>
                      </article>
                    ))}
                  </div>
                </section>
              )
            : (
                <section className="py-20">
                  <div className="
                    scape-container grid gap-4
                    md:grid-cols-2
                    lg:grid-cols-3
                  "
                  >
                    {features.map(([Icon, title, text]) => (
                      <article
                        key={title}
                        className="flat-card p-6"
                      >
                        <span className="
                          grid size-11 place-items-center rounded-xl
                          bg-brand-100 text-brand-700
                        "
                        >
                          <Icon className="size-5" />
                        </span>
                        <h2 className="mt-6 text-lg font-bold">
                          {title}
                        </h2>
                        <p className="mt-3 text-sm/7 text-muted-foreground">{text}</p>
                      </article>
                    ))}
                  </div>
                </section>
              )}

        <section className="py-20">
          <div className="
            scape-container rounded-[26px] bg-brand-600 px-6 py-14 text-center
            text-white
          "
          >
            <Globe2 className="mx-auto size-7" />
            <h2 className="mt-5 text-3xl font-bold tracking-[-0.045em]">
              {zh ? '准备好让流程变得更清晰了吗？' : 'Ready for a clearer studio workflow?'}
            </h2>
            <Link
              href={href(locale, '/sign-up')}
              className="
                flat-button mt-7 bg-white text-brand-700
                hover:bg-brand-50
              "
            >
              {zh ? '开始使用 ScapeLeap' : 'Start with ScapeLeap'}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
