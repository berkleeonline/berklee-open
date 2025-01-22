import React from "react";
import { Link } from "@heroui/react";
import Logo from "./logo";

const Footer = () => {
 return (
<footer className="bg-white border-t border-gray-200">
 <div className="px-6 max-w-[1536px] mx-auto py-6">
   <div className="flex flex-col md:flex-row md:justify-between items-center">
     <div className="flex space-x-8 mb-6 md:mb-0">
       <Link href="/privacy" className="text-sm text-gray-800 hover:underline">Privacy</Link>
       <Link href="/terms" className="text-sm text-gray-800 hover:underline">Terms</Link>
       <Link href="/cookies" className="text-sm text-gray-800 hover:underline">Cookies</Link>
     </div>
     <p className="text-sm text-gray-800">&copy; {new Date().getFullYear()} Berklee College of Music</p>
   </div>
 </div>
</footer>
 );
};

export default Footer;