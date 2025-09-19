"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
// Define the event type (same as in events page)
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

// Sample events data (same as in events page)
const sampleEvents: Event[] = [
    {
        eventId: 1,
        title: "Tech Innovation Summit 2024",
        details: "Join industry leaders for cutting-edge discussions on AI, blockchain, and the future of technology. Network with top professionals and discover breakthrough innovations that will shape tomorrow's digital landscape.",
        location: "Convention Center Hall A",
        city: "San Francisco",
        dateTime: new Date("2024-12-15T09:00:00Z"),
        day: "Sunday",
        type: "Conference",
        organizerId: 1,
        vipTickets: 50,
        regTickets: 200,
        price: 299,
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
        deleteStatus: false
    },
    {
        eventId: 2,
        title: "Music Festival: Summer Vibes",
        details: "Experience an unforgettable weekend of live music featuring top artists from around the world. Food trucks, art installations, and camping available. Get ready to dance under the stars!",
        location: "Golden Gate Park",
        city: "San Francisco",
        dateTime: new Date("2024-12-22T18:00:00Z"),
        day: "Saturday",
        type: "Music Festival",
        organizerId: 2,
        vipTickets: 100,
        regTickets: 1000,
        price: 150,
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
        deleteStatus: false
    },
    {
        eventId: 3,
        title: "Startup Pitch Competition",
        details: "Watch tomorrow's unicorns present their revolutionary ideas to a panel of top-tier investors. Network with entrepreneurs, VCs, and industry experts. Cash prizes for winners!",
        location: "Innovation Hub Auditorium",
        city: "Austin",
        dateTime: new Date("2024-12-18T14:00:00Z"),
        day: "Wednesday",
        type: "Business",
        organizerId: 3,
        vipTickets: 30,
        regTickets: 150,
        price: 75,
        image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop",
        deleteStatus: false
    },
    {
        eventId: 4,
        title: "Art Gallery Opening: Modern Masters",
        details: "Exclusive preview of contemporary artworks from emerging and established artists. Wine tasting, live jazz music, and artist meet-and-greets. A sophisticated evening of culture and creativity.",
        location: "Metropolitan Art Gallery",
        city: "New York",
        dateTime: new Date("2024-12-20T19:00:00Z"),
        day: "Friday",
        type: "Art & Culture",
        organizerId: 4,
        vipTickets: 25,
        regTickets: 75,
        price: 45,
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        deleteStatus: false
    },
    {
        eventId: 5,
        title: "Food & Wine Festival",
        details: "Savor exquisite dishes from world-renowned chefs paired with premium wines. Cooking demonstrations, wine tastings, and culinary workshops. A paradise for food enthusiasts!",
        location: "Riverside Convention Center",
        city: "Portland",
        dateTime: new Date("2024-12-28T12:00:00Z"),
        day: "Saturday",
        type: "Food & Beverage",
        organizerId: 5,
        vipTickets: 40,
        regTickets: 200,
        price: 120,
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop",
        deleteStatus: false
    },
    {
        eventId: 6,
        title: "Digital Marketing Masterclass",
        details: "Learn cutting-edge digital marketing strategies from industry experts. Hands-on workshops covering SEO, social media, content marketing, and analytics. Perfect for marketers and business owners.",
        location: "Business Center Room 201",
        city: "Chicago",
        dateTime: new Date("2024-12-25T10:00:00Z"),
        day: "Wednesday",
        type: "Workshop",
        organizerId: 1,
        vipTickets: 15,
        regTickets: 60,
        price: 199,
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        deleteStatus: false
    },
    {
        eventId: 7,
        title: "Fitness & Wellness Expo",
        details: "Discover the latest in fitness equipment, healthy lifestyle products, and wellness services. Free workout classes, nutrition seminars, and health screenings available throughout the day.",
        location: "Sports Complex Arena",
        city: "Miami",
        dateTime: new Date("2025-01-05T09:00:00Z"),
        day: "Sunday",
        type: "Health & Fitness",
        organizerId: 2,
        vipTickets: 20,
        regTickets: 300,
        price: 25,
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
        deleteStatus: false
    },
    {
        eventId: 8,
        title: "Gaming Championship 2024",
        details: "Ultimate gaming tournament featuring the latest video games and esports competitions. Prizes worth $50,000! Meet gaming influencers, try new releases, and compete for glory.",
        location: "Gaming Arena Center",
        city: "Los Angeles",
        dateTime: new Date("2025-01-12T15:00:00Z"),
        day: "Sunday",
        type: "Gaming",
        organizerId: 3,
        vipTickets: 35,
        regTickets: 250,
        price: 80,
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop",
        deleteStatus: false
    }
];

export default function EventPage({ params }: { params: { id: string } }) {
    const eventId = parseInt(params.id);
    const event = sampleEvents.find(e => e.eventId === eventId);

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

    // Form handling functions
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
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            setIsSubmitting(false);
            setIsSubmitted(true);

            // Show success toast
            toast.success("Registration successful! You will receive a confirmation email shortly.");

            // Reset form after 3 seconds
            setTimeout(() => {
                setIsSubmitted(false);
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    ticketType: 'regular',
                    quantity: 1
                });
            }, 3000);
        } catch (error) {
            setIsSubmitting(false);
            toast.error("Registration failed. Please try again.");
        }
    };

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
                <div className="container mx-auto flex flex-col items-center justify-center min-h-screen text-black md:flex-row">
                    {/*Left Portion - Event Image */}
                    <div className="px-4 relative w-full max-w-md md:max-w-none mx-auto md:mx-0 md:w-1/2">
                        <div className="relative">
                            <Image
                                src={event.image}
                                alt={event.title}
                                width={500}
                                height={500}
                                className="rounded-lg shadow-2xl"
                            />
                             {/* Event type badge */}
                             <div className="absolute top-4 left-4 bg-black/80 text-white text-sm px-3 py-1 rounded-full">
                                 {event.type}
                             </div>
                        </div>
                    </div>

                    {/*Right Portion - Event Details */}
                    <div className="flex flex-col items-center space-y-8 text-center md:w-1/2 md:items-start md:text-left px-8 py-16 md:px-6 md:ml-16 lg:ml-24">
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