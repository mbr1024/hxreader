'use client';

import { useState } from 'react';
import {
  MdThumbUpOffAlt,
  MdChatBubbleOutline,
  MdShare,
  MdLocalFireDepartment,
} from 'react-icons/md';
import { useTheme } from '@/hooks/useTheme';
import { useTranslation } from '@/hooks/useTranslation';
import { useThemeStore } from '@/store/themeStore';
import { useTabBarPadding } from '@/components/BottomTabBar';

const TABS = ['推荐', '关注', '热榜'];

interface FeedItem {
  id: number;
  avatar: string;
  author: string;
  time: string;
  title: string;
  content: string;
  hasImage: boolean;
  likes: number;
  comments: number;
  type: 'post' | 'topic';
  topicName?: string;
  topicCount?: string;
}

const FEED_DATA: FeedItem[] = [
  {
    id: 1,
    avatar: '🏛️',
    author: '经学研习者',
    time: '3小时前',
    title: '《论语》中"学而时习之"的"习"究竟是什么意思？',
    content:
      '许多人将"习"简单理解为"复习"，但从古注来看，"习"更接近"践行"之意。朱熹《四书章句集注》云："习，鸟数飞也。"取反复练习、实践之义。孔子所说的"学"并非仅指读书，更是一种对道德修养的实践...',
    hasImage: false,
    likes: 2846,
    comments: 467,
    type: 'post',
  },
  {
    id: 10,
    avatar: '',
    author: '',
    time: '',
    title: '',
    content: '',
    hasImage: false,
    likes: 0,
    comments: 0,
    type: 'topic',
    topicName: '你最喜欢的一句古文是什么？',
    topicCount: '2.4万人参与',
  },
  {
    id: 2,
    avatar: '📜',
    author: '诗词格律社',
    time: '5小时前',
    title: '苏轼的《赤壁赋》为何能千古流传？',
    content:
      '"寄蜉蝣于天地，渺沧海之一粟。"苏轼在被贬黄州时写下此文，却没有怨天尤人，而是在江上秋风中悟出了"物与我皆无尽也"的旷达。这种将个人遭遇升华为哲学思辨的功力，正是苏轼文章超越时代的原因...',
    hasImage: true,
    likes: 4563,
    comments: 734,
    type: 'post',
  },
  {
    id: 3,
    avatar: '🎋',
    author: '竹林七贤后人',
    time: '昨天',
    title: '读《世说新语》：魏晋风度到底是什么？',
    content:
      '魏晋风度绝不是简单的放浪形骸。嵇康临刑前从容弹《广陵散》，谢安在淝水之战中下棋如常——这种"越名教而任自然"的超脱背后，是对生命本真的深刻追问。读《世说新语》，感受的是一种极致的审美人格...',
    hasImage: false,
    likes: 3201,
    comments: 528,
    type: 'post',
  },
  {
    id: 11,
    avatar: '',
    author: '',
    time: '',
    title: '',
    content: '',
    hasImage: false,
    likes: 0,
    comments: 0,
    type: 'topic',
    topicName: '古文名篇背诵打卡',
    topicCount: '1.8万人参与',
  },
  {
    id: 4,
    avatar: '⛩️',
    author: '道家文化研究',
    time: '昨天',
    title: '老子"道可道，非常道"是不是在故弄玄虚？',
    content:
      '这恰恰是老子最深刻的地方。第一个"道"是名词，指宇宙万物的终极规律；第二个"道"是动词，指用语言表述。老子开篇就说明了语言的局限性——真正的大道不可能被文字完全捕捉。这与维特根斯坦"不可说者必须保持沉默"异曲同工...',
    hasImage: false,
    likes: 5102,
    comments: 873,
    type: 'post',
  },
  {
    id: 5,
    avatar: '🖌️',
    author: '古典文学教习',
    time: '2天前',
    title: '庄子的"逍遥游"给现代人什么启示？',
    content:
      '"北冥有鱼，其名为鲲。"庄子用最瑰丽的想象告诉我们：所谓自由，不是无所依凭，而是找到与自己本性相合的"天地之正"。大鹏展翅九万里是逍遥，小鸟腾跃于蓬蒿之间亦是逍遥，关键是不被外物所累...',
    hasImage: true,
    likes: 2987,
    comments: 412,
    type: 'post',
  },
];

const formatCount = (n: number) => (n >= 10000 ? `${(n / 10000).toFixed(1)}万` : String(n));

const CommunityPage = () => {
  const _ = useTranslation();
  useTheme({ systemUIVisible: true, appThemeColor: 'base-100' });
  const { safeAreaInsets } = useThemeStore();
  const tabBarPadding = useTabBarPadding();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className='bg-base-200 min-h-screen' style={{ paddingTop: safeAreaInsets?.top ?? 0 }}>
      {/* Sticky Header + Tabs */}
      <header className='bg-base-100 sticky top-0 z-10'>
        <div className='flex items-center border-b border-base-200'>
          {TABS.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`relative flex-1 py-3 text-center text-sm font-medium transition-colors ${
                activeTab === i ? 'text-base-content' : 'text-base-content/50'
              }`}
            >
              {tab}
              {activeTab === i && (
                <span className='bg-primary absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full' />
              )}
            </button>
          ))}
        </div>
      </header>

      {/* Feed */}
      <main className='space-y-2 p-2 pt-2' style={{ paddingBottom: tabBarPadding }}>
        {FEED_DATA.map((item) =>
          item.type === 'topic' ? (
            <TopicCard key={item.id} name={item.topicName!} count={item.topicCount!} />
          ) : (
            <PostCard key={item.id} item={item} _={_} />
          ),
        )}
      </main>
    </div>
  );
};

const TopicCard = ({ name, count }: { name: string; count: string }) => (
  <div className='bg-base-100 flex items-center gap-3 rounded-xl px-4 py-3'>
    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-orange-50'>
      <MdLocalFireDepartment className='text-xl text-orange-500' />
    </div>
    <div className='flex-1'>
      <p className='text-base-content text-sm font-medium'>#{name}</p>
      <p className='text-base-content/40 text-xs'>{count}</p>
    </div>
    <span className='text-primary rounded-full border border-primary/30 px-3 py-1 text-xs'>
      参与
    </span>
  </div>
);

const PostCard = ({
  item,
  _,
}: {
  item: FeedItem;
  _: (key: string) => string;
}) => (
  <article className='bg-base-100 rounded-xl p-4'>
    {/* Author Row */}
    <div className='mb-2 flex items-center gap-2'>
      <div className='bg-base-200 flex h-8 w-8 items-center justify-center rounded-full text-sm'>
        {item.avatar}
      </div>
      <span className='text-base-content text-sm font-medium'>{item.author}</span>
      <span className='text-base-content/30 text-xs'>{item.time}</span>
    </div>

    {/* Title */}
    <h3 className='text-base-content mb-1 text-[15px] font-semibold leading-snug'>{item.title}</h3>

    {/* Content */}
    <p className='text-base-content/70 mb-2 line-clamp-3 text-sm leading-relaxed'>{item.content}</p>

    {/* Optional Image */}
    {item.hasImage && (
      <div className='bg-base-200 mb-2 flex aspect-[2/1] items-center justify-center rounded-lg'>
        <span className='text-base-content/20 text-3xl'>🖼️</span>
      </div>
    )}

    {/* Actions */}
    <div className='text-base-content/40 flex items-center gap-6 pt-1 text-xs'>
      <button className='flex items-center gap-1'>
        <MdThumbUpOffAlt className='text-base' />
        <span>{formatCount(item.likes)}</span>
      </button>
      <button className='flex items-center gap-1'>
        <MdChatBubbleOutline className='text-base' />
        <span>{formatCount(item.comments)}</span>
      </button>
      <button className='flex items-center gap-1'>
        <MdShare className='text-base' />
        <span>{_('分享')}</span>
      </button>
    </div>
  </article>
);

export default CommunityPage;
