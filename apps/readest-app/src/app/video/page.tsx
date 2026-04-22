'use client';

import { useState } from 'react';
import { MdPlayArrow } from 'react-icons/md';
import { useTheme } from '@/hooks/useTheme';
import { useTranslation } from '@/hooks/useTranslation';
import { useThemeStore } from '@/store/themeStore';
import { useTabBarPadding } from '@/components/BottomTabBar';

const TABS = ['推荐', '热门', '经学', '诗词', '史学', '国艺'];

interface VideoItem {
  id: number;
  title: string;
  author: string;
  avatar: string;
  duration: string;
  views: string;
  danmaku: string;
  color: string;
}

const VIDEOS: VideoItem[] = [
  {
    id: 1,
    title: '《论语》精讲：孔子的人生智慧',
    author: '国学大讲堂',
    avatar: '🏛️',
    duration: '15:32',
    views: '236.4万',
    danmaku: '6842',
    color: 'from-amber-700 to-yellow-900',
  },
  {
    id: 2,
    title: '一口气读完《道德经》八十一章',
    author: '古典新说',
    avatar: '☯️',
    duration: '28:15',
    views: '189.7万',
    danmaku: '5156',
    color: 'from-emerald-700 to-teal-800',
  },
  {
    id: 3,
    title: '苏轼：被贬三千里，诗酒趁年华',
    author: '诗词中国',
    avatar: '🖌️',
    duration: '18:46',
    views: '315.3万',
    danmaku: '9821',
    color: 'from-red-800 to-rose-900',
  },
  {
    id: 4,
    title: '《史记》里的刺客列传：荆轲刺秦的真相',
    author: '史记讲坛',
    avatar: '⚔️',
    duration: '25:10',
    views: '267.8万',
    danmaku: '7234',
    color: 'from-stone-600 to-neutral-700',
  },
  {
    id: 5,
    title: '古文观止名篇：《滕王阁序》逐句精讲',
    author: '文言通',
    avatar: '📜',
    duration: '22:03',
    views: '173.2万',
    danmaku: '4876',
    color: 'from-purple-700 to-violet-800',
  },
  {
    id: 6,
    title: '李白与杜甫：盛唐双子星的诗歌人生',
    author: '唐风宋韵',
    avatar: '🌙',
    duration: '20:07',
    views: '195.6万',
    danmaku: '6102',
    color: 'from-cyan-700 to-blue-800',
  },
  {
    id: 7,
    title: '《庄子》寓言故事：庖丁解牛的养生之道',
    author: '道家智慧',
    avatar: '🎋',
    duration: '12:18',
    views: '142.1万',
    danmaku: '3453',
    color: 'from-green-700 to-emerald-800',
  },
  {
    id: 8,
    title: '王阳明心学入门：知行合一到底怎么理解？',
    author: '阳明书院',
    avatar: '💡',
    duration: '16:45',
    views: '208.9万',
    danmaku: '5567',
    color: 'from-amber-600 to-orange-700',
  },
  {
    id: 9,
    title: '《诗经》里的爱情：关关雎鸠的浪漫解读',
    author: '诗经研读社',
    avatar: '🌸',
    duration: '10:33',
    views: '156.4万',
    danmaku: '4432',
    color: 'from-pink-600 to-rose-700',
  },
  {
    id: 10,
    title: '《资治通鉴》中的帝王术：司马光的治国智慧',
    author: '鉴史明智',
    avatar: '📖',
    duration: '24:28',
    views: '182.3万',
    danmaku: '5789',
    color: 'from-indigo-700 to-blue-900',
  },
];

const VideoPage = () => {
  const _ = useTranslation();
  useTheme({ systemUIVisible: true, appThemeColor: 'base-100' });
  const { safeAreaInsets } = useThemeStore();
  const tabBarPadding = useTabBarPadding();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className='bg-base-200 min-h-screen' style={{ paddingTop: safeAreaInsets?.top ?? 0 }}>
      {/* Header with Tabs */}
      <header className='bg-base-100 sticky top-0 z-10'>
        <div className='-mx-1 flex items-center gap-1 overflow-x-auto px-3 py-2'>
          {TABS.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`flex-shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                activeTab === i
                  ? 'bg-primary text-primary-content'
                  : 'bg-base-200 text-base-content/60'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      {/* Video Grid */}
      <main className='grid grid-cols-2 gap-2 p-2' style={{ paddingBottom: tabBarPadding }}>
        {VIDEOS.map((video) => (
          <VideoCard key={video.id} video={video} _={_} />
        ))}
      </main>
    </div>
  );
};

const VideoCard = ({
  video,
  _: __,
}: {
  video: VideoItem;
  _: (key: string) => string;
}) => (
  <div className='bg-base-100 overflow-hidden rounded-xl'>
    {/* Thumbnail */}
    <div className={`relative flex aspect-video items-center justify-center bg-gradient-to-br ${video.color}`}>
      <MdPlayArrow className='text-4xl text-white/80' />
      {/* Duration Badge */}
      <span className='absolute bottom-1 right-1 rounded bg-black/70 px-1.5 py-0.5 text-[10px] text-white'>
        {video.duration}
      </span>
    </div>

    {/* Info */}
    <div className='flex gap-2 p-2'>
      {/* Avatar */}
      <div className='bg-base-200 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs'>
        {video.avatar}
      </div>
      {/* Text */}
      <div className='min-w-0 flex-1'>
        <h3 className='text-base-content line-clamp-2 text-xs font-medium leading-snug'>
          {video.title}
        </h3>
        <p className='text-base-content/40 mt-1 truncate text-[10px]'>
          {video.author} · {video.views}播放 · {video.danmaku}弹幕
        </p>
      </div>
    </div>
  </div>
);

export default VideoPage;
