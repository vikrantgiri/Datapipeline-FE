import MainLayout from "../layout/MainLayout"
import { ListStart } from 'lucide-react';

const Dashboard = () => {
  return (
    <>
    <MainLayout>
         <div className="flex flex-row items-center justify-center">

    <h2>welcome to dashboard </h2>
    </div>
      <div className="flex flex-col items-center justify-center" >
       <ListStart />
    <p> Start over!</p>
      </div>
    </MainLayout>
   
    </>
  )
}

export default Dashboard