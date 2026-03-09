import { Link } from "next-view-transitions";
import Profile from "./profile";
import { adminStatus } from "@/lib/db/user";
import AdminIcon from "../icons/AdminIcon";
import { Button } from "../ui/button";
import Logo from "./Logo";

const navItems = [
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Notes",
    href: "/notes",
  },

  {
    label: "Pricing",
    href: "/#pricing",
  },
];

export default async function MainNav() {
  let isAdmin = false;

  try {
    isAdmin = await adminStatus();
  } catch {
    isAdmin = false;
  }

  return (
    <nav className="sticky top-0 z-40 flex items-center justify-between bg-gradient-to-b from-[#121212] via-[#121212] to-[#121212]/80 px-6 py-6 backdrop-blur-sm hover:cursor-pointer md:px-10 md:py-8">
      <div className="flex items-center gap-30">
        <Link href="/" className="flex items-center">
          <Logo className="size-10 md:size-12 lg:size-16" />
          <h3
            data-umami-event="nav-brand-text-click"
            className="font-excon text-xl font-bold text-white md:text-2xl"
          >
            NotesBuddy
          </h3>
        </Link>
        <div className="mt-2 hidden items-center gap-4 md:flex">
          {navItems.map((items) => {
            return (
              <Link
                data-umami-event={`nav-link-${items.label.toLowerCase()}`}
                className="font-excon text-[rgba(255,255,255,0.7)] underline-offset-4 transition-colors hover:cursor-pointer hover:text-white hover:underline"
                href={items.href}
                key={items.label}
              >
                {items.label}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 md:gap-4">
        {isAdmin && (
          <Link href="/admin">
            <Button
              data-umami-event="nav-admin-panel-click"
              size="lg"
              className="gap-2 rounded-lg border border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.1)] text-white transition-all hover:bg-[rgba(255,255,255,0.15)]"
            >
              <AdminIcon className="size-4" />{" "}
              <span className="hidden md:block">Admin Panel</span>
            </Button>
          </Link>
        )}
        <Profile />
      </div>
    </nav>
  );
}
