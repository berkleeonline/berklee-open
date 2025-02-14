import React, { useState, useEffect } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu} from "@heroui/react";
import { Authenticator } from '@aws-amplify/ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPianoKeyboard, faChevronDown } from '@fortawesome/pro-light-svg-icons';
import { MetronomeIcon } from "../elements/MetronomeIcon";
import { Keyboard } from "./music/keyboard/keyboard";
import { Metronome } from "./metronome";
import Logo from "./logo";
import AccountHeader from "./account/header";



const Header = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [isMetronomeOpen, setIsMetronomeOpen] = useState(false);


  const menuItems = [
    {
      label: "Modules",
      href: "/modules"
    },
    {
      label: "Units",
      href: "/units"
    },
    {
      label: "Lessons",
      href: "/lessons"
    },
    {
      label: "Practice Tools",
      href: "/practice-tools"
    },
    {
      label: "Log Out",
      href: "/logout"  // or whatever your logout path is
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const handleMetronomeClick = () => {
    setIsMetronomeOpen(true);
  };

  const icons = {
    metronome: <MetronomeIcon />
  };

  useEffect(() => {
    const handlePianoToggle = () => {
        setShowKeyboard(false);
    };
    
    document.addEventListener('togglePiano', handlePianoToggle);
    return () => document.removeEventListener('togglePiano', handlePianoToggle);
  }, []);

  return (
    <>
      <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="2xl">
        <Authenticator.Provider>
        <NavbarContent justify="start" className="justify-items-start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <Link color="foreground" href="/" className="mr-4">
              <Logo />
            </Link>
          </NavbarBrand>
          <form onSubmit={handleSearch} className="flex items-center w-full">
            <Input
              classNames={{
                base: "max-w-full sm:max-w-[20rem] h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20 rounded-full",
              }}
              placeholder="Search..."
              size="sm"
              startContent={<FontAwesomeIcon icon={faSearch} className="text-default-400 w-4" />}
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4 items-right" justify="end">
          <NavbarItem>
            <Link color="foreground" href="/modules" className="font-bold">
              Modules
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/units" className="font-bold">
              Units
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/lessons" className="font-bold">
              Lessons
            </Link>
          </NavbarItem>
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent font-bold border-l pl-4 pr-4 practice-tools-toggle"
                  endContent={<FontAwesomeIcon icon={faChevronDown} />}
                  radius="sm"
                  variant="light"
                >
                  Practice Tools
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label="Practice Tools"
              className="w-[340px]"
              itemClasses={{
                base: "gap-4",
              }}
            >
  
            <DropdownItem
              key="metronome"
              description="Time is of the essence."
              startContent={<MetronomeIcon />}
              onPress={handleMetronomeClick}
            >
              <span className="font-bold">Metronome</span>
            </DropdownItem>
            <DropdownItem
                className="header-piano-toggle"
                key="piano"
                description="The right notes at your fingertips."
                startContent={<FontAwesomeIcon icon={faPianoKeyboard} className="font-bold h-[1.17rem]" />}
                onPress={() => setShowKeyboard(!showKeyboard)}
              >
                <span className="font-bold">Virtual Piano</span>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <AccountHeader />
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item.label}-${index}`}>
              <Link
                color="foreground"
                className="w-full"
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
        </Authenticator.Provider>
      </Navbar>
      <div>
        <Keyboard isVisible={showKeyboard}  />
      </div>
      <Metronome 
        isExpanded={isMetronomeOpen} 
        onExpandChange={setIsMetronomeOpen}
      />
      </>
  );
};

export default Header;