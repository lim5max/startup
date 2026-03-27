import { Outlet } from 'react-router-dom';
import { TabBar } from './TabBar';
import { TopNav } from './TopNav';
import { useIsMobile } from '../../hooks/useMediaQuery';

export function AppLayout() {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-dvh flex flex-col bg-bg">
      {!isMobile && <TopNav />}
      <main className="flex-1 w-full max-w-[712px] mx-auto px-4 py-4 pb-20 md:pb-4">
        <Outlet />
      </main>
      {isMobile && <TabBar />}
    </div>
  );
}
