import { Link } from "react-router-dom";
import { HomeIcon } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-[#64b5f6] text-white p-6 flex justify-between">
      <h1 className="text-xl font-bold">HashRoot</h1>
      <nav className="space-x-4">
        <Link to="/" className=" flex flex-row gap-2 hover:text-blue-600">
          <HomeIcon size={20} />
          Home
        </Link>
      </nav>
    </header>
  );
};

export default Header;
