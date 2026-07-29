export type MarketingLocale = 'zh' | 'en';

export const marketingCopy = {
  zh: {
    nav: {
      product: '产品',
      solutions: '解决方案',
      pricing: '价格',
      resources: '资源',
      signIn: '登录',
      start: '开始使用',
    },
    hero: {
      eyebrow: '为设计工作室而生的 AI Studio OS',
      titleA: '把设计灵感，',
      titleB: '推进到真实交付。',
      description:
        '从客户需求、七阶段设计、AI 画布，到 FF&E、报价、施工与客户确认。ScapeLeap 让团队在一个清晰工作区里完成整个项目。',
      primary: '免费开始',
      secondary: '查看产品',
      note: '14 天完整体验 · 无需信用卡 · 可部署到你的服务器',
    },
    proof: ['客户与销售', '项目与设计', 'AI 创作', 'FF&E Schedule', '报价与收款', '施工交付'],
  },
  en: {
    nav: {
      product: 'Product',
      solutions: 'Solutions',
      pricing: 'Pricing',
      resources: 'Resources',
      signIn: 'Sign in',
      start: 'Get started',
    },
    hero: {
      eyebrow: 'The AI Studio OS for interior design teams',
      titleA: 'Move from ideas',
      titleB: 'to real-world delivery.',
      description:
        'Bring client briefs, seven-stage design, AI canvas, FF&E, fees, construction and approvals into one focused workspace.',
      primary: 'Start free',
      secondary: 'Explore product',
      note: '14-day full access · No credit card · Runs on your infrastructure',
    },
    proof: ['CRM', 'Design projects', 'AI canvas', 'FF&E schedule', 'Fees & billing', 'Construction'],
  },
} satisfies Record<MarketingLocale, unknown>;
