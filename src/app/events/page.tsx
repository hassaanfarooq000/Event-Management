import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// Define the event type
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


// Single Event Card Component
function EventCard({ event }: { event: Event }) {
    return (
        <div className="w-full max-w-6xl mx-auto mb-4">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <div className="flex flex-col lg:flex-row">
                    {/* Small cute image box */}
                    <div className="lg:w-32 w-full h-32 lg:h-24 flex-shrink-0 relative">
                        <Image 
                            src={event.image} 
                            alt={event.title} 
                            width={200}
                            height={150}
                            className="object-cover w-full h-full rounded-l-lg" 
                        />
                        {/* Event type badge */}
                        <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                            {event.type}
                        </div>
                    </div>
                    
                    {/* Content area */}
                    <div className="flex-1 p-4 lg:p-6 flex flex-col">
                        <CardHeader className="p-0">
                            <CardTitle className="text-lg lg:text-xl line-clamp-1">{event.title}</CardTitle> 
                            <CardDescription className="mt-1 text-sm text-muted-foreground line-clamp-2">{event.details}</CardDescription>
                        </CardHeader>
                        
                        <CardContent className="pt-3 px-0 flex-1">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                <p><strong>📍</strong> {event.location}, {event.city}</p>
                                <p><strong>📅</strong> {event.day}, {event.dateTime.toDateString()}</p>
                                <p><strong>🎫</strong> VIP {event.vipTickets}, Regular {event.regTickets}</p>
                                <p><strong>💰</strong> ${event.price}</p>
                            </div>
                        </CardContent>
                        
                        <CardFooter className="p-0 mt-3 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <Button variant="default" size="sm" className="text-xs">
                                    Register
                                </Button>
                            </div>
                            <div className="text-xs text-muted-foreground">
                                {event.dateTime.toLocaleDateString()}
                            </div>
                        </CardFooter>
                    </div>
                </div>
            </Card>
        </div>
    );
}

// Main Events Page Component
export default function EventsPage() {
    return (
        <div className="container mx-auto px-4 py-6">
            <div className="mb-6">
                <h1 className="text-2xl lg:text-3xl font-bold text-center mb-2">Upcoming Events</h1>
                <p className="text-muted-foreground text-center text-sm">Discover amazing events happening around you</p>
            </div>
            <div className="space-y-3">
                {sampleEvents.map((event) => (
                    <EventCard key={event.eventId} event={event} />
                ))}
            </div>
        </div>
    );
}