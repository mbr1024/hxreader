import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, cleanup, fireEvent } from '@testing-library/react';

const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));
vi.mock('@/hooks/useAppRouter', () => ({
  useAppRouter: () => ({ push: mockPush }),
}));
vi.mock('@/store/themeStore', () => ({
  useThemeStore: vi.fn(() => ({ safeAreaInsets: { top: 0, right: 0, bottom: 0, left: 0 } })),
}));
vi.mock('@/hooks/useTranslation', () => ({
  useTranslation: () => (key: string) => key,
}));
vi.mock('react-responsive', () => ({
  useMediaQuery: vi.fn(() => false),
}));

import { usePathname } from 'next/navigation';
import { useMediaQuery } from 'react-responsive';
import BottomTabBar from '@/components/BottomTabBar';

afterEach(() => {
  cleanup();
  mockPush.mockClear();
});

describe('BottomTabBar', () => {
  it('renders all 5 tabs with correct labels', () => {
    vi.mocked(usePathname).mockReturnValue('/home');
    const { getByText } = render(<BottomTabBar />);
    expect(getByText('Home')).toBeTruthy();
    expect(getByText('Reading')).toBeTruthy();
    expect(getByText('Community')).toBeTruthy();
    expect(getByText('Video')).toBeTruthy();
    expect(getByText('My')).toBeTruthy();
  });

  it('highlights the correct tab based on pathname', () => {
    vi.mocked(usePathname).mockReturnValue('/library');
    const { getByText } = render(<BottomTabBar />);
    const readingButton = getByText('Reading').closest('button');
    expect(readingButton?.className).toContain('text-primary');
    const homeButton = getByText('Home').closest('button');
    expect(homeButton?.className).toContain('text-base-content/60');
  });

  it('returns null when pathname starts with /reader', () => {
    vi.mocked(usePathname).mockReturnValue('/reader/some-book');
    const { container } = render(<BottomTabBar />);
    expect(container.innerHTML).toBe('');
  });

  it('returns null when pathname starts with /auth', () => {
    vi.mocked(usePathname).mockReturnValue('/auth');
    const { container } = render(<BottomTabBar />);
    expect(container.innerHTML).toBe('');
  });

  it('returns null on desktop viewport', () => {
    vi.mocked(usePathname).mockReturnValue('/home');
    vi.mocked(useMediaQuery).mockReturnValue(true);
    const { container } = render(<BottomTabBar />);
    expect(container.innerHTML).toBe('');
    vi.mocked(useMediaQuery).mockReturnValue(false);
  });

  it('calls router.push with correct path when a tab is clicked', () => {
    vi.mocked(usePathname).mockReturnValue('/home');
    const { getByText } = render(<BottomTabBar />);
    fireEvent.click(getByText('Community'));
    expect(mockPush).toHaveBeenCalledWith('/community');
  });

  it('matches root path as home tab', () => {
    vi.mocked(usePathname).mockReturnValue('/');
    const { getByText } = render(<BottomTabBar />);
    const homeButton = getByText('Home').closest('button');
    expect(homeButton?.className).toContain('text-primary');
  });
});
