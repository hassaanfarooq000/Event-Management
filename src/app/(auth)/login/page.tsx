"use client";

import React, { useState } from 'react';
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: username, password })
            });
            const data = await res.json();
            if (!res.ok) {
                toast.error(data.message || 'Login failed');
                return;
            }
            toast.success('Login successful');
            if (data?.user?.userId) {
                localStorage.setItem('userId', String(data.user.userId));
                localStorage.setItem('userName', data.user.name || '');
            }
            router.push('/');
        } catch (error) {
            toast.error('Network error');
        }
    }

    return (
        <>
            <section className='min-h-screen bg-[#f8f5ee] flex items-center justify-center px-4'>
                <div className='w-full max-w-md mx-auto'>
                    <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
                        <div className="text-center space-y-2">
                            <h1 className="text-2xl font-bold">Login</h1>
                            <p className="text-sm text-gray-500">Welcome back to our platform</p>
                        </div>
                        <form className='space-y-4' onSubmit={handleLogin}>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Username</label>
                                <input type="text" className="w-full rounded-md border border-gray-300 p-2" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Password</label>
                                <input type={showPassword ? "text" : "password"} className="w-full rounded-md border border-gray-300 p-2" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <button type="button" className="text-sm text-black-500" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? "Hide Password" : "Show Password"}
                                </button>
                            </div>
                            <Button type="submit" className="w-full bg-black text-white p-2 rounded-md">Login</Button>
                        </form>
                        <div className="text-center space-y-2">
                            <p className="text-sm text-gray-500">Don't have an account? <Link href="/register" className="text-blue-500">Register</Link></p>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )

}