'use client';

import { useState, useMemo } from 'react';
import {
  MdSearch,
  MdNotificationsNone,
  MdStarRate,
  MdEmojiEvents,
  MdCategory,
  MdCardGiftcard,
  MdAutoAwesome,
  MdChevronRight,
  MdFormatQuote,
  MdRefresh,
} from 'react-icons/md';
import { useTheme } from '@/hooks/useTheme';
import { useTranslation } from '@/hooks/useTranslation';
import { useThemeStore } from '@/store/themeStore';
import { useTabBarPadding } from '@/components/BottomTabBar';

const DAILY_QUOTES = [
  { text: '学而不思则罔，思而不学则殆。', source: '《论语·为政》', author: '孔子' },
  { text: '天行健，君子以自强不息。', source: '《周易·乾卦》', author: '佚名' },
  { text: '知者乐水，仁者乐山。', source: '《论语·雍也》', author: '孔子' },
  { text: '上善若水，水善利万物而不争。', source: '《道德经》第八章', author: '老子' },
  { text: '路漫漫其修远兮，吾将上下而求索。', source: '《离骚》', author: '屈原' },
  { text: '不以物喜，不以己悲。', source: '《岳阳楼记》', author: '范仲淹' },
  { text: '吾生也有涯，而知也无涯。', source: '《庄子·养生主》', author: '庄子' },
];

const POEM_OF_DAY = {
  title: '静夜思',
  author: '李白',
  dynasty: '唐',
  lines: ['床前明月光，', '疑是地上霜。', '举头望明月，', '低头思故乡。'],
};

const CULTURE_CARDS = [
  { emoji: '🏮', title: '传统节气', subtitle: '谷雨', desc: '春季最后一个节气，雨生百谷' },
  { emoji: '🎭', title: '今日典故', subtitle: '程门立雪', desc: '尊师重道，虚心求学' },
  { emoji: '🖌️', title: '汉字溯源', subtitle: '道', desc: '从首从辶，本义为道路引申为规律' },
  { emoji: '🎵', title: '古乐欣赏', subtitle: '高山流水', desc: '伯牙子期，知音难觅' },
];

const BANNERS = [
  { title: '经史子集 · 国学经典', subtitle: '千年智慧 一卷在手', color: 'from-amber-700 to-yellow-900' },
  { title: '唐诗宋词精读计划', subtitle: '每日一首 品味风雅', color: 'from-emerald-700 to-teal-800' },
  { title: '古文观止 · 名篇赏析', subtitle: '文以载道 字字珠玑', color: 'from-red-800 to-rose-900' },
];

const CATEGORIES = [
  { icon: MdEmojiEvents, label: '经典榜', color: 'text-amber-600 bg-amber-50' },
  { icon: MdCategory, label: '分类', color: 'text-blue-500 bg-blue-50' },
  { icon: MdCardGiftcard, label: '免费', color: 'text-emerald-500 bg-emerald-50' },
  { icon: MdAutoAwesome, label: '精选', color: 'text-purple-500 bg-purple-50' },
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

const GUESS_BOOKS = [
  { title: '传习录', author: '王阳明', desc: '知行合一，致良知，心学之集大成者' },
  { title: '浮生六记', author: '沈复', desc: '布衣菜饭，可乐终身，不必远游' },
  { title: '人间词话', author: '王国维', desc: '三种境界说，词学批评之巅峰' },
  { title: '梦溪笔谈', author: '沈括', desc: '中国科学史上的里程碑式著作' },
];

const HomePage = () => {
  const _ = useTranslation();
  useTheme({ systemUIVisible: true, appThemeColor: 'base-200' });
  const { safeAreaInsets } = useThemeStore();
  const tabBarPadding = useTabBarPadding();
  const [bannerIndex, setBannerIndex] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(() => new Date().getDate() % DAILY_QUOTES.length);

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
      {/* Header */}
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
        {/* Banner */}
        <div className='relative overflow-hidden rounded-xl'>
          <div
            className={`bg-gradient-to-br ${BANNERS[bannerIndex]!.color} flex h-36 flex-col justify-end p-4 text-white`}
          >
            <h2 className='text-xl font-bold'>{BANNERS[bannerIndex]!.title}</h2>
            <p className='mt-1 text-sm text-white/80'>{BANNERS[bannerIndex]!.subtitle}</p>
          </div>
          <div className='absolute bottom-2 right-3 flex gap-1'>
            {BANNERS.map((_b, i) => (
              <button
                key={i}
                onClick={() => setBannerIndex(i)}
                className={`h-1.5 rounded-full transition-all ${i === bannerIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/50'}`}
              />
            ))}
          </div>
        </div>

        {/* Daily Classic Quote */}
        <section className='bg-base-100 relative overflow-hidden rounded-xl p-4'>
          <div className='absolute -right-4 -top-4 text-[80px] leading-none text-amber-100/50'>
            <MdFormatQuote />
          </div>
          <div className='mb-2 flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <span className='rounded bg-amber-700 px-1.5 py-0.5 text-[10px] font-bold text-white'>
                {_('每日经典')}
              </span>
              <span className='text-base-content/30 text-xs'>{todayDate}</span>
            </div>
            <button
              onClick={() => setQuoteIndex((prev) => (prev + 1) % DAILY_QUOTES.length)}
              className='text-base-content/40 flex items-center gap-0.5 text-xs'
            >
              <MdRefresh className='text-sm' />
              {_('换一句')}
            </button>
          </div>
          <p className='text-base-content relative z-10 my-2 text-lg font-serif leading-relaxed'>
            「{DAILY_QUOTES[quoteIndex]!.text}」
          </p>
          <p className='text-base-content/50 text-xs'>
            —— {DAILY_QUOTES[quoteIndex]!.author}
            <span className='text-base-content/30 ml-1'>{DAILY_QUOTES[quoteIndex]!.source}</span>
          </p>
        </section>

        {/* Category Icons */}
        <div className='flex justify-around'>
          {CATEGORIES.map((cat) => (
            <button key={cat.label} className='flex flex-col items-center gap-1'>
              <div className={`flex h-12 w-12 items-center justify-center rounded-full ${cat.color}`}>
                <cat.icon className='text-2xl' />
              </div>
              <span className='text-base-content/80 text-xs'>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Poem of the Day */}
        <section className='bg-base-100 rounded-xl p-4'>
          <div className='mb-3 flex items-center justify-between'>
            <h2 className='text-base font-semibold'>{_('诗词日历')}</h2>
            <span className='text-base-content/30 text-xs'>{_('每日一首')}</span>
          </div>
          <div className='flex gap-4'>
            <div className='flex flex-col items-center justify-center rounded-lg bg-amber-700 px-3 py-2 text-white'>
              <span className='text-[10px] text-white/70'>{POEM_OF_DAY.dynasty}</span>
              <span className='text-lg font-bold'>{_('诗')}</span>
            </div>
            <div className='flex-1'>
              <div className='mb-1 flex items-baseline gap-2'>
                <h3 className='text-base-content text-sm font-semibold'>{POEM_OF_DAY.title}</h3>
                <span className='text-base-content/40 text-xs'>
                  [{POEM_OF_DAY.dynasty}] {POEM_OF_DAY.author}
                </span>
              </div>
              <p className='text-base-content/70 text-sm font-serif leading-relaxed'>
                {POEM_OF_DAY.lines.join('')}
              </p>
            </div>
          </div>
        </section>

        {/* Culture Cards */}
        <section>
          <h2 className='mb-2 text-base font-semibold'>{_('文化长廊')}</h2>
          <div className='-mx-4 flex gap-3 overflow-x-auto px-4 pb-1'>
            {CULTURE_CARDS.map((card) => (
              <div
                key={card.title}
                className='bg-base-100 flex w-36 flex-shrink-0 flex-col items-start rounded-xl p-3 shadow-sm'
              >
                <span className='text-2xl'>{card.emoji}</span>
                <span className='text-base-content/40 mt-1 text-[10px]'>{card.title}</span>
                <h3 className='text-base-content text-sm font-semibold'>{card.subtitle}</h3>
                <p className='text-base-content/50 mt-0.5 line-clamp-2 text-xs'>{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Today's Recommendations - Horizontal Scroll */}
        <section>
          <div className='mb-2 flex items-center justify-between'>
            <h2 className='text-base font-semibold'>{_('今日推荐')}</h2>
            <button className='text-primary flex items-center text-xs'>
              {_('更多')}
              <MdChevronRight />
            </button>
          </div>
          <div className='-mx-4 flex gap-3 overflow-x-auto px-4 pb-2'>
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
        </section>

        {/* Hot Rankings */}
        <section>
          <div className='mb-2 flex items-center justify-between'>
            <h2 className='text-base font-semibold'>{_('热门榜单')}</h2>
            <button className='text-primary flex items-center text-xs'>
              {_('完整榜单')}
              <MdChevronRight />
            </button>
          </div>
          <div className='bg-base-100 divide-base-200 divide-y rounded-xl'>
            {RANKING_BOOKS.map((book, i) => (
              <div key={book.title} className='flex items-center gap-3 px-4 py-3'>
                <span
                  className={`w-5 text-center text-sm font-bold ${i < 3 ? 'text-primary' : 'text-base-content/30'}`}
                >
                  {i + 1}
                </span>
                <div className='bg-base-300 h-12 w-9 flex-shrink-0 rounded' />
                <div className='min-w-0 flex-1'>
                  <h3 className='text-base-content truncate text-sm font-medium'>{book.title}</h3>
                  <p className='text-base-content/50 text-xs'>
                    {book.author}
                    <span className='bg-base-200 text-base-content/40 ml-2 rounded px-1 py-0.5 text-[10px]'>
                      {book.tag}
                    </span>
                  </p>
                </div>
                <span className='text-base-content/30 flex-shrink-0 text-xs'>{book.readers}人读过</span>
              </div>
            ))}
          </div>
        </section>

        {/* Guess You Like - 2 Column Grid */}
        <section>
          <h2 className='mb-2 text-base font-semibold'>{_('猜你喜欢')}</h2>
          <div className='grid grid-cols-2 gap-3'>
            {GUESS_BOOKS.map((book) => (
              <div key={book.title} className='bg-base-100 rounded-xl p-3 shadow-sm'>
                <div className='bg-base-300 mb-2 flex aspect-[4/3] items-center justify-center rounded-lg'>
                  <span className='text-base-content/20 text-2xl'>📖</span>
                </div>
                <h3 className='text-base-content truncate text-sm font-medium'>{book.title}</h3>
                <p className='text-base-content/50 truncate text-xs'>{book.author}</p>
                <p className='text-base-content/40 mt-1 line-clamp-2 text-xs'>{book.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
