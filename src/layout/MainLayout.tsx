import Header from '../components/Header'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

const MainLayout: React.FC = () => {
  return (
    <div className='flex flex-col justify-between h-screen w-full bg-gray-800'>
      <Header />
      <div className='flex h-full w-full px-4'>
        <Sidebar />
        <div className='p-10 w-full h-full rounded-xl bg-white overflow-hidden'>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout
