import { memo, useState } from "react";
import useDeviceType from "@/lib/hooks/devicetype";
import { ModeToggle } from "./custom/mod-toggle";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = memo(() => {
  const isMobile = useDeviceType();

  return (
    <nav className=" h-16 w-full font">
      {isMobile == "mobile" ? <MobileNavbar /> : <DesktopNavbar />}
    </nav>
  );
});

const MobileNavbar = () => {
  const [toggleNav, setToggleNav] = useState(false);
  const handleToggle = () => {
    setToggleNav(false);
  };
  return (
    <div className="md:hidden pt-7 flex justify-between items-center w-full h-full bg-popover p-5 ">
      <div>loogo</div>
      <div className="flex gap-5 justify-between items-center">
        <ModeToggle />
        <div
          className="bg-transparent p-2 rounded-md cursor-pointer transition-all duration-300 ease-in-out hover:bg-slate-500/15"
          onClick={() => setToggleNav(!toggleNav)}
        >
          <Menu size={35} className="cursor-pointer" />
        </div>
      </div>

      {toggleNav && (
        <ul className="border-t-2 flex justify-between flex-col items-center gap-4 border-slate-500 absolute top-20 left-0 w-full bg-popover p-5 shadow-lg">
          <SingleLink path="/" name="Home" handleToggle={handleToggle} />
          <SingleLink path="/about" name="About" handleToggle={handleToggle} />
          <SingleLink
            path="/auth/signin"
            name="Account"
            handleToggle={handleToggle}
          />

          <div
            className="mx-auto max-w-16 flex justify-center items-center bg-transparent p-2 rounded-md cursor-pointer transition-all duration-300 ease-in-out hover:bg-slate-500/15"
            onClick={() => setToggleNav(!toggleNav)}
          >
            <X size={30} className="cursor-pointer" />
          </div>
        </ul>
      )}
    </div>
  );
};

const DesktopNavbar = () => {
  return (
    <div className="hidden md:flex pt-7 justify-between items-center w-full h-full bg-popover p-5">
      <div>loogo</div>
      <ul className="flex justify-between items-center gap-5">
        <SingleLink path="/" name="Home" />
        <SingleLink path="/about" name="About" />
        <SingleLink path="/auth/signin" name="Account" />
      </ul>
      <div className="flex gap-5 justify-between items-center">
        <ModeToggle />
      </div>
    </div>
  );
};
type HandleToggle = () => void;

const SingleLink = ({
  handleToggle,
  name,
  path,
}: {
  handleToggle?: HandleToggle;
  name: string;
  path: string;
}) => {
  return (
    <li
      onClick={handleToggle}
      className="bg-transparent p-2 rounded-md cursor-pointer transition-all duration-300 ease-in-out hover:bg-slate-500/15"
    >
      <Link to={path}>{name}</Link>
    </li>
  );
};
export default Navbar;
