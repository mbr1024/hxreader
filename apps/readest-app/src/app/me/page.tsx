'use client';

import {
  MdMenuBook,
  MdHistory,
  MdStarOutline,
  MdEditNote,
  MdChatBubbleOutline,
  MdCloudDownload,
  MdPalette,
  MdTune,
  MdNotificationsNone,
  MdManageAccounts,
  MdInfoOutline,
  MdChevronRight,
  MdLogout,
} from 'react-icons/md';
import { useTheme } from '@/hooks/useTheme';
import { useTranslation } from '@/hooks/useTranslation';
import { useThemeStore } from '@/store/themeStore';
import { useTabBarPadding } from '@/components/BottomTabBar';
import { useAppRouter } from '@/hooks/useAppRouter';
import { IconType } from 'react-icons';

interface MenuItem {
  icon: IconType;
  label: string;
  color: string;
  href?: string;
}

const FEATURE_MENUS: MenuItem[] = [
  { icon: MdMenuBook, label: '我的书架', color: 'text-amber-700 bg-amber-50', href: '/library' },
  { icon: MdHistory, label: '阅读记录', color: 'text-emerald-600 bg-emerald-50' },
  { icon: MdStarOutline, label: '我的收藏', color: 'text-red-700 bg-red-50' },
  { icon: MdEditNote, label: '读书笔记', color: 'text-purple-600 bg-purple-50' },
  { icon: MdChatBubbleOutline, label: '我的评论', color: 'text-cyan-600 bg-cyan-50' },
  { icon: MdCloudDownload, label: '离线古籍', color: 'text-stone-600 bg-stone-50' },
];

const SETTINGS_MENUS: MenuItem[] = [
  { icon: MdPalette, label: '主题设置', color: 'text-indigo-500 bg-indigo-50' },
  { icon: MdTune, label: '阅读设置', color: 'text-teal-500 bg-teal-50' },
  { icon: MdNotificationsNone, label: '消息通知', color: 'text-orange-500 bg-orange-50' },
  { icon: MdManageAccounts, label: '账号管理', color: 'text-blue-500 bg-blue-50', href: '/user' },
  { icon: MdInfoOutline, label: '关于', color: 'text-gray-500 bg-gray-50' },
];

const STATS = [
  { value: '56', label: '关注' },
  { value: '2.3千', label: '粉丝' },
  { value: '1.8万', label: '获赞' },
];

const MePage = () => {
  const _ = useTranslation();
  useTheme({ systemUIVisible: true, appThemeColor: 'base-200' });
  const { safeAreaInsets } = useThemeStore();
  const tabBarPadding = useTabBarPadding();
  const router = useAppRouter();

  const handleMenuClick = (item: MenuItem) => {
    if (item.href) {
      router.push(item.href);
    }
  };

  return (
    <div className='bg-base-200 min-h-screen' style={{ paddingTop: safeAreaInsets?.top ?? 0 }}>
      <main className='space-y-3 p-4' style={{ paddingBottom: tabBarPadding }}>
        {/* User Card */}
        <div className='bg-base-100 rounded-2xl p-5'>
          <div className='flex items-center gap-4'>
            <div className='bg-primary/10 flex h-16 w-16 items-center justify-center rounded-full'>
              <span className='text-3xl'>👤</span>
            </div>
            <div className='flex-1'>
              <div className='flex items-center gap-2'>
                <h2 className='text-base-content text-lg font-bold'>{_('国学研习者')}</h2>
                <span className='rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-2 py-0.5 text-[10px] font-medium text-white'>
                  VIP
                </span>
              </div>
              <p className='text-base-content/50 mt-0.5 text-sm'>{_('博学之 审问之 慎思之 明辨之 笃行之')}</p>
            </div>
            <MdChevronRight className='text-base-content/30 text-2xl' />
          </div>

          {/* Stats Row */}
          <div className='mt-4 flex border-t border-base-200 pt-4'>
            {STATS.map((stat) => (
              <div key={stat.label} className='flex flex-1 flex-col items-center'>
                <span className='text-base-content text-lg font-bold'>{stat.value}</span>
                <span className='text-base-content/50 text-xs'>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reading Stats Card */}
        <div className='bg-base-100 rounded-2xl p-4'>
          <div className='flex items-center justify-between'>
            <h3 className='text-base-content text-sm font-semibold'>{_('阅读统计')}</h3>
            <button className='text-primary text-xs'>{_('查看详情')}</button>
          </div>
          <div className='mt-3 flex gap-4'>
            <div className='bg-base-200 flex-1 rounded-xl p-3 text-center'>
              <p className='text-primary text-xl font-bold'>236</p>
              <p className='text-base-content/50 text-xs'>{_('研读时长')}</p>
            </div>
            <div className='bg-base-200 flex-1 rounded-xl p-3 text-center'>
              <p className='text-emerald-500 text-xl font-bold'>47</p>
              <p className='text-base-content/50 text-xs'>{_('通读篇目')}</p>
            </div>
            <div className='bg-base-200 flex-1 rounded-xl p-3 text-center'>
              <p className='text-amber-500 text-xl font-bold'>1.2k</p>
              <p className='text-base-content/50 text-xs'>{_('批注笔记')}</p>
            </div>
          </div>
        </div>

        {/* Feature Menus */}
        <div className='bg-base-100 divide-base-200 divide-y rounded-2xl'>
          {FEATURE_MENUS.map((item) => (
            <MenuRow key={item.label} item={item} onClick={() => handleMenuClick(item)} />
          ))}
        </div>

        {/* Settings Menus */}
        <div className='bg-base-100 divide-base-200 divide-y rounded-2xl'>
          {SETTINGS_MENUS.map((item) => (
            <MenuRow key={item.label} item={item} onClick={() => handleMenuClick(item)} />
          ))}
        </div>

        {/* Logout */}
        <button className='bg-base-100 text-base-content/60 w-full rounded-2xl py-3.5 text-center text-sm font-medium'>
          <span className='flex items-center justify-center gap-1'>
            <MdLogout className='text-lg' />
            {_('退出登录')}
          </span>
        </button>
      </main>
    </div>
  );
};

const MenuRow = ({ item, onClick }: { item: MenuItem; onClick: () => void }) => (
  <button onClick={onClick} className='flex w-full items-center gap-3 px-4 py-3.5'>
    <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${item.color}`}>
      <item.icon className='text-lg' />
    </div>
    <span className='text-base-content flex-1 text-left text-sm'>{item.label}</span>
    <MdChevronRight className='text-base-content/20 text-xl' />
  </button>
);

export default MePage;
