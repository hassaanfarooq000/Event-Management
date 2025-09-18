import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"

export default function Slider() {

    return (
        <div>
            <Carousel>
                <CarouselContent>
                    <CarouselItem>
                        <div className="relative h-[300px] md:h-[500px] w-full">
                            <Image src="/1.jpg" alt="Slide 1" fill className="object-cover" />
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className="relative h-[300px] md:h-[500px] w-full">
                            <Image src="/2.png" alt="Slide 2" fill className="object-cover" />
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className="relative h-[300px] md:h-[500px] w-full">
                            <Image src="/3.jpeg" alt="Slide 3" fill className="object-cover" />
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className="relative h-[300px] md:h-[500px] w-full">
                            <Image src="/4.jpg" alt="Slide 4" fill className="object-cover" />
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                            <div className="relative h-[300px] md:h-[500px] w-full">
                            <Image src="/5.jpg" alt="Slide 5" fill className="object-cover" />
                        </div>
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="left-4 md:left-6" />
                <CarouselNext className="right-4 md:right-6" />
            </Carousel>
        </div>
    )
}