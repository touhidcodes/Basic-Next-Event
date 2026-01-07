"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getAuthUser } from "@/service/getAuthUser";
import { logout } from "@/service/logout";
import { Calendar, Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default async function Header() {
  const router = useRouter();
  // if using localStorage
  // const { isAuthenticated } = useAuth();

  //if using cookies
  const user = await getAuthUser();

  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { title: "Home", url: "/" },
    { title: "Events", url: "/events" },
    { title: "About", url: "/about" },
    ...(user ? [{ title: "Dashboard", url: "/dashboard/overview" }] : []),
    ...(user
      ? [{ title: "Create Event", url: "/dashboard/create-event" }]
      : []),
  ];

  const handleNavigation = (url: string) => {
    router.push(url);
    setMobileOpen(false);
  };

  const handleLogoutClick = () => {
    setMobileOpen(false);
    logout();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <button
          onClick={() => handleNavigation("/")}
          className="flex items-center gap-2 font-semibold text-xl hover:opacity-80 transition-opacity"
        >
          <Calendar className="h-6 w-6" />
          <span>Next Event</span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {menuItems.map((item) => (
            <Link href={item.url}>
              <button
                key={item.url}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.title}
              </button>
            </Link>
          ))}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <div className="text-sm text-muted-foreground">{user.email}</div>
              <Button onClick={handleLogoutClick} size="sm">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => handleNavigation("/signup")}
                size="sm"
              >
                Sign Up
              </Button>
              <Button onClick={() => handleNavigation("/login")} size="sm">
                Login
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-75">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                EventHub
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 mt-8">
              {/* Mobile Navigation */}
              <nav className="flex flex-col gap-2">
                {menuItems.map((item) => (
                  <Link href={item.url}>
                    <button
                      key={item.url}
                      className="text-left px-3 py-2 rounded-md hover:bg-accent transition-colors"
                    >
                      {item.title}
                    </button>
                  </Link>
                ))}
              </nav>

              {/* Mobile Auth Buttons */}
              <div className="flex flex-col gap-2 pt-4 border-t">
                {user ? (
                  <>
                    <div className="px-3 py-2 text-sm text-muted-foreground">
                      <div className="font-medium text-foreground">
                        {user.email}
                      </div>
                      <div className="text-xs">{user.email}</div>
                    </div>
                    <Button
                      onClick={handleLogoutClick}
                      variant="outline"
                      className="w-full"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => handleNavigation("/login")}
                      variant="outline"
                      className="w-full"
                    >
                      Login
                    </Button>
                    <Button
                      onClick={() => handleNavigation("/signup")}
                      className="w-full"
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
