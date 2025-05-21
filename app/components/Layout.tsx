import * as React from "react";
import { Link, NavLink, useLocation } from "@remix-run/react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userRole, setUserRole] = React.useState<"admin" | "teacher" | "student" | null>(null);

  // This would be replaced with actual auth logic
  React.useEffect(() => {
    // Mock authentication for now
    const mockAuth = localStorage.getItem("mockAuth");
    if (mockAuth) {
      setIsLoggedIn(true);
      setUserRole(JSON.parse(mockAuth).role);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            Schooly
          </Link>

          <NavigationMenu.Root className="relative">
            <NavigationMenu.List className="flex space-x-4">
              {isLoggedIn ? (
                <>
                  <NavigationMenu.Item>
                    <NavLink
                      to="/dashboard"
                      className={({ isActive }) =>
                        `px-3 py-2 rounded ${
                          isActive ? "bg-blue-700" : "hover:bg-blue-500"
                        }`
                      }
                    >
                      Dashboard
                    </NavLink>
                  </NavigationMenu.Item>

                  {(userRole === "admin" || userRole === "teacher") && (
                    <>
                      <NavigationMenu.Item>
                        <NavLink
                          to="/classes"
                          className={({ isActive }) =>
                            `px-3 py-2 rounded ${
                              isActive ? "bg-blue-700" : "hover:bg-blue-500"
                            }`
                          }
                        >
                          Classes
                        </NavLink>
                      </NavigationMenu.Item>
                      
                      <NavigationMenu.Item>
                        <NavLink
                          to="/homework"
                          className={({ isActive }) =>
                            `px-3 py-2 rounded ${
                              isActive ? "bg-blue-700" : "hover:bg-blue-500"
                            }`
                          }
                        >
                          Homework
                        </NavLink>
                      </NavigationMenu.Item>
                    </>
                  )}

                  {userRole === "admin" && (
                    <NavigationMenu.Item>
                      <NavLink
                        to="/admin"
                        className={({ isActive }) =>
                          `px-3 py-2 rounded ${
                            isActive ? "bg-blue-700" : "hover:bg-blue-500"
                          }`
                        }
                      >
                        Admin
                      </NavLink>
                    </NavigationMenu.Item>
                  )}

                  <NavigationMenu.Item>
                    <NavLink
                      to="/schedule"
                      className={({ isActive }) =>
                        `px-3 py-2 rounded ${
                          isActive ? "bg-blue-700" : "hover:bg-blue-500"
                        }`
                      }
                    >
                      Schedule
                    </NavLink>
                  </NavigationMenu.Item>

                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                      <button className="px-3 py-2 rounded hover:bg-blue-500">
                        Account
                      </button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Portal>
                      <DropdownMenu.Content
                        className="bg-white text-black p-2 rounded shadow-lg"
                        sideOffset={5}
                      >
                        <DropdownMenu.Item className="px-2 py-1 cursor-pointer hover:bg-gray-100 rounded">
                          <Link to="/profile">Profile</Link>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item className="px-2 py-1 cursor-pointer hover:bg-gray-100 rounded">
                          <button
                            onClick={() => {
                              localStorage.removeItem("mockAuth");
                              setIsLoggedIn(false);
                              setUserRole(null);
                            }}
                          >
                            Logout
                          </button>
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Root>
                </>
              ) : (
                <>
                  <NavigationMenu.Item>
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        `px-3 py-2 rounded ${
                          isActive ? "bg-blue-700" : "hover:bg-blue-500"
                        }`
                      }
                    >
                      Login
                    </NavLink>
                  </NavigationMenu.Item>
                </>
              )}
            </NavigationMenu.List>
          </NavigationMenu.Root>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>

      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto">
          <p className="text-center">
            &copy; {new Date().getFullYear()} Schooly - School Management System
          </p>
        </div>
      </footer>
    </div>
  );
}