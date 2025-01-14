// components/account/AccountSettingsLayout.jsx
import { Link } from "@nextui-org/react";

const AccountSettingsLayout = ({ children, currentPage }) => {
  const navItems = [
    { href: "/account/email", label: "Edit Email" },
    { href: "/account/username", label: "Edit Username" },
    { href: "/account/password", label: "Edit Password" },
    { href: "/account/delete", label: "Delete Account", className: "text-red-600" }
  ];

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Left Navigation Column */}
        <nav className="md:col-span-1">
          <div className="space-y-2 sticky top-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block p-3 rounded-lg text-black-700 ${
                  currentPage === item.href
                    ? "underline font-semibold text-black-700 underline-offset-2"
                    : "hover:bg-gray-50"
                } ${item.className || ""}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Right Content Column */}
        <main className="md:col-span-3">
          <div className="p-6 bg-white rounded-lg shadow">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AccountSettingsLayout;