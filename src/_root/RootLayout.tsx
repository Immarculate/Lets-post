import Buttombar from '@/components/shared/Buttombar';
import LeftSidebar from '@/components/shared/Leftsidebar';
import Topbar from '@/components/shared/Topbar';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className='w-full md:flex'>
      <Topbar />
      <LeftSidebar />

      <section className='flex flex-1 h-full'>
        <Outlet />
      </section>

      <Buttombar />
    </div>
  )
}

export default RootLayout