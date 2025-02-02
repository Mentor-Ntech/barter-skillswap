import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Home, FileText, Users, AlertTriangle, Star, DollarSign, Menu, X, LogOut } from "lucide-react";

const navItems = [
  { name: "Overview", icon: Home, path: "/dashboard" },
  { name: "Listings", icon: FileText, path: "/listings" },
  { name: "Requests", icon: Users, path: "/requests" },
  { name: "Disputes", icon: AlertTriangle, path: "/disputes" },
  { name: "Reputation", icon: Star, path: "/reputation" },
  { name: "Agreement", icon: Star, path: "/agreement" },
  { name: "Escrow", icon: DollarSign, path: "/escrow" },
];

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-gray-900 text-white transition-all duration-300 ease-in-out shadow-lg ${
          sidebarOpen ? "w-72" : "w-24"
        } lg:w-72 fixed h-full flex flex-col justify-between p-4`}
      >
        <div className="flex items-center justify-between">
          <Link
            to="/dashboard"
            className={`text-3xl font-bold transition-opacity duration-300 ${
              sidebarOpen ? "opacity-100" : "opacity-0 lg:opacity-100"
            }`}
          >
            SkillExchange
          </Link>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-white">
            {sidebarOpen ? <X size={36} /> : <Menu size={36} />}
          </button>
        </div>
        <nav className="mt-6 flex-1">
          <ul>
            {navItems.map((item) => (
              <li key={item.name} className="mb-4">
                <Link
                  to={item.path}
                  className={`flex items-center px-6 py-4 text-lg font-bold rounded-lg transition-colors duration-200 shadow-sm ${
                    location.pathname === item.path
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-blue-600 hover:text-white"
                  }`}
                >
                  <item.icon className="w-9 h-9" />
                  <span className={`ml-5 transition-opacity duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0 lg:opacity-100"}`}>
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <button className="flex items-center text-gray-300 hover:text-white transition-colors duration-200 text-lg font-bold">
            <LogOut className="w-9 h-9" />
            <span className={`ml-5 transition-opacity duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0 lg:opacity-100"}`}>
              Logout
            </span>
          </button>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 ml-24 lg:ml-72 overflow-y-auto">
        <header className="bg-white shadow-md sticky top-0 z-10 py-6 px-8 flex justify-between items-center">
          <h2 className="text-4xl font-bold text-gray-800">
            {navItems.find((item) => item.path === location.pathname)?.name || "Dashboard"}
          </h2>
          <div className="flex items-center space-x-6">
          <appkit-account-button/>
            {/* <img src="/placeholder-avatar.jpg" alt="User Avatar" className="w-14 h-14 rounded-full border-2 border-gray-400" /> */}
          </div>
        </header>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
