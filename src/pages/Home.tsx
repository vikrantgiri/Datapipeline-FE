// import { useState } from 'react';
import AuthForm from '../components/AuthForm';
import authImage from '../assets/auth-image3.webp';

const Home = () => {
  // const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex">
     
      <div className="hidden md:flex w-1/2 items-center justify-center bg-gray-100">
        <img
          src={authImage}
          alt="Auth"
          className="w-full h-full object-cover"
        />
      </div>

     
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <AuthForm  />
      </div>
    </div>
  );
};

export default Home;
