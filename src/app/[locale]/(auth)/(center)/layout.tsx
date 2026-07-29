import { setRequestLocale } from 'next-intl/server';
import { BrandMark } from '@/components/BrandMark';

export default async function CenteredLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const home = locale === 'en' ? '/en' : '/';

  return (
    <main className="
      grid min-h-screen bg-white
      lg:grid-cols-[0.9fr_1.1fr]
    "
    >
      <section className="
        relative hidden overflow-hidden bg-[#191820] p-10 text-white
        lg:flex lg:flex-col
      "
      >
        <BrandMark href={home} inverse />
        <div className="my-auto max-w-[540px]">
          <span className="
            inline-flex rounded-full bg-white/8 px-3 py-1.5 text-xs font-bold
            text-[#c9a5ff]
          "
          >
            AI Studio OS
          </span>
          <h1 className="
            mt-7 text-5xl leading-[1.04] font-bold tracking-[-0.055em]
          "
          >
            {locale === 'zh' ? '把设计灵感，推进到真实交付。' : 'Move design ideas into real-world delivery.'}
          </h1>
          <p className="mt-6 max-w-[470px] text-sm/7 text-white/55">
            {locale === 'zh'
              ? '客户、项目、AI 画布、FF&E、报价和施工，在一个属于团队的工作空间里。'
              : 'Clients, projects, AI canvas, FF&E, fees and construction in one team workspace.'}
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            ['7', locale === 'zh' ? '设计阶段' : 'design stages'],
            ['1', locale === 'zh' ? '统一数据源' : 'source of truth'],
            ['100%', locale === 'zh' ? '自主部署' : 'self-hosted'],
          ].map(([value, label]) => (
            <div key={label} className="rounded-2xl bg-white/6 p-4">
              <p className="text-xl font-bold">{value}</p>
              <p className="mt-1 text-[10px] text-white/40">{label}</p>
            </div>
          ))}
        </div>
        <div className="
          absolute -right-28 -bottom-28 size-80 rounded-full border-60
          border-brand-500/20
        "
        />
      </section>
      <section className="
        relative flex min-h-screen items-center justify-center px-5 py-16
      "
      >
        <div
          className="
            absolute top-6 left-6
            lg:hidden
          "
        >
          <BrandMark href={home} />
        </div>
        {props.children}
      </section>
    </main>
  );
}
