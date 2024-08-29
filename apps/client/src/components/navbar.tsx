import { memo, useState } from "react";
import useDeviceType from "@/lib/hooks/devicetype";
import { ModeToggle } from "./custom/mod-toggle";
import { Menu, X } from "lucide-react";

const Navbar = memo(() => {
  const isMobile = useDeviceType();
  return (
    <nav className=" h-16 w-full">
      {isMobile == "mobile" ? <MobileNavbar /> : <DesktopNavbar />}
    </nav>
  );
});

const MobileNavbar = () => {
  const [toggleNav, setToggleNav] = useState(false);
  return (
    <div className="md:hidden pt-7 flex justify-between items-center w-full h-full bg-popover p-5">
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
        <ul className="border-t-2 border-slate-500 absolute top-20 left-0 w-full bg-popover p-5 shadow-lg">
          <li className="py-2">link 1</li>
          <li className="py-2">link 2</li>
          <li className="py-2">link 3</li>
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
        <li>link 1</li>
        <li>link 1</li>
        <li>link 1</li>
      </ul>
      <div className="flex gap-5 justify-between items-center">
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
