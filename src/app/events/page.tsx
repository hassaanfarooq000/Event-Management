import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
const sampleEvents = [
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


export default function Events({ events }: { events: typeof sampleEvents }) {
    return (
        <>
            <div className="w-full max-w-xl mx-auto">
                <Card className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-40 w-full h-44 md:h-auto flex-shrink-0">
                            <Image src={events.image} alt={events.title} className="object-cover w-full h-full" />
                        </div>
                        <div className="flex-1 p-4 md:p-6 flex flex-col">
                            <CardHeader className="p-0">
                                <CardTitle className="text-lg md:text-xl line-clamp-2">{events.title}</CardTitle>
                                <CardDescription className="mt-1 text-sm text-muted-foreground line-clamp-3">{events.details}</CardDescription>
                            </CardHeader>
                            <CardContent className="pt-3 px-0 flex-1 space-y-2">
                                <p className="text-sm"><strong>Type:</strong> {events.type}</p>
                                <p className="text-sm"><strong>Location:</strong> {events.location}, {events.city}</p>
                                <p className="text-sm"><strong>Date:</strong> {events.day}, {events.dateTime.toDateString()}</p>
                                <p className="text-sm"><strong>Tickets:</strong> VIP {events.vipTickets}, Regular {events.regTickets}</p>
                                <p className="text-sm"><strong>Price:</strong> ${events.price}</p>
                            </CardContent>
                            <CardFooter className="p-0 mt-4 flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <Button variant="ghost" size="sm">
                                        Register
                                    </Button>
                                    <Button variant="outline" size="sm" className="hidden md:inline-flex">
                                        Share
                                    </Button>
                                    <div className="text-xs text-muted-foreground">
                                        Updated {new Date().toLocaleDateString()}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        Updated {events.dateTime.toLocaleDateString()}
                                    </div>
                                </div>
                            </CardFooter>
                        </div>
                    </div>


                </Card>
            </div>
        </>
    );
}