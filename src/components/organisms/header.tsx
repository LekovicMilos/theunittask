'use client';
import Link from 'next/link';
import { NavItem } from "@/components/atoms/nav-item";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {

  return (
    <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 justify-between">
        <Link
        className="flex items-center gap-2 font-semibold"
        href="/"
        >
        The unit technical task
        </Link>
        <nav className="hidden lg:flex items-start px-4 text-sm font-medium">
            <NavItem href="/">
            Dashboard
            </NavItem>
            <NavItem href="/about">
            About
            </NavItem>
        </nav>
        <nav className="grid items-start px-4 text-sm font-medium lg:hidden">
        <DropdownMenu>
            <DropdownMenuTrigger>Open</DropdownMenuTrigger>
            <DropdownMenuContent>
            <DropdownMenuItem asChild>
                <NavItem href="/">
                Dashboard
                </NavItem>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <NavItem href="/about">
                About
                </NavItem>
            </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </nav>
    </header>
  );
}