import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Box,
  CalendarDays,
  Check,
  ChevronRight,
  CircleDollarSign,
  Download,
  File,
  FileImage,
  FileText,
  Filter,
  Folder,
  FolderKanban,
  Gauge,
  Grid2X2,
  Heart,
  Image,
  Layers3,
  LayoutList,
  Link2,
  Mail,
  MoreHorizontal,
  MoveUpRight,
  Palette,
  Paperclip,
  Plus,
  Search,
  Send,
  Settings2,
  Share2,
  Sparkles,
  Upload,
  UserPlus,
  UsersRound,
  WandSparkles,
} from 'lucide-react';
import Link from 'next/link';
import { demoCustomers, demoProjects, financeRows, scheduleItems, teamMembers } from './data';

function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="
      flex flex-col gap-4
      sm:flex-row sm:items-end sm:justify-between
    "
    >
      <div>
        {eyebrow && (
          <p className="
            mb-2 text-[10px] font-black tracking-[0.13em] text-brand-600
            uppercase
          "
          >
            {eyebrow}
          </p>
        )}
        <h1 className="
          text-2xl font-bold tracking-[-0.045em]
          md:text-[30px]
        "
        >
          {title}
        </h1>
        {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  );
}

function StatusPill({ children }: { children: React.ReactNode }) {
  const text = String(children);
  const tone = text.includes('逾期')
    ? 'bg-red-50 text-red-700'
    : text.includes('收款') || text.includes('完成') || text.includes('到货') || text.includes('确认')
      ? 'bg-emerald-50 text-emerald-700'
      : text.includes('变更') || text.includes('部分')
        ? 'bg-amber-50 text-amber-700'
        : 'bg-brand-50 text-brand-700';
  return (
    <span className={`
      inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold
      ${tone}
    `}
    >
      {children}
    </span>
  );
}

function ProjectVisual({ tone, accent, compact = false }: { tone: string; accent: string; compact?: boolean }) {
  return (
    <div
      className={`
        relative overflow-hidden
        ${compact ? 'h-28' : 'h-44'}
      `}
      style={{ background: accent }}
    >
      <div className="absolute inset-x-0 bottom-0 h-[58%]" style={{ background: tone }} />
      <div className="absolute top-[14%] left-[9%] h-[46%] w-[36%] bg-white/45" />
      <div className="absolute top-[18%] left-[13%] h-[38%] w-[28%]" style={{ background: `${tone}bb` }} />
      <div className="
        absolute right-[8%] bottom-[12%] h-[34%] w-[56%] rounded-t-[48px]
        bg-white/65
      "
      />
      <div className="
        absolute right-[15%] bottom-[17%] h-[19%] w-[9%] rounded-full
        bg-[#d9b776]
      "
      />
      <div className="
        absolute bottom-[5%] left-[8%] h-[5%] w-[84%] bg-black/15 blur-sm
      "
      />
    </div>
  );
}

function DashboardView({ locale, root }: { locale: string; root: string }) {
  const zh = locale === 'zh';
  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow={zh ? '2026 年 7 月 29 日 · 星期三' : 'Wednesday · July 29, 2026'}
        title={zh ? '早上好，林予安' : 'Good morning, Yuaan'}
        description={zh ? '这里是工作室今天需要关注的项目进展。' : 'Here is what needs your attention across the studio today.'}
        action={(
          <button className="flat-button-secondary">
            <CalendarDays className="size-4" />
            {zh ? '本周视图' : 'This week'}
          </button>
        )}
      />

      <div className="
        grid gap-3
        sm:grid-cols-2
        xl:grid-cols-4
      "
      >
        {([
          [zh ? '进行中项目' : 'Active projects', '12', '+2', FolderKanban, 'bg-brand-100 text-brand-700'],
          [zh ? '待确认事项' : 'Pending approvals', '8', '-3', BadgeCheck, 'bg-[#fff0cf] text-[#986813]'],
          [zh ? '本月应收' : 'Receivable', '¥ 47.6万', '+18%', CircleDollarSign, 'bg-[#d9f8ed] text-[#147b5b]'],
          [zh ? '团队负载' : 'Team capacity', '76%', '+4%', Gauge, 'bg-[#f1ddff] text-[#8631bd]'],
        ] as const).map(([label, value, delta, Icon, tone]) => (
          <div key={String(label)} className="flat-card p-5">
            <div className="flex items-start justify-between">
              <span className={`
                grid size-10 place-items-center rounded-xl
                ${tone}
              `}
              >
                <Icon className="size-5" />
              </span>
              <span className={`
                flex items-center gap-1 text-[10px] font-bold
                ${String(delta).startsWith('-')
            ? `text-emerald-600`
            : `text-brand-600`}
              `}
              >
                {String(delta).startsWith('-')
                  ? (
                      <ArrowDownRight className="size-3" />
                    )
                  : (
                      <ArrowUpRight className="size-3" />
                    )}
                {String(delta)}
              </span>
            </div>
            <p className="mt-6 text-2xl font-bold tracking-[-0.045em]">{String(value)}</p>
            <p className="mt-1 text-xs text-muted-foreground">{String(label)}</p>
          </div>
        ))}
      </div>

      <div className="
        grid gap-5
        xl:grid-cols-[1.35fr_0.65fr]
      "
      >
        <section className="flat-card overflow-hidden">
          <div className="flex items-center justify-between p-5">
            <div>
              <h2 className="text-base font-bold">{zh ? '项目进度' : 'Project progress'}</h2>
              <p className="mt-1 text-xs text-muted-foreground">{zh ? '优先显示近期里程碑' : 'Prioritized by upcoming milestones'}</p>
            </div>
            <Link
              href={`${root}/projects`}
              className="text-xs font-bold text-brand-600"
            >
              {zh ? '查看全部' : 'View all'}
            </Link>
          </div>
          <div className="divide-y divide-border border-t border-border">
            {demoProjects.slice(0, 4).map(project => (
              <Link
                key={project.id}
                href={`${root}/projects/${project.id}/overview`}
                className="
                  grid items-center gap-4 p-4 transition
                  hover:bg-[#fafafd]
                  sm:grid-cols-[1.3fr_0.65fr_0.7fr_auto]
                "
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="w-16 shrink-0 overflow-hidden rounded-xl"><ProjectVisual tone={project.tone} accent={project.accent} compact /></div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold">{project.name}</p>
                    <p className="mt-1 text-[10px] text-muted-foreground">
                      {project.code}
                      {' '}
                      ·
                      {' '}
                      {project.client}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">{zh ? '当前阶段' : 'Stage'}</p>
                  <p className="mt-1 text-xs font-semibold">{project.stage}</p>
                </div>
                <div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-muted-foreground">{zh ? '进度' : 'Progress'}</span>
                    <span className="font-bold">
                      {project.progress}
                      %
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-[#ededf2]">
                    <div
                      className="h-full rounded-full bg-brand-500"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
                <ChevronRight className="size-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </section>

        <section className="flat-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold">{zh ? '今天' : 'Today'}</h2>
              <p className="mt-1 text-xs text-muted-foreground">{zh ? '6 项待办 · 2 项确认' : '6 tasks · 2 approvals'}</p>
            </div>
            <button className="
              grid size-8 place-items-center rounded-lg bg-brand-50
              text-brand-600
            "
            >
              <Plus className="size-4" />
            </button>
          </div>
          <div className="mt-5 space-y-3">
            {[
              ['09:30', '北外滩会所 · 方案评审', '陈一川、许知遥', 'bg-brand-500'],
              ['11:00', '青山湖住宅 · 材质确认', '客户线上会议', 'bg-sun'],
              ['14:30', '森屿办公 · 现场巡检', '韩卓', 'bg-mint'],
              ['17:00', '工作室周进度同步', '全体成员', 'bg-coral'],
            ].map(([time, title, meta, tone]) => (
              <div key={time} className="flex gap-3">
                <span className="
                  w-10 pt-0.5 text-[10px] font-bold text-muted-foreground
                "
                >
                  {time}
                </span>
                <span className={`
                  mt-1 size-2 shrink-0 rounded-full
                  ${tone}
                `}
                />
                <span className="min-w-0">
                  <span className="block truncate text-xs font-bold">{title}</span>
                  <span className="mt-1 block text-[10px] text-muted-foreground">{meta}</span>
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-xl bg-[#191820] p-4 text-white">
            <div className="flex items-center gap-3">
              <span className="
                grid size-9 place-items-center rounded-xl bg-ai/20
                text-[#c998ff]
              "
              >
                <Sparkles className="size-4" />
              </span>
              <div>
                <p className="text-xs font-bold">{zh ? 'AI 每日简报' : 'AI daily brief'}</p>
                <p className="mt-1 text-[10px] text-white/45">{zh ? '2 分钟了解关键变化' : 'Catch up in two minutes'}</p>
              </div>
              <button className="
                ml-auto grid size-8 place-items-center rounded-lg bg-white/10
              "
              >
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </section>
      </div>

      <div className="
        grid gap-5
        lg:grid-cols-3
      "
      >
        <section className="
          flat-card p-5
          lg:col-span-2
        "
        >
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold">{zh ? '待你确认' : 'Needs your approval'}</h2>
            <span className="
              rounded-full bg-coral px-2 py-1 text-[9px] font-bold text-white
            "
            >
              5
            </span>
          </div>
          <div className="
            mt-4 grid gap-3
            sm:grid-cols-2
          "
          >
            {([
              ['青山湖住宅', '客厅概念方案 v3', '林予安 · 12 分钟前', Palette, 'bg-[#e5e2ff] text-brand-700'],
              ['松庭别墅', '灯具变更单 CO-009', '顾宁 · 1 小时前', FileText, 'bg-[#fff0cf] text-[#93640f]'],
            ] as const).map(([project, title, meta, Icon, tone]) => (
              <div
                key={String(title)}
                className="rounded-xl border border-border p-4"
              >
                <div className="flex items-start gap-3">
                  <span className={`
                    grid size-9 place-items-center rounded-xl
                    ${tone}
                  `}
                  >
                    <Icon className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-brand-600">{String(project)}</p>
                    <p className="mt-1 truncate text-xs font-bold">{String(title)}</p>
                    <p className="mt-2 text-[10px] text-muted-foreground">{String(meta)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="flat-card p-5">
          <h2 className="text-base font-bold">{zh ? '团队在线' : 'Team online'}</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {teamMembers.map(member => (
              <span
                key={member.name}
                title={member.name}
                className={`
                  relative grid size-10 place-items-center rounded-xl text-xs
                  font-black
                  ${member.color}
                `}
              >
                {member.initials}
                <span className="
                  absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full border-2
                  border-white bg-mint
                "
                />
              </span>
            ))}
          </div>
          <p className="mt-4 text-[10px] text-muted-foreground">{zh ? '6 人在线 · 3 人正在现场' : '6 online · 3 on site'}</p>
        </section>
      </div>
    </div>
  );
}

function ProjectsView({ locale, root }: { locale: string; root: string }) {
  const zh = locale === 'zh';
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={zh ? '项目中心' : 'Projects'}
        title={zh ? '所有项目' : 'All projects'}
        description={zh ? '从线索到交付，保持每个项目的上下文完整。' : 'Keep full context from lead to delivery.'}
        action={(
          <button className="flat-button-primary">
            <Plus className="size-4" />
            {zh ? '新建项目' : 'New project'}
          </button>
        )}
      />
      <div className="flat-card flex flex-wrap items-center gap-2 p-3">
        <button className="
          rounded-lg bg-[#191820] px-3 py-2 text-xs font-bold text-white
        "
        >
          {zh ? '全部 12' : 'All 12'}
        </button>
        {[(zh ? '设计中 5' : 'Design 5'), (zh ? '采购中 3' : 'Procurement 3'), (zh ? '施工中 2' : 'Construction 2'), (zh ? '已完成 2' : 'Done 2')].map(item => (
          <button
            key={item}
            className="
              rounded-lg px-3 py-2 text-xs font-semibold text-muted-foreground
              hover:bg-secondary
            "
          >
            {item}
          </button>
        ))}
        <button className="
          ml-auto grid size-9 place-items-center rounded-lg border border-border
        "
        >
          <Filter className="size-4" />
        </button>
        <button className="
          grid size-9 place-items-center rounded-lg bg-secondary
        "
        >
          <Grid2X2 className="size-4" />
        </button>
        <button className="
          grid size-9 place-items-center rounded-lg border border-border
        "
        >
          <LayoutList className="size-4" />
        </button>
      </div>
      <div className="
        grid gap-4
        sm:grid-cols-2
        xl:grid-cols-3
        2xl:grid-cols-4
      "
      >
        {demoProjects.concat(demoProjects.slice(0, 2).map((project, index) => ({ ...project, id: `${project.id}-copy`, code: `SL-2600${9 - index}`, name: index ? '南山 · 轻食实验室' : '云门 · 品牌展厅', progress: index ? 34 : 92 }))).map(project => (
          <Link
            key={project.id}
            href={`${root}/projects/${project.id}/overview`}
            className="
              group flat-card overflow-hidden transition duration-300
              hover:-translate-y-1 hover:border-brand-200
            "
          >
            <ProjectVisual tone={project.tone} accent={project.accent} />
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-brand-600">{project.code}</p>
                  <h2 className="mt-1 truncate text-sm font-bold">{project.name}</h2>
                </div>
                <button className="
                  grid size-7 shrink-0 place-items-center rounded-lg
                  hover:bg-secondary
                "
                >
                  <MoreHorizontal className="size-4" />
                </button>
              </div>
              <div className="
                mt-4 flex items-center justify-between text-[10px]
                text-muted-foreground
              "
              >
                <span>{project.stage}</span>
                <span className="font-bold text-foreground">
                  {project.progress}
                  %
                </span>
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-[#ededf2]">
                <div
                  className="h-full rounded-full bg-brand-500"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
              <div className="
                mt-4 flex items-center justify-between border-t border-border
                pt-3 text-[10px] text-muted-foreground
              "
              >
                <span>{project.client}</span>
                <span>{project.due}</span>
              </div>
            </div>
          </Link>
        ))}
        <button className="
          min-h-[280px] rounded-2xl border border-dashed border-[#d7d7e1]
          bg-white text-muted-foreground transition
          hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700
        "
        >
          <span className="
            mx-auto grid size-11 place-items-center rounded-xl bg-secondary
          "
          >
            <Plus className="size-5" />
          </span>
          <span className="mt-4 block text-xs font-bold">{zh ? '新建项目' : 'Create project'}</span>
        </button>
      </div>
    </div>
  );
}

function CustomersView({ locale }: { locale: string }) {
  const zh = locale === 'zh';
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={zh ? '客户关系' : 'CRM'}
        title={zh ? '客户与线索' : 'Customers & leads'}
        description={zh ? '集中管理客户、联系人、沟通与项目价值。' : 'Manage contacts, conversations and project value.'}
        action={(
          <button className="flat-button-primary">
            <UserPlus className="size-4" />
            {zh ? '添加客户' : 'Add customer'}
          </button>
        )}
      />
      <div className="
        grid gap-3
        sm:grid-cols-3
      "
      >
        {[
          [zh ? '活跃客户' : 'Active clients', '28', '+4'],
          [zh ? '本月新线索' : 'New leads', '12', '+18%'],
          [zh ? '管线价值' : 'Pipeline value', '¥ 1,286万', '+9%'],
        ].map(([label, value, delta]) => (
          <div key={label} className="flat-card p-5">
            <p className="text-xs text-muted-foreground">{label}</p>
            <div className="mt-4 flex items-end justify-between">
              <p className="text-2xl font-bold tracking-[-0.04em]">{value}</p>
              <span className="text-[10px] font-bold text-emerald-600">
                {delta}
              </span>
            </div>
          </div>
        ))}
      </div>
      <section className="flat-card overflow-hidden">
        <div className="flex flex-wrap items-center gap-3 p-4">
          <div className="
            flex h-10 min-w-[220px] flex-1 items-center gap-2 rounded-xl
            bg-secondary px-3
          "
          >
            <Search className="size-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{zh ? '搜索姓名、公司或联系方式' : 'Search name, company or contact'}</span>
          </div>
          <button className="flat-button-secondary h-10">
            <Filter className="size-4" />
            {zh ? '筛选' : 'Filter'}
          </button>
        </div>
        <div className="overflow-x-auto border-t border-border">
          <table className="w-full min-w-[800px] text-left">
            <thead className="
              bg-[#fafafd] text-[10px] font-bold tracking-[0.08em]
              text-muted-foreground uppercase
            "
            >
              <tr>
                {['客户', '项目', '合作价值', '负责人', '状态', '最近联系', ''].map(item => (
                  <th
                    key={item}
                    className="px-5 py-3"
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {demoCustomers.map(customer => (
                <tr key={customer.name} className="hover:bg-[#fafafd]">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className={`
                        grid size-9 place-items-center rounded-xl text-xs
                        font-black
                        ${customer.tone}
                      `}
                      >
                        {customer.name.slice(0, 1)}
                      </span>
                      <span>
                        <span className="block text-xs font-bold">{customer.name}</span>
                        <span className="
                          mt-1 block text-[10px] text-muted-foreground
                        "
                        >
                          {customer.company}
                        </span>
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-xs font-semibold">{customer.projects}</td>
                  <td className="px-5 py-4 text-xs font-semibold">{customer.value}</td>
                  <td className="px-5 py-4 text-xs">{customer.owner}</td>
                  <td className="px-5 py-4"><StatusPill>{customer.status}</StatusPill></td>
                  <td className="px-5 py-4 text-[10px] text-muted-foreground">{customer.last}</td>
                  <td className="px-5 py-4">
                    <MoreHorizontal className="size-4 text-muted-foreground" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function AiStudioView({ locale }: { locale: string }) {
  const zh = locale === 'zh';
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="AI Studio"
        title={zh ? '构境 AI 创作中心' : 'Scape AI creation center'}
        description={zh ? '从项目上下文出发，生成可继续推进的设计成果。' : 'Create design outputs grounded in real project context.'}
        action={(
          <button className="flat-button-primary">
            <WandSparkles className="size-4" />
            {zh ? '新建生成任务' : 'New generation'}
          </button>
        )}
      />
      <section className="
        relative overflow-hidden rounded-[22px] bg-[#191820] p-6 text-white
        md:p-8
      "
      >
        <div className="
          absolute -top-20 right-0 size-72 rounded-full bg-ai/20 blur-[80px]
        "
        />
        <div className="
          relative grid items-center gap-8
          lg:grid-cols-[0.8fr_1.2fr]
        "
        >
          <div>
            <span className="
              inline-flex rounded-full bg-white/8 px-3 py-1.5 text-[10px]
              font-bold text-[#cf9dff]
            "
            >
              {zh ? '今日推荐工作流' : 'Recommended workflow'}
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tighter">{zh ? '从客户需求生成概念方向' : 'Turn a client brief into concept directions'}</h2>
            <p className="mt-4 text-sm/7 text-white/50">{zh ? '读取项目需求、空间信息与预算，生成 3 组带设计依据的视觉方向。' : 'Read the project brief, space and budget to create three visual directions with rationale.'}</p>
            <button className="
              flat-button mt-6 bg-white text-[#22222b]
              hover:bg-brand-50
            "
            >
              <Sparkles className="size-4 text-ai" />
              {zh ? '开始这个工作流' : 'Start workflow'}
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {([
              ['#837a6d', '#d8ccba'],
              ['#6f7770', '#d6ded8'],
              ['#594f49', '#d9cabb'],
            ] as const).map(([tone, accent], index) => (
              <div
                key={tone}
                className={`
                  overflow-hidden rounded-2xl bg-white/7 p-2
                  ${index === 1
                ? `-translate-y-3`
                : ''}
                `}
              >
                <ProjectVisual tone={tone} accent={accent} compact />
                <div className="p-2">
                  <p className="text-[10px] font-bold">{zh ? `概念方向 ${String.fromCharCode(65 + index)}` : `Direction ${String.fromCharCode(65 + index)}`}</p>
                  <div className="mt-2 flex gap-1">
                    {[tone, accent, '#eee7dc'].map(color => (
                      <span
                        key={color}
                        className="size-3 rounded-full"
                        style={{ background: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="
        grid gap-4
        md:grid-cols-2
        xl:grid-cols-4
      "
      >
        {([
          [Image, zh ? '情绪板生成' : 'Moodboard', zh ? '参考图 → 概念情绪板' : 'References → concept board', 'bg-[#eee4ff] text-[#8636ba]'],
          [Palette, zh ? '材质变体' : 'Material variations', zh ? '空间 → 材质方向' : 'Space → material directions', 'bg-[#fff0cf] text-[#90610d]'],
          [Layers3, zh ? '空间风格化' : 'Space styling', zh ? '白模 → 风格效果' : 'White model → styled views', 'bg-[#dff5ec] text-[#137457]'],
          [FileText, zh ? '提案文案' : 'Proposal copy', zh ? '设计数据 → 客户提案' : 'Design data → client story', 'bg-[#dde7ff] text-[#315cad]'],
        ] as const).map(([Icon, title, text, tone]) => (
          <button
            key={String(title)}
            className="
              flat-card p-5 text-left transition
              hover:-translate-y-1 hover:border-brand-200
            "
          >
            <span className={`
              grid size-10 place-items-center rounded-xl
              ${tone}
            `}
            >
              <Icon className="size-5" />
            </span>
            <h3 className="mt-6 text-sm font-bold">{String(title)}</h3>
            <p className="mt-2 text-[10px] text-muted-foreground">{String(text)}</p>
            <MoveUpRight className="mt-5 size-4 text-brand-500" />
          </button>
        ))}
      </div>
      <section className="flat-card p-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold">{zh ? '最近任务' : 'Recent jobs'}</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              {zh ? '任务状态、版本与结果完整保留' : 'Every state, version and result is retained'}
            </p>
          </div>
          <button className="text-xs font-bold text-brand-600">
            {zh ? '查看全部' : 'View all'}
          </button>
        </div>
        <div className="
          mt-5 grid gap-3
          md:grid-cols-3
        "
        >
          {[
            ['青山湖住宅', '客厅材质变体', '运行中 · 68%', 'bg-brand-500'],
            ['北外滩会所', '酒廊概念情绪板', '已完成 · 12 张', 'bg-mint'],
            ['松庭别墅', '主卧灯光风格化', '等待中 · #2', 'bg-sun'],
          ].map(([project, title, status, tone]) => (
            <div key={title} className="rounded-xl border border-border p-4">
              <div className="flex items-center gap-2">
                <span className={`
                  size-2 rounded-full
                  ${tone}
                `}
                />
                <span className="text-[10px] font-bold text-muted-foreground">
                  {project}
                </span>
              </div>
              <p className="mt-4 text-xs font-bold">{title}</p>
              <p className="mt-2 text-[10px] text-muted-foreground">{status}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ResourcesView({ locale }: { locale: string }) {
  const zh = locale === 'zh';
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={zh ? '资源与供应链' : 'Resources'}
        title={zh ? '产品与材质库' : 'Products & materials'}
        description={zh ? '让产品数据从灵感阶段一直流到采购与交付。' : 'Carry product data from inspiration to procurement and delivery.'}
        action={(
          <button className="flat-button-primary">
            <Plus className="size-4" />
            {zh ? '添加资源' : 'Add resource'}
          </button>
        )}
      />
      <div className="
        grid gap-3
        md:grid-cols-4
      "
      >
        {([
          [Box, zh ? '产品' : 'Products', '1,286', 'bg-brand-100 text-brand-700'],
          [Palette, zh ? '材质' : 'Materials', '468', 'bg-[#fff0cf] text-[#90610d]'],
          [UsersRound, zh ? '供应商' : 'Vendors', '84', 'bg-[#d9f8ed] text-[#137759]'],
          [Heart, zh ? '收藏夹' : 'Collections', '26', 'bg-[#ffe0df] text-[#a4423a]'],
        ] as const).map(([Icon, label, value, tone]) => (
          <div key={String(label)} className="flat-card p-5">
            <div className="flex items-center justify-between">
              <span className={`
                grid size-10 place-items-center rounded-xl
                ${tone}
              `}
              >
                <Icon className="size-5" />
              </span>
              <span className="text-xl font-bold">
                {String(value)}
              </span>
            </div>
            <p className="mt-5 text-xs font-bold">
              {String(label)}
            </p>
          </div>
        ))}
      </div>
      <section className="flat-card overflow-hidden">
        <div className="flex flex-wrap items-center gap-2 p-4">
          <div className="
            flex h-10 min-w-[240px] flex-1 items-center gap-2 rounded-xl
            bg-secondary px-3
          "
          >
            <Search className="size-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {zh ? '搜索产品、品牌、SKU 或供应商' : 'Search product, brand, SKU or vendor'}
            </span>
          </div>
          <button className="flat-button-secondary h-10">
            <Filter className="size-4" />
            {zh ? '全部分类' : 'All categories'}
          </button>
        </div>
        <div className="overflow-x-auto border-t border-border">
          <table className="w-full min-w-[920px] text-left">
            <thead className="
              bg-[#fafafd] text-[10px] font-bold text-muted-foreground
            "
            >
              <tr>
                {['产品', '空间', '品牌', '状态', '数量', '单价', '预计交付', ''].map(item => (
                  <th
                    key={item}
                    className="px-5 py-3"
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {scheduleItems.map((item, index) => (
                <tr key={item.item} className="hover:bg-[#fafafd]">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className={`
                        grid size-10 place-items-center rounded-xl
                        ${['bg-[#ddd9cf]', `bg-[#ded8cc]`, `bg-[#b8b6ad]`, `
                          bg-[#ddc8af]
                        `, `bg-[#e2e0d7]`, `bg-[#c3b9aa]`][index]}
                      `}
                      >
                        <Box className="size-4 text-white/80" />
                      </span>
                      <span>
                        <span className="block text-xs font-bold">{item.item}</span>
                        <span className="
                          mt-1 block text-[10px] text-muted-foreground
                        "
                        >
                          SKU-
                          {260100 + index}
                        </span>
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-xs">{item.space}</td>
                  <td className="px-5 py-4 text-xs font-semibold">{item.brand}</td>
                  <td className="px-5 py-4">
                    <StatusPill>{item.status}</StatusPill>
                  </td>
                  <td className="px-5 py-4 text-xs">{item.quantity}</td>
                  <td className="px-5 py-4 text-xs font-semibold">
                    {item.price}
                  </td>
                  <td className="px-5 py-4 text-[10px] text-muted-foreground">{item.delivery}</td>
                  <td className="px-5 py-4">
                    <MoreHorizontal className="size-4 text-muted-foreground" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function FinanceView({ locale }: { locale: string }) {
  const zh = locale === 'zh';
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={zh ? '设计费与商业' : 'Finance'}
        title={zh ? '报价、合同与收款' : 'Proposals, contracts & payments'}
        description={zh ? '把商业文件和项目交付保持在同一条数据链上。' : 'Keep commercial documents connected to project delivery.'}
        action={(
          <button className="flat-button-primary">
            <Plus className="size-4" />
            {zh ? '新建单据' : 'New document'}
          </button>
        )}
      />
      <div className="
        grid gap-3
        sm:grid-cols-2
        xl:grid-cols-4
      "
      >
        {[
          [zh ? '本月签约' : 'Signed this month', '¥ 82.6万', '+24%'],
          [zh ? '待收款' : 'Receivable', '¥ 47.6万', '8 笔'],
          [zh ? '已逾期' : 'Overdue', '¥ 9.2万', '1 笔'],
          [zh ? '年度收入' : 'Annual revenue', '¥ 486万', '68%'],
        ].map(([label, value, meta]) => (
          <div
            key={label}
            className="flat-card p-5"
          >
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="mt-5 text-2xl font-bold tracking-[-0.04em]">
              {value}
            </p>
            <p className={`
              mt-2 text-[10px] font-bold
              ${String(label).includes('逾期')
            ? `text-red-600`
            : `text-emerald-600`}
            `}
            >
              {meta}
            </p>
          </div>
        ))}
      </div>
      <section className="flat-card overflow-hidden">
        <div className="flex flex-wrap items-center gap-2 p-4">
          <div className="
            flex h-10 min-w-[220px] flex-1 items-center gap-2 rounded-xl
            bg-secondary px-3
          "
          >
            <Search className="size-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {zh ? '搜索单号、项目或客户' : 'Search number, project or client'}
            </span>
          </div>
          <button className="flat-button-secondary h-10">
            <Download className="size-4" />
            {zh ? '导出' : 'Export'}
          </button>
          <button className="flat-button-secondary h-10">
            <Filter className="size-4" />
            {zh ? '筛选' : 'Filter'}
          </button>
        </div>
        <div className="overflow-x-auto border-t border-border">
          <table className="w-full min-w-[900px] text-left">
            <thead className="
              bg-[#fafafd] text-[10px] font-bold text-muted-foreground
            "
            >
              <tr>
                {['单据', '项目', '总额', '已收', '状态', '到期', ''].map(item => (
                  <th
                    key={item}
                    className="px-5 py-3"
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {financeRows.map(row => (
                <tr
                  key={row.no}
                  className="hover:bg-[#fafafd]"
                >
                  <td className="px-5 py-4">
                    <p className="text-xs font-bold">{row.title}</p>
                    <p className="mt-1 text-[10px] text-brand-600">
                      {row.no}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-xs">
                    {row.project}
                  </td>
                  <td className="px-5 py-4 text-xs font-bold">{row.total}</td>
                  <td className="px-5 py-4 text-xs">
                    {row.paid}
                  </td>
                  <td className="px-5 py-4"><StatusPill>{row.status}</StatusPill></td>
                  <td className="px-5 py-4 text-[10px] text-muted-foreground">
                    {row.due}
                  </td>
                  <td className="px-5 py-4">
                    <MoreHorizontal className="size-4 text-muted-foreground" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function TeamView({ locale }: { locale: string }) {
  const zh = locale === 'zh';
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={zh ? '团队与能力' : 'Team'}
        title={zh ? '工作室团队' : 'Studio team'}
        description={zh ? '管理成员、项目负载、角色与数据权限。' : 'Manage members, capacity, roles and data access.'}
        action={(
          <button className="flat-button-primary">
            <UserPlus className="size-4" />
            {zh ? '邀请成员' : 'Invite member'}
          </button>
        )}
      />
      <div className="
        grid gap-4
        sm:grid-cols-2
        xl:grid-cols-3
      "
      >
        {teamMembers.map(member => (
          <article key={member.name} className="flat-card p-5">
            <div className="flex items-start gap-3">
              <span className={`
                grid size-11 place-items-center rounded-xl text-sm font-black
                ${member.color}
              `}
              >
                {member.initials}
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="text-sm font-bold">{member.name}</h2>
                <p className="mt-1 text-[10px] text-muted-foreground">
                  {member.role}
                </p>
              </div>
              <MoreHorizontal className="size-4 text-muted-foreground" />
            </div>
            <div className="mt-6 flex items-center justify-between text-[10px]">
              <span className="text-muted-foreground">{zh ? '当前负载' : 'Capacity'}</span>
              <span className={`
                font-bold
                ${member.load > 85
            ? `text-coral`
            : `text-brand-600`}
              `}
              >
                {member.load}
                %
              </span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-secondary">
              <div
                className={`
                  h-full rounded-full
                  ${member.load > 85
            ? `bg-coral`
            : `bg-brand-500`}
                `}
                style={{ width: `${member.load}%` }}
              />
            </div>
            <div className="
              mt-5 flex items-center justify-between border-t border-border pt-4
              text-[10px] text-muted-foreground
            "
            >
              <span>
                {member.projects}
                {' '}
                {zh ? '个活跃项目' : 'active projects'}
              </span>
              <span className="flex items-center gap-1 text-emerald-600">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                {zh ? '在线' : 'Online'}
              </span>
            </div>
          </article>
        ))}
      </div>
      <section className="flat-card p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold">{zh ? '角色权限' : 'Roles & permissions'}</h2>
          <button className="text-xs font-bold text-brand-600">
            {zh ? '管理角色' : 'Manage roles'}
          </button>
        </div>
        <div className="
          mt-5 grid gap-2
          md:grid-cols-4
        "
        >
          {[['Owner', '1'], [zh ? '主创设计师' : 'Lead designer', '2'], [zh ? '设计师' : 'Designer', '5'], [zh ? '采购 / 财务' : 'Procurement / Finance', '3']].map(([role, count]) => (
            <div
              key={role}
              className="rounded-xl bg-secondary p-4"
            >
              <p className="text-xs font-bold">{role}</p>
              <p className="mt-2 text-[10px] text-muted-foreground">
                {count}
                {' '}
                {zh ? '位成员' : 'members'}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function InboxView({ locale }: { locale: string }) {
  const zh = locale === 'zh';
  const messages = [
    ['周静雯', '青山湖住宅', '客厅方案我很喜欢，关于沙发面料还有两个问题…', '12 分钟前', 'bg-[#ddd9ff] text-brand-800'],
    ['顾宁', '松庭别墅', 'Flos 吊灯交期发生变化，已提交替代方案。', '38 分钟前', 'bg-[#d9f7ec] text-[#17775a]'],
    ['陈一川', '北外滩会所', '深化设计评审已完成，有 3 项需要本周确认。', '1 小时前', 'bg-[#ffe7ba] text-[#805910]'],
    ['系统', '森屿办公', '施工配合费 INV-2026-029 已逾期 4 天。', '2 小时前', 'bg-[#ffe0dd] text-[#9d3e36]'],
  ] as const;
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={zh ? '协作中心' : 'Collaboration'}
        title={zh ? '收件箱' : 'Inbox'}
        description={zh ? '客户反馈、团队提醒与系统通知集中处理。' : 'Handle client feedback, team updates and system alerts.'}
        action={(
          <button className="flat-button-secondary">
            <Settings2 className="size-4" />
            {zh ? '通知设置' : 'Preferences'}
          </button>
        )}
      />
      <div className="
        grid gap-5
        xl:grid-cols-[0.85fr_1.15fr]
      "
      >
        <section className="flat-card overflow-hidden">
          <div className="flex gap-2 p-4">
            <button className="
              rounded-lg bg-[#191820] px-3 py-2 text-[10px] font-bold text-white
            "
            >
              {zh ? '全部 12' : 'All 12'}
            </button>
            <button className="
              rounded-lg px-3 py-2 text-[10px] font-bold text-muted-foreground
            "
            >
              {zh ? '客户 4' : 'Clients 4'}
            </button>
            <button className="
              rounded-lg px-3 py-2 text-[10px] font-bold text-muted-foreground
            "
            >
              {zh ? '系统 3' : 'System 3'}
            </button>
          </div>
          <div className="divide-y divide-border border-t border-border">
            {messages.map(([name, project, text, time, tone], index) => (
              <button
                key={name}
                className={`
                  w-full p-4 text-left
                  hover:bg-[#fafafd]
                  ${index === 0
                ? `bg-brand-50/50`
                : ''}
                `}
              >
                <div className="flex gap-3">
                  <span className={`
                    grid size-9 shrink-0 place-items-center rounded-xl text-xs
                    font-black
                    ${tone}
                  `}
                  >
                    {name.slice(0, 1)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-bold">{name}</p>
                      {index < 2 && (
                        <span className="size-1.5 rounded-full bg-brand-500" />
                      )}
                      <span className="ml-auto text-[9px] text-muted-foreground">{time}</span>
                    </div>
                    <p className="mt-1 text-[10px] font-semibold text-brand-600">
                      {project}
                    </p>
                    <p className="
                      mt-2 line-clamp-2 text-[10px]/5 text-muted-foreground
                    "
                    >
                      {text}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
        <section className="
          flat-card flex min-h-[560px] flex-col overflow-hidden
        "
        >
          <div className="flex items-center border-b border-border p-4">
            <span className="
              grid size-9 place-items-center rounded-xl bg-[#ddd9ff] text-xs
              font-black text-brand-800
            "
            >
              周
            </span>
            <div className="ml-3">
              <p className="text-xs font-bold">周静雯</p>
              <p className="mt-1 text-[10px] text-muted-foreground">
                青山湖 · 云栖住宅 · 客户门户
              </p>
            </div>
            <button className="
              ml-auto grid size-9 place-items-center rounded-lg border
              border-border
            "
            >
              <MoreHorizontal className="size-4" />
            </button>
          </div>
          <div className="flex-1 space-y-5 bg-[#fafafd] p-5">
            <div className="
              max-w-[78%] rounded-2xl rounded-tl-sm bg-white p-4 text-xs/6
              shadow-sm
            "
            >
              客厅方案我很喜欢，关于沙发面料还有两个问题：家里有小朋友，是否有更耐磨的选择？
            </div>
            <div className="
              ml-auto max-w-[78%] rounded-2xl rounded-tr-sm bg-brand-600 p-4
              text-xs/6 text-white
            "
            >
              可以的。我们已经让采购补充了两款高耐磨面料，并保持当前的暖灰色调。
            </div>
            <div className="
              ml-auto max-w-[78%] overflow-hidden rounded-2xl rounded-tr-sm
              bg-white p-2 shadow-sm
            "
            >
              <div className="rounded-xl bg-[#d8d1c7] p-3"><ProjectVisual tone="#7d8175" accent="#d8d1c7" compact /></div>
              <p className="p-2 text-[10px] font-bold">
                面料替代方案 · v2
              </p>
            </div>
          </div>
          <div className="border-t border-border p-4">
            <div className="
              flex items-center gap-2 rounded-xl border border-input bg-white
              p-2
            "
            >
              <button className="
                grid size-8 place-items-center text-muted-foreground
              "
              >
                <Paperclip className="size-4" />
              </button>
              <span className="flex-1 text-xs text-muted-foreground">
                {zh ? '回复客户…' : 'Reply to client…'}
              </span>
              <button className="
                grid size-8 place-items-center rounded-lg bg-brand-600
                text-white
              "
              >
                <Send className="size-4" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function SettingsView({ locale }: { locale: string }) {
  const zh = locale === 'zh';
  return (
    <div className="mx-auto max-w-[1050px] space-y-6">
      <PageHeader eyebrow={zh ? '工作空间' : 'Workspace'} title={zh ? '设置' : 'Settings'} description={zh ? '管理工作室资料、偏好、安全与账单。' : 'Manage studio profile, preferences, security and billing.'} />
      <div className="
        grid gap-5
        lg:grid-cols-[220px_1fr]
      "
      >
        <nav className="flat-card h-fit p-2">
          {[(zh ? '工作室资料' : 'Studio profile'), (zh ? '成员与权限' : 'Members & roles'), (zh ? '项目模板' : 'Project templates'), (zh ? 'AI 与集成' : 'AI & integrations'), (zh ? '账单方案' : 'Billing'), (zh ? '安全与审计' : 'Security & audit')].map((item, index) => (
            <button
              key={item}
              className={`
                w-full rounded-xl px-3 py-2.5 text-left text-xs font-semibold
                ${index === 0
              ? `bg-brand-50 text-brand-700`
              : `
                text-muted-foreground
                hover:bg-secondary
              `}
              `}
            >
              {item}
            </button>
          ))}
        </nav>
        <section className="
          flat-card p-5
          md:p-7
        "
        >
          <h2 className="text-lg font-bold">{zh ? '工作室资料' : 'Studio profile'}</h2>
          <p className="mt-2 text-xs text-muted-foreground">{zh ? '这些信息会出现在客户门户和商业文件中。' : 'This appears in client portals and commercial documents.'}</p>
          <div className="mt-7 flex items-center gap-4">
            <span className="
              grid size-16 place-items-center rounded-2xl bg-brand-600 text-xl
              font-black text-white
            "
            >
              未
            </span>
            <div>
              <button className="flat-button-secondary h-9">{zh ? '上传标志' : 'Upload logo'}</button>
              <p className="mt-2 text-[10px] text-muted-foreground">
                PNG / SVG ·
                {zh ? '最大 2MB' : 'Max 2MB'}
              </p>
            </div>
          </div>
          <div className="
            mt-7 grid gap-4
            sm:grid-cols-2
          "
          >
            {[
              [zh ? '显示名称' : 'Display name', '未形设计事务所'],
              [zh ? '法定名称' : 'Legal name', '杭州未形空间设计有限公司'],
              [zh ? '联系邮箱' : 'Contact email', 'studio@weixing.design'],
              [zh ? '联系电话' : 'Phone', '+86 571 8812 2608'],
              [zh ? '默认货币' : 'Default currency', 'CNY · 人民币'],
              [zh ? '时区' : 'Timezone', 'Asia / Shanghai'],
            ].map(([label, value]) => (
              <label key={label}>
                <span className="text-[10px] font-bold">{label}</span>
                <span className="
                  mt-2 flex h-11 items-center rounded-xl border border-input
                  px-3 text-xs
                "
                >
                  {value}
                </span>
              </label>
            ))}
          </div>
          <label className="mt-4 block">
            <span className="text-[10px] font-bold">{zh ? '工作室简介' : 'Studio bio'}</span>
            <span className="
              mt-2 block min-h-24 rounded-xl border border-input p-3 text-xs/6
              text-muted-foreground
            "
            >
              专注于住宅、酒店与品牌空间的室内设计事务所，以安静、自然和精确的材料表达见长。
            </span>
          </label>
          <div className="mt-6 flex justify-end">
            <button className="flat-button-primary">
              {zh ? '保存修改' : 'Save changes'}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

const projectTabs = [
  ['overview', '概览'],
  ['client', '客户与合同'],
  ['design', '设计阶段'],
  ['canvas', 'AI 画布'],
  ['space', '空间与平面'],
  ['schedule', 'Schedule'],
  ['quotes', '报价'],
  ['construction', '施工'],
  ['tasks', '任务'],
  ['files', '文件'],
  ['share', '客户门户'],
] as const;

function ProjectSection({ section, locale }: { section: string; locale: string }) {
  const zh = locale === 'zh';
  if (section === 'schedule') {
    return (
      <section className="flat-card overflow-hidden">
        <div className="flex flex-wrap items-center gap-2 p-4">
          <div>
            <h2 className="text-sm font-bold">FF&E Schedule</h2>
            <p className="mt-1 text-[10px] text-muted-foreground">
              42
              {zh ? '个产品 · 预算使用 68%' : 'items · 68% of budget'}
            </p>
          </div>
          <button className="flat-button-secondary ml-auto h-9">
            <Download className="size-4" />
            {zh ? '导出' : 'Export'}
          </button>
          <button className="flat-button-primary h-9">
            <Plus className="size-4" />
            {zh ? '添加产品' : 'Add item'}
          </button>
        </div>
        <div className="overflow-x-auto border-t border-border">
          <table className="w-full min-w-[880px] text-left">
            <thead className="
              bg-[#fafafd] text-[10px] font-bold text-muted-foreground
            "
            >
              <tr>
                {['产品', '空间', '品牌', '状态', '数量', '单价', '交付'].map(item => (
                  <th
                    key={item}
                    className="px-4 py-3"
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {scheduleItems.map(item => (
                <tr key={item.item}>
                  <td className="p-4 text-xs font-bold">{item.item}</td>
                  <td className="p-4 text-xs">
                    {item.space}
                  </td>
                  <td className="p-4 text-xs">{item.brand}</td>
                  <td className="p-4">
                    <StatusPill>{item.status}</StatusPill>
                  </td>
                  <td className="p-4 text-xs">{item.quantity}</td>
                  <td className="p-4 text-xs font-semibold">
                    {item.price}
                  </td>
                  <td className="p-4 text-[10px] text-muted-foreground">{item.delivery}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }
  if (section === 'canvas') {
    return (
      <section className="
        overflow-hidden rounded-2xl border border-border bg-[#ded9d2]
      "
      >
        <div className="
          flex h-12 items-center border-b border-black/8 bg-white px-3
        "
        >
          <span className="text-xs font-bold">{zh ? '客厅概念画布' : 'Living room concept canvas'}</span>
          <div className="ml-auto flex gap-2">
            <button className="
              grid size-8 place-items-center rounded-lg bg-secondary
            "
            >
              <Search className="size-4" />
            </button>
            <button className="flat-button-primary h-8">
              <Share2 className="size-3.5" />
              {zh ? '分享' : 'Share'}
            </button>
          </div>
        </div>
        <div className="
          relative min-h-[560px] overflow-hidden
          bg-[linear-gradient(#ffffff55_1px,transparent_1px),linear-gradient(90deg,#ffffff55_1px,transparent_1px)]
          bg-size-[28px_28px] p-8
        "
        >
          <div className="
            absolute top-10 left-[7%] w-[36%] -rotate-2 rounded-sm bg-white p-3
            shadow-xl
          "
          >
            <ProjectVisual tone="#747b70" accent="#d7cfc2" />
            <p className="mt-3 text-xs font-black tracking-[0.08em]">
              QUIET LIVING · 01
            </p>
          </div>
          <div className="
            absolute top-16 right-[8%] w-[38%] rotate-2 bg-white p-4 shadow-xl
          "
          >
            <p className="text-[10px] font-black tracking-[0.12em]">MATERIAL PALETTE</p>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {['#5d5b52', '#858d7c', '#d8cbb8', '#eee7dc'].map(color => (
                <span
                  key={color}
                  className="aspect-square"
                  style={{ background: color }}
                />
              ))}
            </div>
            <p className="mt-4 text-[9px]/5 text-muted-foreground">矿物涂料、烟熏木、羊毛与亚麻，控制材料对比，增强自然光的层次。</p>
          </div>
          <div className="
            absolute bottom-10 left-[18%] flex w-[64%] items-center gap-3
            rounded-2xl bg-[#191820] p-3 text-white shadow-2xl
          "
          >
            <span className="
              grid size-9 place-items-center rounded-xl bg-ai/20 text-[#c998ff]
            "
            >
              <WandSparkles className="size-4" />
            </span>
            <span className="min-w-0 flex-1 truncate text-xs text-white/55">
              {zh ? '告诉 AI 你想调整什么…' : 'Tell AI what to change…'}
            </span>
            <button className="
              rounded-xl bg-white px-4 py-2 text-xs font-bold text-[#222]
            "
            >
              {zh ? '生成' : 'Generate'}
            </button>
          </div>
        </div>
      </section>
    );
  }
  if (section === 'design') {
    return (
      <div className="
        grid gap-4
        md:grid-cols-2
        xl:grid-cols-3
      "
      >
        {['需求洞察', '现场勘测', '概念提案', '方案设计', '深化设计', '施工图', '交付复盘'].map((stage, index) => (
          <article
            key={stage}
            className={`
              flat-card overflow-hidden
              ${index === 3
            ? `border-brand-300 ring-4 ring-brand-50`
            : ''}
            `}
          >
            <div className="flex items-center gap-3 p-4">
              <span className={`
                grid size-9 place-items-center rounded-xl text-xs font-black
                ${index < 3
            ? `bg-emerald-50 text-emerald-700`
            : index === 3
              ? `bg-brand-600 text-white`
              : `bg-secondary text-muted-foreground`}
              `}
              >
                {index < 3
                  ? (
                      <Check className="size-4" />
                    )
                  : index + 1}
              </span>
              <div>
                <p className="text-xs font-bold">{stage}</p>
                <p className="mt-1 text-[10px] text-muted-foreground">
                  {index < 3 ? '已完成' : index === 3 ? '进行中 · 58%' : '未开始'}
                </p>
              </div>
            </div>
            <div className="border-t border-border bg-[#fafafd] p-4">
              <div className="
                flex items-center justify-between text-[10px]
                text-muted-foreground
              "
              >
                <span>{index === 3 ? '5 个交付物' : `${index + 2} 个交付物`}</span>
                <span>{index === 3 ? '08 / 12 到期' : '—'}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    );
  }
  if (section === 'quotes') {
    return <FinanceView locale={locale} />;
  }
  if (section === 'tasks') {
    return (
      <div className="
        grid gap-4
        lg:grid-cols-3
      "
      >
        {[
          ['待处理', '4', ['确认主材样板', '更新客厅灯位图', '补充软装预算']],
          ['进行中', '3', ['客厅效果图 v4', '卫浴五金比选', '玄关收口深化']],
          ['已完成', '8', ['平面方案确认', '概念提案汇报', '现场尺寸复核']],
        ].map(([title, count, items], col) => (
          <section key={String(title)}>
            <div className="mb-3 flex items-center">
              <span className={`
                size-2 rounded-full
                ${['bg-sun', 'bg-brand-500', 'bg-mint'][col]}
              `}
              />
              <h3 className="ml-2 text-xs font-bold">
                {String(title)}
              </h3>
              <span className="ml-2 text-[10px] text-muted-foreground">{String(count)}</span>
              <button className="
                ml-auto grid size-7 place-items-center rounded-lg bg-white
              "
              >
                <Plus className="size-3.5" />
              </button>
            </div>
            <div className="space-y-3">
              {(items as string[]).map((item, index) => (
                <article
                  key={item}
                  className="flat-card p-4"
                >
                  <p className="text-xs font-bold">{item}</p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-[9px] text-muted-foreground">{index === 0 ? '今天' : `08 / 0${index + 3}`}</span>
                    <span className="
                      grid size-6 place-items-center rounded-lg bg-[#ddd9ff]
                      text-[9px] font-black text-brand-800
                    "
                    >
                      林
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    );
  }
  if (section === 'files') {
    return (
      <div>
        <div className="flex justify-end gap-2">
          <button className="flat-button-secondary">
            <Folder className="size-4" />
            {zh ? '新建文件夹' : 'New folder'}
          </button>
          <button className="flat-button-primary">
            <Upload className="size-4" />
            {zh ? '上传' : 'Upload'}
          </button>
        </div>
        <div className="
          mt-5 grid gap-3
          sm:grid-cols-2
          xl:grid-cols-4
        "
        >
          {([['01 客户与合同', Folder, '18 项'], ['02 现场资料', Folder, '34 项'], ['03 设计成果', Folder, '86 项'], ['04 施工交付', Folder, '42 项']] as const).map(([name, Icon, meta]) => (
            <div
              key={String(name)}
              className="flat-card p-4"
            >
              <Icon className="size-7 fill-brand-100 text-brand-500" />
              <p className="mt-5 text-xs font-bold">
                {String(name)}
              </p>
              <p className="mt-2 text-[10px] text-muted-foreground">{String(meta)}</p>
            </div>
          ))}
        </div>
        <div className="
          mt-5 grid gap-3
          sm:grid-cols-2
          xl:grid-cols-3
        "
        >
          {([['客厅概念方案_v3.pdf', FileText, '12.8 MB'], ['现场照片_0728.zip', FileImage, '248 MB'], ['灯具清单_v4.xlsx', File, '1.6 MB']] as const).map(([name, Icon, meta]) => (
            <div
              key={String(name)}
              className="flat-card flex items-center gap-3 p-4"
            >
              <span className="
                grid size-10 place-items-center rounded-xl bg-secondary
              "
              >
                <Icon className="size-5" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-xs font-bold">{String(name)}</p>
                <p className="mt-1 text-[10px] text-muted-foreground">
                  {String(meta)}
                </p>
              </div>
              <MoreHorizontal className="ml-auto size-4 text-muted-foreground" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (section === 'share') {
    return (
      <div className="
        grid gap-5
        lg:grid-cols-[0.9fr_1.1fr]
      "
      >
        <section className="flat-card p-6">
          <span className="
            grid size-12 place-items-center rounded-2xl bg-brand-100
            text-brand-700
          "
          >
            <Link2 className="size-5" />
          </span>
          <h2 className="mt-6 text-lg font-bold">
            {zh ? '客户专属门户' : 'Client portal'}
          </h2>
          <p className="mt-3 text-sm/7 text-muted-foreground">{zh ? '客户无需进入工作室后台，即可查看方案、Schedule、报价和施工进度。' : 'Clients can review designs, schedules, proposals and construction without entering your workspace.'}</p>
          <div className="mt-6 rounded-xl bg-secondary p-3">
            <p className="text-[10px] text-muted-foreground">{zh ? '访问链接' : 'Portal link'}</p>
            <div className="mt-2 flex items-center gap-2">
              <p className="min-w-0 flex-1 truncate text-xs font-semibold">scapeleap.com/p/qh-7fd2a</p>
              <button className="
                grid size-8 place-items-center rounded-lg bg-white
              "
              >
                <Link2 className="size-3.5" />
              </button>
            </div>
          </div>
          <div className="mt-5 flex gap-2">
            <button className="flat-button-primary flex-1">
              <Share2 className="size-4" />
              {zh ? '分享门户' : 'Share portal'}
            </button>
            <button className="flat-button-secondary">
              <Settings2 className="size-4" />
            </button>
          </div>
        </section>
        <section className="
          overflow-hidden rounded-2xl border border-border bg-[#f1f0ed] p-3
        "
        >
          <div className="overflow-hidden rounded-xl bg-white shadow-xl">
            <div className="flex h-12 items-center border-b border-border px-4">
              <span className="text-xs font-black">未形设计</span>
              <span className="ml-auto text-[10px] text-muted-foreground">
                青山湖 · 云栖住宅
              </span>
            </div>
            <ProjectVisual tone="#747b70" accent="#d7cfc2" />
            <div className="p-5">
              <span className="text-[10px] font-bold text-brand-600">方案设计 · 已更新</span>
              <h3 className="mt-2 text-lg font-bold">
                客厅概念方案 v3
              </h3>
              <p className="mt-3 text-xs/6 text-muted-foreground">温润、克制并保留自然材质的真实触感。</p>
              <button className="flat-button-primary mt-5 w-full">
                <BadgeCheck className="size-4" />
                {zh ? '确认这个方案' : 'Approve this design'}
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }
  if (section === 'construction') {
    return (
      <div className="space-y-5">
        <div className="
          grid gap-3
          md:grid-cols-4
        "
        >
          {[['总进度', '66%'], ['本周任务', '12'], ['待验收', '4'], ['现场问题', '3']].map(([label, value], index) => (
            <div
              key={label}
              className="flat-card p-5"
            >
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className={`
                mt-4 text-2xl font-bold
                ${index === 3
              ? `text-coral`
              : ''}
              `}
              >
                {value}
              </p>
            </div>
          ))}
        </div>
        <section className="flat-card p-5">
          <h2 className="text-sm font-bold">{zh ? '施工里程碑' : 'Construction milestones'}</h2>
          <div className="mt-6 space-y-5">
            {[['拆改与放线', 100], ['水电隐蔽工程', 100], ['木作与基层', 78], ['饰面安装', 36], ['软装进场', 0]].map(([title, progress], index) => (
              <div
                key={String(title)}
                className="
                  grid items-center gap-3
                  sm:grid-cols-[150px_1fr_60px]
                "
              >
                <div className="flex items-center gap-2">
                  <span className={`
                    grid size-7 place-items-center rounded-lg text-[10px]
                    font-bold
                    ${Number(progress) === 100
                ? `bg-emerald-50 text-emerald-700`
                : index === 2
                  ? `bg-brand-100 text-brand-700`
                  : `bg-secondary text-muted-foreground`}
                  `}
                  >
                    {Number(progress) === 100
                      ? (
                          <Check className="size-3.5" />
                        )
                      : index + 1}
                  </span>
                  <span className="text-xs font-semibold">
                    {String(title)}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-brand-500"
                    style={{ width: `${Number(progress)}%` }}
                  />
                </div>
                <span className="text-right text-[10px] font-bold">
                  {String(progress)}
                  %
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }
  if (section === 'client') {
    return (
      <div className="
        grid gap-5
        lg:grid-cols-2
      "
      >
        <section className="flat-card p-5">
          <div className="flex items-center gap-3">
            <span className="
              grid size-12 place-items-center rounded-2xl bg-[#ddd9ff] text-sm
              font-black text-brand-800
            "
            >
              周
            </span>
            <div>
              <h2 className="text-sm font-bold">周静雯</h2>
              <p className="mt-1 text-[10px] text-muted-foreground">
                个人客户 · 合作中
              </p>
            </div>
            <button className="flat-button-secondary ml-auto h-9">
              <Mail className="size-4" />
              {zh ? '联系' : 'Contact'}
            </button>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-[10px] text-muted-foreground">电话</p>
              <p className="mt-2 font-semibold">
                +86 138 **** 6218
              </p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground">邮箱</p>
              <p className="mt-2 font-semibold">
                jingwen@example.com
              </p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground">家庭成员</p>
              <p className="mt-2 font-semibold">
                2 位成人 · 1 位儿童
              </p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground">决策偏好</p>
              <p className="mt-2 font-semibold">
                方案对比后确认
              </p>
            </div>
          </div>
        </section>
        <section className="flat-card p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold">{zh ? '合同摘要' : 'Contract summary'}</h2>
            <StatusPill>已签署</StatusPill>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] text-muted-foreground">合同编号</p>
              <p className="mt-2 text-xs font-semibold">
                CT-2026-018
              </p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground">设计费</p>
              <p className="mt-2 text-xs font-semibold">
                ¥ 286,000
              </p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground">签署日期</p>
              <p className="mt-2 text-xs font-semibold">
                2026 / 05 / 12
              </p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground">当前收款</p>
              <p className="mt-2 text-xs font-semibold">
                60%
              </p>
            </div>
          </div>
          <button className="flat-button-secondary mt-6 w-full">
            <FileText className="size-4" />
            {zh ? '查看合同文件' : 'Open contract'}
          </button>
        </section>
      </div>
    );
  }
  if (section === 'space') {
    return (
      <div className="
        grid gap-5
        lg:grid-cols-[1.2fr_0.8fr]
      "
      >
        <section className="flat-card overflow-hidden">
          <div className="flex h-12 items-center border-b border-border px-4">
            <h2 className="text-xs font-bold">{zh ? '一层平面 · 家具布置' : 'Floor 1 · Furniture plan'}</h2>
            <div className="ml-auto flex gap-2">
              <button className="
                grid size-8 place-items-center rounded-lg bg-secondary
              "
              >
                <Layers3 className="size-4" />
              </button>
              <button className="
                grid size-8 place-items-center rounded-lg bg-brand-600
                text-white
              "
              >
                <Plus className="size-4" />
              </button>
            </div>
          </div>
          <div className="
            relative grid min-h-[500px] place-items-center bg-[#eeeae4] p-10
          "
          >
            <div className="
              relative aspect-[1.35] w-full max-w-[620px] border-4
              border-[#5d5a55] bg-[#f9f7f2]
            "
            >
              <div className="
                absolute top-0 bottom-[45%] left-[62%] border-l-4
                border-[#5d5a55]
              "
              />
              <div className="
                absolute inset-x-0 top-[55%] border-t-4 border-[#5d5a55]
              "
              />
              <div className="
                absolute inset-y-0 left-[30%] border-l-4 border-[#5d5a55]
              "
              />
              <div className="
                absolute top-[18%] left-[6%] h-[22%] w-[18%] rounded-[30px]
                border-2 border-[#aaa49c]
              "
              />
              <div className="
                absolute right-[8%] bottom-[10%] h-[24%] w-[22%] border-2
                border-[#aaa49c]
              "
              />
              <span className="
                absolute top-[25%] left-[38%] text-[10px] text-[#8a857f]
              "
              >
                客厅 42㎡
              </span>
              <span className="
                absolute top-[26%] right-[10%] text-[10px] text-[#8a857f]
              "
              >
                主卧 28㎡
              </span>
              <span className="
                absolute bottom-[19%] left-[9%] text-[10px] text-[#8a857f]
              "
              >
                餐厨 36㎡
              </span>
            </div>
          </div>
        </section>
        <section className="flat-card p-5">
          <h2 className="text-sm font-bold">{zh ? '空间清单' : 'Spaces'}</h2>
          <div className="mt-5 space-y-2">
            {[['客厅', '42.6 ㎡', '12 项'], ['餐厅', '18.2 ㎡', '8 项'], ['主卧', '28.4 ㎡', '10 项'], ['儿童房', '16.8 ㎡', '6 项'], ['书房', '14.2 ㎡', '5 项'], ['厨房', '17.6 ㎡', '11 项']].map(([name, area, items], index) => (
              <button
                key={name}
                className={`
                  flex w-full items-center rounded-xl p-3 text-left
                  ${index === 0
                ? `bg-brand-50 text-brand-800`
                : `hover:bg-secondary`}
                `}
              >
                <span className="
                  grid size-8 place-items-center rounded-lg bg-white text-[10px]
                  font-black
                "
                >
                  {index + 1}
                </span>
                <span className="ml-3">
                  <span className="block text-xs font-bold">{name}</span>
                  <span className="mt-1 block text-[9px] text-muted-foreground">
                    {items}
                  </span>
                </span>
                <span className="ml-auto text-[10px] font-semibold">{area}</span>
              </button>
            ))}
          </div>
        </section>
      </div>
    );
  }
  return (
    <div className="
      grid gap-5
      xl:grid-cols-[1.25fr_0.75fr]
    "
    >
      <div className="space-y-5">
        <section className="flat-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold">{zh ? '设计阶段' : 'Design stages'}</h2>
              <p className="mt-1 text-[10px] text-muted-foreground">
                {zh ? '当前：方案设计 · 58%' : 'Current: Schematic design · 58%'}
              </p>
            </div>
            <Link
              href="#"
              className="text-xs font-bold text-brand-600"
            >
              {zh ? '查看详情' : 'View details'}
            </Link>
          </div>
          <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto">
            {['需求', '勘测', '概念', '方案', '深化', '施工图', '交付'].map((stage, index) => (
              <div
                key={stage}
                className={`
                  min-w-[88px] flex-1 rounded-xl p-3
                  ${index < 3
                ? `bg-emerald-50 text-emerald-800`
                : index === 3
                  ? `bg-brand-600 text-white`
                  : `bg-secondary text-muted-foreground`}
                `}
              >
                <span className="text-[9px] font-black">
                  0
                  {index + 1}
                </span>
                <p className="mt-5 text-[10px] font-bold">
                  {stage}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section className="flat-card overflow-hidden">
          <div className="flex items-center justify-between p-5">
            <h2 className="text-sm font-bold">{zh ? '最新设计成果' : 'Latest design work'}</h2>
            <button className="text-xs font-bold text-brand-600">
              {zh ? '全部成果' : 'All work'}
            </button>
          </div>
          <div className="
            grid gap-px bg-border
            sm:grid-cols-2
          "
          >
            <div className="bg-white p-4">
              <ProjectVisual tone="#747b70" accent="#d7cfc2" />
              <p className="mt-4 text-xs font-bold">
                客厅概念方案 v3
              </p>
              <p className="mt-2 text-[10px] text-muted-foreground">今天 10:24 · 林予安</p>
            </div>
            <div className="bg-white p-4">
              <ProjectVisual tone="#8d7f70" accent="#e4d5c3" />
              <p className="mt-4 text-xs font-bold">
                餐厅材质提案 v2
              </p>
              <p className="mt-2 text-[10px] text-muted-foreground">昨天 16:42 · 许知遥</p>
            </div>
          </div>
        </section>
      </div>
      <div className="space-y-5">
        <section className="flat-card p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold">{zh ? '项目健康度' : 'Project health'}</h2>
            <span className="
              flex items-center gap-1 text-[10px] font-bold text-emerald-600
            "
            >
              <span className="size-1.5 rounded-full bg-emerald-500" />
              {zh ? '正常' : 'On track'}
            </span>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {[['进度', '58%'], ['预算', '68%'], ['待确认', '5'], ['风险', '2']].map(([label, value], index) => (
              <div
                key={label}
                className="rounded-xl bg-secondary p-4"
              >
                <p className="text-[10px] text-muted-foreground">{label}</p>
                <p className={`
                  mt-2 text-lg font-bold
                  ${index === 3
                ? `text-coral`
                : ''}
                `}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section className="flat-card p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold">{zh ? '近期事项' : 'Upcoming'}</h2>
            <Plus className="size-4 text-brand-600" />
          </div>
          <div className="mt-5 space-y-4">
            {[['今天', '客户方案评审', '16:00'], ['明天', '主材样板确认', '11:30'], ['周五', '灯具清单冻结', '17:00']].map(([day, title, time], index) => (
              <div
                key={title}
                className="flex gap-3"
              >
                <span className={`
                  mt-1 size-2 rounded-full
                  ${['bg-coral', 'bg-sun', `bg-brand-500`][index]}
                `}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold">{title}</p>
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    {day}
                    {' '}
                    ·
                    {' '}
                    {time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function ProjectView({ segments, locale, root }: { segments: string[]; locale: string; root: string }) {
  const project = demoProjects.find(item => item.id === segments[1]) ?? demoProjects[0]!;
  const section = segments[2] ?? 'overview';
  return (
    <div className="space-y-5">
      <div className="flat-card overflow-hidden">
        <div className="relative h-28 overflow-hidden" style={{ background: project.accent }}>
          <div className="absolute inset-x-0 bottom-0 h-[70%]" style={{ background: project.tone }} />
          <div className="
            absolute inset-0 bg-linear-to-r from-black/55 to-transparent
          "
          />
          <div className="absolute inset-0 flex items-end p-5 text-white">
            <div>
              <p className="text-[10px] font-bold text-white/60">
                {project.code}
                {' '}
                ·
                {' '}
                {project.client}
              </p>
              <h1 className="mt-1 text-xl font-bold tracking-[-0.04em]">{project.name}</h1>
            </div>
            <div className="
              ml-auto hidden items-center gap-2
              sm:flex
            "
            >
              <button className="
                flat-button h-9 bg-white/12 text-white backdrop-blur-sm
                hover:bg-white/20
              "
              >
                <Share2 className="size-4" />
                客户预览
              </button>
              <button className="
                grid size-9 place-items-center rounded-xl bg-white/12
              "
              >
                <MoreHorizontal className="size-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="no-scrollbar flex overflow-x-auto px-3">
          {projectTabs.map(([id, label]) => (
            <Link
              key={id}
              href={`${root}/projects/${project.id}/${id}`}
              className={`
                relative p-3 text-[11px] font-semibold whitespace-nowrap
                ${section === id
              ? `text-brand-700`
              : `
                text-muted-foreground
                hover:text-foreground
              `}
              `}
            >
              {label}
              {section === id && (
                <span className="
                  absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-brand-600
                "
                />
              )}
            </Link>
          ))}
        </div>
      </div>
      <ProjectSection section={section} locale={locale} />
    </div>
  );
}

export function StudioView({
  pathSegments,
  locale,
  orgSlug,
}: {
  pathSegments: string[];
  locale: string;
  orgSlug: string;
}) {
  const prefix = locale === 'en' ? '/en' : '';
  const root = `${prefix}/app/${orgSlug}`;
  const moduleId = pathSegments[0] ?? 'dashboard';

  if (moduleId === 'projects' && pathSegments.length > 1 && pathSegments[1] !== 'new') {
    return <ProjectView segments={pathSegments} locale={locale} root={root} />;
  }

  if (moduleId === 'projects') {
    return <ProjectsView locale={locale} root={root} />;
  }
  if (moduleId === 'customers') {
    return <CustomersView locale={locale} />;
  }
  if (moduleId === 'ai') {
    return <AiStudioView locale={locale} />;
  }
  if (moduleId === 'resources') {
    return <ResourcesView locale={locale} />;
  }
  if (moduleId === 'finance') {
    return <FinanceView locale={locale} />;
  }
  if (moduleId === 'team') {
    return <TeamView locale={locale} />;
  }
  if (moduleId === 'inbox') {
    return <InboxView locale={locale} />;
  }
  if (moduleId === 'settings') {
    return <SettingsView locale={locale} />;
  }
  return <DashboardView locale={locale} root={root} />;
}
