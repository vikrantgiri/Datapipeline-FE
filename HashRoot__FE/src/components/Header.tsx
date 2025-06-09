import { Link } from "react-router-dom";
import { HomeIcon } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-[#0582ca] text-white p-6 flex justify-between">
      <h1 className="text-xl font-bold">HashRoot</h1>
      <nav className="space-x-4">
        <Link to="/" className=" flex flex-row gap-2 hover:[#A7E3E0]">
          <HomeIcon size={20} />
          Home
        </Link>
      </nav>
    </header>
  );
};

export default Header;
