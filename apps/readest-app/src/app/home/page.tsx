'use client';

import { useState } from 'react';
import {
  MdSearch,
  MdNotificationsNone,
  MdStarRate,
  MdEmojiEvents,
  MdCategory,
  MdCardGiftcard,
  MdAutoAwesome,
  MdChevronRight,
} from 'react-icons/md';
import { useTheme } from '@/hooks/useTheme';
import { useTranslation } from '@/hooks/useTranslation';
import { useThemeStore } from '@/store/themeStore';
import { useTabBarPadding } from '@/components/BottomTabBar';

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
