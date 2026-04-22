'use client';

import { useTheme } from '@/hooks/useTheme';
import { useTranslation } from '@/hooks/useTranslation';
import { useThemeStore } from '@/store/themeStore';
import { useTabBarPadding } from '@/components/BottomTabBar';

const HomePage = () => {
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
        <h1 className='text-lg font-bold'>{_('Home')}</h1>
      </header>

      <main
        className='space-y-4 p-4'
        style={{ paddingBottom: tabBarPadding }}
      >
        {/* Banner */}
        <div className='bg-base-100 flex h-40 items-center justify-center rounded-xl shadow-sm'>
          <span className='text-base-content/40 text-sm'>{_('Banner Area')}</span>
        </div>

        {/* Recommendations */}
        <section>
          <h2 className='mb-2 text-base font-semibold'>{_('Recommended')}</h2>
          <div className='grid grid-cols-3 gap-3'>
            {Array.from({ length: 6 }).map((_item, i) => (
              <div
                key={i}
                className='bg-base-100 flex aspect-[3/4] items-center justify-center rounded-lg shadow-sm'
              >
                <span className='text-base-content/30 text-xs'>{_('Book')}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Recently Read */}
        <section>
          <h2 className='mb-2 text-base font-semibold'>{_('Recently Read')}</h2>
          <div className='space-y-2'>
            {Array.from({ length: 3 }).map((_item, i) => (
              <div
                key={i}
                className='bg-base-100 flex h-20 items-center rounded-lg px-4 shadow-sm'
              >
                <div className='bg-base-300 mr-3 h-14 w-10 rounded' />
                <div className='flex-1 space-y-1'>
                  <div className='bg-base-300 h-3 w-3/4 rounded' />
                  <div className='bg-base-300 h-2 w-1/2 rounded' />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
