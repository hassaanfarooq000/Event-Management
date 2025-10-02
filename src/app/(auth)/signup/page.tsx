"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import toast, { Toaster } from "react-hot-toast";

export default function SignupPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: username, email: username, password })
            });
            const data = await res.json();
            if (!res.ok) {
                toast.error(data.message || 'Signup failed');
                return;
            }
            toast.success('Signup successful');
            if (data?.user?.userId) {
                localStorage.setItem('userId', String(data.user.userId));
                localStorage.setItem('userName', data.user.name || '');
            }
            window.location.href = '/';
        } catch (error) {
            toast.error('Network error');
        }
    }
    return (
        <>
            <div><Toaster
                position="top-center"
                reverseOrder={false}

            /></div>
            <section className='min-h-screen bg-[#f8f5ee] flex items-center justify-center px-4'>
                <div className='w-full max-w-md mx-auto'>
                    <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
                        <div className="text-center space-y-2">
                            <h1 className="text-2xl font-bold">Signup</h1>
                            <p className="text-sm text-gray-500">Welcome to our platform</p>
                        </div>
                        <form className='space-y-4' onSubmit={handleSignup}>
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
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Confirm Password</label>
                                <input type={showPassword ? "text" : "password"} className="w-full rounded-md border border-gray-300 p-2" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                <button type="button" className="text-sm text-black-500" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? "Hide Password" : "Show Password"}
                                </button>
                            </div>
                            <Button type="submit" className="w-full bg-black text-white p-2 rounded-md">Signup</Button>
                        </form>
                        <div className="text-center space-y-2">
                            <p className="text-sm text-gray-500">Already have an account? <Link href="/login" className="text-blue-500">Login</Link></p>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )

}