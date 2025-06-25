import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const MainLayout: React.FC = () => {
  return (
    <div className='flex flex-col min-h-screen w-full'>
      <Header />
      <div className='flex w-full'>
        <Sidebar />
        <div className='p-4 w-full h-full'>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout
