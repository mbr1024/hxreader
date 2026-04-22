'use client';

import { useState, useMemo } from 'react';
import {
  MdSearch,
  MdNotificationsNone,
  MdStarRate,
  MdChevronRight,
  MdRefresh,
} from 'react-icons/md';
import { useTheme } from '@/hooks/useTheme';
import { useTranslation } from '@/hooks/useTranslation';
import { useThemeStore } from '@/store/themeStore';
import { useTabBarPadding } from '@/components/BottomTabBar';

/* ── Data ─────────────────────────────────────────── */

const DAILY_CLASSICS = [
  {
    quote: '学而不思则罔，思而不学则殆。',
    quoteSource: '《论语·为政》',
    poem: '静夜思',
    poemAuthor: '李白',
    poemDynasty: '唐',
    poemText: '床前明月光，疑是地上霜。举头望明月，低头思故乡。',
  },
  {
    quote: '天行健，君子以自强不息。',
    quoteSource: '《周易·乾卦》',
    poem: '登鹳雀楼',
    poemAuthor: '王之涣',
    poemDynasty: '唐',
    poemText: '白日依山尽，黄河入海流。欲穷千里目，更上一层楼。',
  },
  {
    quote: '上善若水，水善利万物而不争。',
    quoteSource: '《道德经》第八章',
    poem: '春晓',
    poemAuthor: '孟浩然',
    poemDynasty: '唐',
    poemText: '春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。',
  },
  {
    quote: '路漫漫其修远兮，吾将上下而求索。',
    quoteSource: '《离骚》',
    poem: '江雪',
    poemAuthor: '柳宗元',
    poemDynasty: '唐',
    poemText: '千山鸟飞绝，万径人踪灭。孤舟蓑笠翁，独钓寒江雪。',
  },
  {
    quote: '不以物喜，不以己悲。',
    quoteSource: '《岳阳楼记》',
    poem: '望庐山瀑布',
    poemAuthor: '李白',
    poemDynasty: '唐',
    poemText: '日照香炉生紫烟，遥看瀑布挂前川。飞流直下三千尺，疑是银河落九天。',
  },
  {
    quote: '吾生也有涯，而知也无涯。',
    quoteSource: '《庄子·养生主》',
    poem: '竹里馆',
    poemAuthor: '王维',
    poemDynasty: '唐',
    poemText: '独坐幽篁里，弹琴复长啸。深林人不知，明月来相照。',
  },
  {
    quote: '知者乐水，仁者乐山。',
    quoteSource: '《论语·雍也》',
    poem: '鹿柴',
    poemAuthor: '王维',
    poemDynasty: '唐',
    poemText: '空山不见人，但闻人语响。返景入深林，复照青苔上。',
  },
];

const SIBU = [
  { label: '经部', desc: '儒学经典', color: 'bg-red-800 text-white' },
  { label: '史部', desc: '历代史书', color: 'bg-amber-800 text-white' },
  { label: '子部', desc: '诸子百家', color: 'bg-emerald-800 text-white' },
  { label: '集部', desc: '诗文词赋', color: 'bg-blue-800 text-white' },
];

const RECOMMENDED_BOOKS = [
  { title: '论语', author: '孔子及弟子', rating: 9.6, tag: '儒学' },
  { title: '道德经', author: '老子', rating: 9.5, tag: '道家' },
  { title: '庄子', author: '庄周', rating: 9.4, tag: '道家' },
  { title: '史记', author: '司马迁', rating: 9.7, tag: '史学' },
  { title: '诗经', author: '佚名', rating: 9.3, tag: '诗歌' },
  { title: '孟子', author: '孟轲', rating: 9.2, tag: '儒学' },
];

const RANKING_BOOKS = [
  { title: '古文观止', author: '吴楚材 吴调侯', tag: '散文', readers: '86.3万' },
  { title: '资治通鉴', author: '司马光', tag: '编年史', readers: '72.1万' },
  { title: '唐诗三百首', author: '蘅塘退士', tag: '诗歌', readers: '68.5万' },
  { title: '世说新语', author: '刘义庆', tag: '笔记', readers: '45.2万' },
  { title: '菜根谭', author: '洪应明', tag: '格言', readers: '38.7万' },
];

const CULTURE_TIDBITS = [
  { emoji: '🏮', label: '谷雨', desc: '雨生百谷' },
  { emoji: '🎭', label: '程门立雪', desc: '尊师重道' },
  { emoji: '🖌️', label: '道', desc: '汉字溯源' },
  { emoji: '🎵', label: '高山流水', desc: '知音难觅' },
];

/* ── Component ────────────────────────────────────── */

const HomePage = () => {
  const _ = useTranslation();
  useTheme({ systemUIVisible: true, appThemeColor: 'base-200' });
  const { safeAreaInsets } = useThemeStore();
  const tabBarPadding = useTabBarPadding();
  const [dailyIndex, setDailyIndex] = useState(() => new Date().getDate() % DAILY_CLASSICS.length);
  const daily = DAILY_CLASSICS[dailyIndex]!;

  const todayDate = useMemo(() => {
    const d = new Date();
    const months = ['正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '冬月', '腊月'];
    const days = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
      '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
      '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'];
    return `${months[d.getMonth()]}${days[d.getDate() - 1] ?? ''}`;
  }, []);

  return (
    <div className='bg-base-200 min-h-screen' style={{ paddingTop: safeAreaInsets?.top ?? 0 }}>
      {/* ── Header ── */}
      <header className='bg-base-100 flex items-center gap-3 px-4 py-2'>
        <div className='bg-base-200 flex flex-1 items-center gap-2 rounded-full px-3 py-2'>
          <MdSearch className='text-base-content/40 text-lg' />
          <span className='text-base-content/40 text-sm'>{_('搜索古籍、诗词、作者')}</span>
        </div>
        <button className='text-base-content/70 relative p-1'>
          <MdNotificationsNone className='text-2xl' />
          <span className='absolute right-0.5 top-0.5 h-2 w-2 rounded-full bg-red-500' />
        </button>
      </header>

      <main className='space-y-4 p-4' style={{ paddingBottom: tabBarPadding }}>

        {/* ─────────────────────────────────────────
            Zone 1 · 每日一课  —— 视觉焦点
            Quote + Poem 合一，沉浸式大卡片
        ───────────────────────────────────────── */}
        <section className='relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-800 to-yellow-950 p-5 text-white'>
          {/* decorative seal */}
          <div className='absolute -right-6 -top-6 h-28 w-28 rounded-full border-[3px] border-white/10' />
          <div className='absolute -right-3 -top-3 h-16 w-16 rounded-full border-[3px] border-white/10' />

          {/* header row */}
          <div className='mb-4 flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <span className='rounded border border-white/30 px-1.5 py-0.5 text-[10px] font-bold'>
                {_('每日一课')}
              </span>
              <span className='text-xs text-white/50'>{todayDate}</span>
            </div>
            <button
              onClick={() => setDailyIndex((p) => (p + 1) % DAILY_CLASSICS.length)}
              className='flex items-center gap-0.5 text-xs text-white/50'
            >
              <MdRefresh className='text-sm' />
              {_('换一篇')}
            </button>
          </div>

          {/* quote */}
          <p className='mb-1 text-lg font-serif leading-relaxed'>
            「{daily.quote}」
          </p>
          <p className='mb-5 text-xs text-white/50'>—— {daily.quoteSource}</p>

          {/* divider */}
          <div className='mb-4 border-t border-white/15' />

          {/* poem */}
          <div className='flex gap-3'>
            <div className='flex flex-col items-center rounded-lg border border-white/20 px-2 py-1.5'>
              <span className='text-[10px] text-white/50'>{daily.poemDynasty}</span>
              <span className='text-base font-bold'>{_('诗')}</span>
            </div>
            <div className='flex-1'>
              <p className='mb-0.5 text-sm font-semibold'>
                {daily.poem}
                <span className='ml-2 text-xs font-normal text-white/50'>
                  {daily.poemAuthor}
                </span>
              </p>
              <p className='text-sm font-serif leading-relaxed text-white/70'>
                {daily.poemText}
              </p>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────
            Zone 2 · 四部分类 + 文化小识
            紧凑导航区
        ───────────────────────────────────────── */}
        <div className='bg-base-100 rounded-2xl p-4'>
          {/* 经史子集 */}
          <div className='mb-3 grid grid-cols-4 gap-2'>
            {SIBU.map((s) => (
              <button
                key={s.label}
                className={`flex flex-col items-center rounded-xl ${s.color} py-2.5`}
              >
                <span className='text-sm font-bold'>{s.label}</span>
                <span className='text-[10px] text-white/60'>{s.desc}</span>
              </button>
            ))}
          </div>

          {/* 文化小识 strip */}
          <div className='flex gap-2 overflow-x-auto'>
            {CULTURE_TIDBITS.map((c) => (
              <div
                key={c.label}
                className='bg-base-200 flex flex-shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5'
              >
                <span className='text-sm'>{c.emoji}</span>
                <span className='text-base-content text-xs font-medium'>{c.label}</span>
                <span className='text-base-content/40 text-[10px]'>{c.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ─────────────────────────────────────────
            Zone 3 · 古籍推荐
            横滑书卡 + 排行榜 合为一体
        ───────────────────────────────────────── */}
        <section>
          <div className='mb-2 flex items-center justify-between'>
            <h2 className='text-base font-semibold'>{_('古籍推荐')}</h2>
            <button className='text-primary flex items-center text-xs'>
              {_('更多')}
              <MdChevronRight />
            </button>
          </div>
          {/* book scroll */}
          <div className='-mx-4 flex gap-3 overflow-x-auto px-4 pb-3'>
            {RECOMMENDED_BOOKS.map((book) => (
              <div key={book.title} className='w-28 flex-shrink-0'>
                <div className='bg-base-300 flex aspect-[3/4] items-center justify-center rounded-lg'>
                  <span className='text-base-content/30 text-xs font-medium'>{book.tag}</span>
                </div>
                <h3 className='text-base-content mt-1.5 truncate text-sm font-medium'>{book.title}</h3>
                <p className='text-base-content/50 truncate text-xs'>{book.author}</p>
                <div className='mt-0.5 flex items-center gap-0.5'>
                  <MdStarRate className='text-xs text-amber-400' />
                  <span className='text-xs text-amber-500'>{book.rating}</span>
                </div>
              </div>
            ))}
          </div>

          {/* ranking list */}
          <div className='bg-base-100 divide-base-200 divide-y rounded-xl'>
            <div className='flex items-center justify-between px-4 py-2.5'>
              <span className='text-base-content text-sm font-semibold'>{_('阅读榜')}</span>
              <button className='text-primary flex items-center text-xs'>
                {_('完整榜单')}
                <MdChevronRight />
              </button>
            </div>
            {RANKING_BOOKS.map((book, i) => (
              <div key={book.title} className='flex items-center gap-3 px-4 py-2.5'>
                <span
                  className={`w-5 text-center text-sm font-bold ${i < 3 ? 'text-primary' : 'text-base-content/30'}`}
                >
                  {i + 1}
                </span>
                <div className='min-w-0 flex-1'>
                  <h3 className='text-base-content truncate text-sm font-medium'>{book.title}</h3>
                  <p className='text-base-content/50 text-xs'>
                    {book.author}
                    <span className='bg-base-200 text-base-content/40 ml-2 rounded px-1 py-0.5 text-[10px]'>
                      {book.tag}
                    </span>
                  </p>
                </div>
                <span className='text-base-content/30 flex-shrink-0 text-xs'>{book.readers}</span>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
};

export default HomePage;
