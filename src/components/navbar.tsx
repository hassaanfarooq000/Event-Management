"use client";
import React, { useEffect, useState } from 'react';
import { PartyPopper, Menu, CalendarDays, Phone, LogIn, UserPlus, User, Plus, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const name = localStorage.getItem('userName');
    setIsLoggedIn(!!userId);
    setUserName(name || '');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    setUserName('');
    router.push('/');
  };
  return (
    <header className='sticky left-0 right-0 top-0 z-50 bg-[#f8f5ee] w-full backdrop-blur border-slate-200'>
      <div className="mx-auto h-[64px] max-w-7xl px-6 md:px-8">
        <div className="flex items-center justify-between h-full">
          <Link href='/' className='flex items-center gap-2 hover:opacity-90 transition-opacity'>
            <PartyPopper className='size-7 text-primary' />
            <span className='text-xl md:text-2xl font-bold'>Eventify</span>
          </Link>

          {/* Desktop navigation links */}
          <div className='hidden md:flex items-center gap-4'>
            <Button variant='link' asChild>
              <Link href='/events' className='flex items-center gap-2'>
                <CalendarDays className='size-4' />
                Events
              </Link>
            </Button>
            <Button variant='link' asChild>
              <Link href='/contact' className='flex items-center gap-2'>
                <Phone className='size-4' />
                Contact
              </Link>
            </Button>
            {isLoggedIn ? (
              <>
                <Button variant='link' asChild>
                  <Link href='/my-events' className='flex items-center gap-2'>
                    <User className='size-4' />
                    My Events
                  </Link>
                </Button>
                <Button variant='default' asChild>
                  <Link href='/create-event' className='flex items-center gap-2'>
                    <Plus className='size-4' />
                    Create Event
                  </Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='outline' className='flex items-center gap-2'>
                      <User className='size-4' />
                      {userName || 'User'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className='size-4 mr-2' />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant='default' asChild>
                  <Link href='/login' className='flex items-center gap-2'>
                    <LogIn className='size-4' />
                    Login
                  </Link>
                </Button>
                <Button variant='default' asChild>
                  <Link href='/signup' className='flex items-center gap-2'>
                    <UserPlus className='size-4' />
                    Signup
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu links */}
          <div className='md:hidden'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size='icon' aria-label='Open menu'>
                  <Menu />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-40'>
                <DropdownMenuItem asChild>
                  <Link href='/events' className='flex items-center gap-2'>
                    <CalendarDays className='size-4' />
                    Events
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href='/contact' className='flex items-center gap-2'>
                    <Phone className='size-4' />
                    Contact
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {isLoggedIn ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href='/my-events' className='flex items-center gap-2'>
                        <User className='size-4' />
                        My Events
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href='/create-event' className='flex items-center gap-2'>
                        <Plus className='size-4' />
                        Create Event
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className='size-4 mr-2' />
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href='/login' className='flex items-center gap-2'>
                        <LogIn className='size-4' />
                        Login
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href='/signup' className='flex items-center gap-2'>
                        <UserPlus className='size-4' />
                        Signup
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;