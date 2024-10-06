import React, { useState } from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Input, Button} from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/pro-light-svg-icons';
import { Authenticator } from '@aws-amplify/ui-react';
import Logo from "./logo";

import AuthHeader from "./auth/header";

const Header = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="2xl">
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
        <form onSubmit={handleSearch} className="flex items-center">
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
        <NavbarItem>
          <Link color="foreground" href="/auth" className="font-bold">
            <Authenticator.Provider>
              <AuthHeader />
            </Authenticator.Provider>
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;

