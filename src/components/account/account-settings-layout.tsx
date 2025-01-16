// components/account/AccountSettingsLayout.jsx
import { Link } from "@nextui-org/react";
import ProfileHeader from './profile-header';

const AccountSettingsLayout = ({ children, currentPage }) => {
  const navItems = [
    { href: "/account/email", label: "Edit Email" },
    { href: "/account/password", label: "Update Password" },
    { href: "/account/delete", label: "Delete Account", className: "border-t-1 text-red-600" }
  ];

  return (
    <div className="container mx-auto px-4 max-w-[1040px]">
      <div className="container mx-auto px-4 flex items-start justify-center mb-16">
        <ProfileHeader isDashboard={false} isAccountPage={true} client:load />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Left Navigation Column */}
        <nav className="md:col-span-1">
          <div className="space-y-2 sticky top-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block p-4 text-black-300 ${
                  currentPage === item.href
                    ? "font-semibold bg-slate-100 p-4 rounded-lg text-black-700"
                    : "hover:bg-gray-50 rounded-lg"
                } ${item.className || ""}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Right Content Column */}
        <main className="md:col-span-3">
          <div className="p-3 bg-white">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AccountSettingsLayout;