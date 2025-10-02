"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";

type Event = {
    eventId: number;
    title: string;
    details: string;
    location: string;
    city: string;
    dateTime: Date;
    day: string;
    type: string;
    organizerId: number;
    vipTickets: number;
    regTickets: number;
    price: number;
    image: string;
    deleteStatus: boolean;
};

export default function EventPage({ params }: { params: { id: string } }) {
    const eventId = parseInt(params.id);
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
        fetch(`${base}/api/events/${eventId}`)
            .then(async (r) => {
                const data = await r.json();
                if (!r.ok) throw new Error(data?.message || 'Failed');
                setEvent({ ...data, dateTime: new Date(data.dateTime) });
            })
            .catch(() => toast.error('Failed to load event'))
            .finally(() => setLoading(false));
    }, [eventId]);

    // Registration form state
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        ticketType: 'regular',
        quantity: 1
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                toast.error('Please login first');
                setIsSubmitting(false);
                return;
            }
            const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
            const res = await fetch(`${base}/api/events/${eventId}/reserve`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: Number(userId), ...formData })
            });
            const data = await res.json();
            if (!res.ok) {
                toast.error(data.message || 'Reservation failed');
                setIsSubmitting(false);
                return;
            }
            setIsSubmitting(false);
            setIsSubmitted(true);
            toast.success('Registration successful!');
        } catch (error) {
            setIsSubmitting(false);
            toast.error("Registration failed. Please try again.");
        }
    };

    if (loading) {
        return <div className="container mx-auto px-4 py-8 text-center">Loading...</div>;
    }

    if (!event) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Event Not Found</h1>
                <p className="text-muted-foreground">The event you&apos;re looking for doesn&apos;t exist.</p>
            </div>
        );
    }

    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}

            />
            <section className="bg-[#f8f5ee] min-h-screen px-6">
                <div className="container mx-auto flex flex-col items-center justify-center min-h-screen text-black lg:flex-row">
                    {/*Left Portion - Event Image */}
                    <div className="px-4 relative w-full max-w-sm lg:max-w-md mx-auto lg:mx-0 lg:w-1/3 lg:ml-8">
                        <div className="relative">
                            <Image
                                src={event.image}
                                alt={event.title}
                                width={400}
                                height={400}
                                className="rounded-lg shadow-2xl"
                            />
                            {/* Event type badge */}
                            <div className="absolute top-4 left-4 bg-black/80 text-white text-sm px-3 py-1 rounded-full">
                                {event.type}
                            </div>
                        </div>
                    </div>

                    {/*Center Portion - Event Details */}
                    <div className="flex flex-col items-center space-y-8 text-center lg:w-1/2 lg:items-start lg:text-left px-8 py-16 lg:px-8 lg:py-16">
                        <div className="space-y-4">
                            <h1 className="max-w-md text-3xl md:text-5xl md:leading-tight font-bold">
                                {event.title}
                            </h1>
                            <p className="max-w-md md:max-w-lg text-black/80 font-light leading-7 text-lg">
                                {event.details}
                            </p>
                        </div>

                        {/* Event Information Card */}
                        <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-xl">Event Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">📍</span>
                                    <div>
                                        <p className="font-semibold">Location</p>
                                        <p className="text-sm text-muted-foreground">{event.location}, {event.city}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">📅</span>
                                    <div>
                                        <p className="font-semibold">Date & Time</p>
                                        <p className="text-sm text-muted-foreground">{event.day}, {event.dateTime.toDateString()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">🎫</span>
                                    <div>
                                        <p className="font-semibold">Tickets Available</p>
                                        <p className="text-sm text-muted-foreground">VIP: {event.vipTickets} | Regular: {event.regTickets}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button size="lg" className="flex-1 bg-blue-600 hover:bg-blue-700">
                                        Register Now
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className="space-y-4">
                                        <div className="text-center">
                                            <h3 className="text-lg font-semibold">Register for {event.title}</h3>
                                            <p className="text-sm text-muted-foreground">Fill out the form below to register</p>
                                        </div>

                                        {isSubmitted ? (
                                            <div className="text-center py-4">
                                                <div className="text-green-600 text-lg font-semibold mb-2">✅ Registration Successful!</div>
                                                <p className="text-sm text-muted-foreground">You will receive a confirmation email shortly.</p>
                                            </div>
                                        ) : (
                                            <form onSubmit={handleSubmit} className="space-y-4">
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div>
                                                        <label className="text-sm font-medium">First Name</label>
                                                        <Input
                                                            name="firstName"
                                                            value={formData.firstName}
                                                            onChange={handleInputChange}
                                                            placeholder="John"
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-sm font-medium">Last Name</label>
                                                        <Input
                                                            name="lastName"
                                                            value={formData.lastName}
                                                            onChange={handleInputChange}
                                                            placeholder="Doe"
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="text-sm font-medium">Email</label>
                                                    <Input
                                                        name="email"
                                                        type="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        placeholder="john@example.com"
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <label className="text-sm font-medium">Phone</label>
                                                    <Input
                                                        name="phone"
                                                        type="tel"
                                                        value={formData.phone}
                                                        onChange={handleInputChange}
                                                        placeholder="+1 (555) 123-4567"
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <label className="text-sm font-medium">Ticket Type</label>
                                                    <select
                                                        name="ticketType"
                                                        value={formData.ticketType}
                                                        onChange={handleInputChange}
                                                        className="w-full h-10 px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                                                        required
                                                    >
                                                        <option value="regular">Regular - ${event.price}</option>
                                                        <option value="vip">VIP - ${event.price * 2}</option>
                                                    </select>
                                                </div>

                                                <div>
                                                    <label className="text-sm font-medium">Quantity</label>
                                                    <Input
                                                        name="quantity"
                                                        type="number"
                                                        min="1"
                                                        max="10"
                                                        value={formData.quantity}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>

                                                <div className="pt-2">
                                                    <Button
                                                        type="submit"
                                                        className="w-full"
                                                        disabled={isSubmitting}
                                                    >
                                                        {isSubmitting ? "Processing..." : "Complete Registration"}
                                                    </Button>
                                                </div>
                                            </form>
                                        )}
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}