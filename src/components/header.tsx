import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar} from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/pro-light-svg-icons';
import Logo from "./logo";

type HeaderProps = {
  text: string;
}

const Header = (props: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth={`2xl`}>
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
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[20rem] h-10",
            mainWrapper: "h-full w-full",
            input: "text-small",
            inputWrapper: "h-full w-full border font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Search..."
          size="sm"
          radius="full"
          startContent={<FontAwesomeIcon icon={faSearch} className="w-4" />}
          type="search"
        />
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
          <Link color="foreground" href="/search" className="font-bold">
            Search
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