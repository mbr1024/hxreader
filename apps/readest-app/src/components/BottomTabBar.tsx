'use client';

import { usePathname } from 'next/navigation';
import { useMediaQuery } from 'react-responsive';
import {
  MdHome,
  MdOutlineHome,
  MdMenuBook,
  MdOutlineMenuBook,
  MdForum,
  MdOutlineForum,
  MdVideoLibrary,
  MdOutlineVideoLibrary,
  MdPerson,
  MdOutlinePersonOutline,
} from 'react-icons/md';
import { useThemeStore } from '@/store/themeStore';
import { useTranslation } from '@/hooks/useTranslation';
import { useAppRouter } from '@/hooks/useAppRouter';

export const TAB_BAR_HEIGHT = 56;

export const useTabBarPadding = () => {
  const { safeAreaInsets } = useThemeStore();
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  if (isDesktop) return 0;
  return TAB_BAR_HEIGHT + (safeAreaInsets?.bottom ?? 0);
};

interface TabItem {
  key: string;
  label: string;
  path: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  match: (pathname: string) => boolean;
}

const HIDDEN_PATHS = ['/reader', '/auth', '/updater', '/offline'];

const BottomTabBar = () => {
  const rawPathname = usePathname();
  const router = useAppRouter();
  const { safeAreaInsets } = useThemeStore();
  const _ = useTranslation();
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  const tabs: TabItem[] = [
    {
      key: 'home',
      label: _('Home'),
      path: '/home',
      icon: <MdOutlineHome />,
      activeIcon: <MdHome />,
      match: (p) => p === '/home' || p === '/',
    },
    {
      key: 'library',
      label: _('Reading'),
      path: '/library',
      icon: <MdOutlineMenuBook />,
      activeIcon: <MdMenuBook />,
      match: (p) => p.startsWith('/library'),
    },
    {
      key: 'community',
      label: _('Community'),
      path: '/community',
      icon: <MdOutlineForum />,
      activeIcon: <MdForum />,
      match: (p) => p.startsWith('/community'),
    },
    {
      key: 'video',
      label: _('Video'),
      path: '/video',
      icon: <MdOutlineVideoLibrary />,
      activeIcon: <MdVideoLibrary />,
      match: (p) => p.startsWith('/video'),
    },
    {
      key: 'profile',
      label: _('My'),
      path: '/me',
      icon: <MdOutlinePersonOutline />,
      activeIcon: <MdPerson />,
      match: (p) => p.startsWith('/me'),
    },
  ];

  if (isDesktop) return null;
  if (!rawPathname || HIDDEN_PATHS.some((p) => rawPathname.startsWith(p))) return null;

  const pathname = rawPathname;

  return (
    <nav
      className='bg-base-100 border-base-300 fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t'
      style={{
        height: TAB_BAR_HEIGHT + (safeAreaInsets?.bottom ?? 0),
        paddingBottom: safeAreaInsets?.bottom ?? 0,
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab.match(pathname);
        return (
          <button
            key={tab.key}
            onClick={() => router.push(tab.path)}
            className={`flex flex-1 flex-col items-center justify-center gap-0.5 py-1 transition-colors ${
              isActive ? 'text-primary' : 'text-base-content/60'
            }`}
          >
            <span className='text-[22px]'>{isActive ? tab.activeIcon : tab.icon}</span>
            <span className='text-[10px] leading-tight'>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomTabBar;
