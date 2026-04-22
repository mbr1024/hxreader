'use client';

import { useTheme } from '@/hooks/useTheme';
import { useTranslation } from '@/hooks/useTranslation';
import { useThemeStore } from '@/store/themeStore';
import { useTabBarPadding } from '@/components/BottomTabBar';

const VideoPage = () => {
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
        <h1 className='text-lg font-bold'>{_('Video')}</h1>
      </header>

      <main
        className='p-4'
        style={{ paddingBottom: tabBarPadding }}
      >
        <div className='grid grid-cols-2 gap-3'>
          {Array.from({ length: 6 }).map((_item, i) => (
            <div
              key={i}
              className='bg-base-100 overflow-hidden rounded-xl shadow-sm'
            >
              <div className='bg-base-300 flex aspect-video items-center justify-center'>
                <span className='text-base-content/30 text-2xl'>&#9654;</span>
              </div>
              <div className='space-y-1 p-2'>
                <div className='bg-base-300 h-3 w-full rounded' />
                <div className='bg-base-300 h-2 w-2/3 rounded' />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default VideoPage;
