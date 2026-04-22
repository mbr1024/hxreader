'use client';

import { useTheme } from '@/hooks/useTheme';
import { useTranslation } from '@/hooks/useTranslation';
import { useThemeStore } from '@/store/themeStore';
import { useTabBarPadding } from '@/components/BottomTabBar';

const CommunityPage = () => {
  const _ = useTranslation();
  useTheme({ systemUIVisible: true, appThemeColor: 'base-200' });
  const { safeAreaInsets } = useThemeStore();
  const tabBarPadding = useTabBarPadding();

  return (
    <div
      className='bg-base-200 min-h-screen'
      style={{ paddingTop: safeAreaInsets?.top ?? 0 }}
    >
      <header className='bg-base-100 px-4 py-3'>
        <h1 className='text-lg font-bold'>{_('Community')}</h1>
      </header>

      <main
        className='space-y-3 p-4'
        style={{ paddingBottom: tabBarPadding }}
      >
        {/* Feed placeholder */}
        {Array.from({ length: 5 }).map((_item, i) => (
          <article
            key={i}
            className='bg-base-100 rounded-xl p-4 shadow-sm'
          >
            <div className='mb-3 flex items-center gap-2'>
              <div className='bg-base-300 h-8 w-8 rounded-full' />
              <div className='space-y-1'>
                <div className='bg-base-300 h-3 w-20 rounded' />
                <div className='bg-base-300 h-2 w-14 rounded' />
              </div>
            </div>
            <div className='space-y-1.5'>
              <div className='bg-base-300 h-3 w-full rounded' />
              <div className='bg-base-300 h-3 w-5/6 rounded' />
              <div className='bg-base-300 h-3 w-2/3 rounded' />
            </div>
            <div className='text-base-content/40 mt-3 flex gap-6 text-xs'>
              <span>{_('Like')}</span>
              <span>{_('Comment')}</span>
              <span>{_('Share')}</span>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
};

export default CommunityPage;
