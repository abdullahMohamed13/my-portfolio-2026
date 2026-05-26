import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {  useState } from "react";
import { navItems } from '@/data/nav-items';
import { socialMedia } from "@/data/social-media";
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';

function Header() {
    const [popoverOpen, setPopoverOpen] = useState<boolean>(false);

    return <header className="p-3 flex bg-transparent items-center justify-between">

      {/* Mobile navigation */}
      <nav className="fixed top-0 left-0 w-full z-100 px-3 py-4 backdrop-blur-2xl flex justify-between items-center md:hidden overflow-x-clip isolate">
        <div className="flex items-center justify-end gap-2.5">
            {socialMedia.slice(0, 3).map((item) => {
                return (
                    <a key={item.id} title={item.name} href={item.href} target="_blank" rel="noopener noreferrer">
                        <img src={item.image} alt={item.name} className="w-8 h-8 sm:w-10 sm:h-10" />
                    </a>
                );
            })}
        </div>
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger>
                    <MenuToggleIcon open={popoverOpen} className="w-8 h-8 cursor-pointer" stroke="currentColor" />
                </PopoverTrigger>
              <PopoverContent className="flex flex-col gap-4.5 py-3 pl-3 -pb-5 z-2001">
                  {navItems.map((item, key) => {
                      return <div className='w-full flex items-center gap-2.5' key={key} onClick={() => {
                          item.onClick();
                          setPopoverOpen(false);
                          document.body.focus();
                      }}>
                          {item.icon} <span className={`${item.label === 'Resume' && 'text-primary'}`}>{item.label}</span>
                      </div>
                  })}
              </PopoverContent>
          </Popover>
      </nav>
      
      {/* Desktop Navigation */}
      <>
          <div className="hidden md:flex items-center justify-end sm:justify-center gap-2">
              {socialMedia.slice(0, 3).map((item) => {
                  return (
                      <a key={item.id} title={item.name} href={item.href} target="_blank" rel="noopener noreferrer">
                          <img src={item.image} alt={item.name} className="w-10 h-10 md:w-8 md:h-8" />
                      </a>
                  );
              })}
          </div>
          <div className="hidden md:flex gap-4 justify-end p-2 *:cursor-pointer *:hover:underline">
              {navItems.slice(1).map((item, key) => {
                  return <div key={key} className={`${item.label === 'Resume' && 'hover:text-primary'}`}
                  onClick={item.onClick}>{item.label === 'Resume' ? '/Resume' : `#${item.label}`}</div>
              })}
          </div>
      </>
        
    </header>;
}

export default Header;