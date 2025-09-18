import { Facebook, Instagram, PartyPopper, Twitter } from 'lucide-react';
import Link from 'next/link';
export default function Footer() {
    return (
        <footer className="bg-[#f8f5ee] py-12">
            <div className="mx-auto max-w-7xl px-6 md:px-8">
                {/*Row 1 */}
                <div className="md:flex md:justify-between md:items-start gap-10 md:gap-16">
                    {/*Column 1*/}
                    <div className="flex items-start mb-6 gap-2">
                        <PartyPopper className='size-7 text-primary' />
                        <span className='text-xl md:text-2xl font-bold'>Eventify</span>
                    </div>
                    <div className="grid grid-cols-2 gap-10 md:gap-20">
                        <div>
                            <h3 className='text-lg font-semibold'>Links</h3>
                            <ul className='flex flex-col text-sm text-gray-400 space-y-2'>
                                <li><Link href='/'>Home</Link></li>
                                <li><Link href='/'>Events</Link></li>
                                <li><Link href='/'>Contact</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className='text-lg font-semibold'>Links</h3>
                            <ul className='flex flex-col text-sm text-gray-400 space-y-2'>
                                <li><Link href='/'>Home</Link></li>
                                <li><Link href='/'>Events</Link></li>
                                <li><Link href='/'>Contact</Link></li>
                            </ul>
                        </div>
                        
                    </div>
                </div>
            <hr className="my-8 border-gray-300 w-full"/>
            <div className="text-sm text-gray-500 sm:flex sm:items-center sm:justify-between gap-4">
                <p>© 2025 Eventify. All rights reserved.</p>
                <div className="flex items-center gap-4">
                    <Link href='/'><Facebook className="hover:text-primary hover:scale-110 transition-all duration-300"/></Link>
                    <Link href='/'><Twitter className="hover:text-primary hover:scale-110 transition-all duration-300"/></Link>
                    <Link href='/'><Instagram className="hover:text-primary hover:scale-110 transition-all duration-300"/></Link>
                </div>
            </div>

            </div>
        </footer>
    )

}

