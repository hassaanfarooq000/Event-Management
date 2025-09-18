import Image from "next/image";


export default function HeroSection() {
    return (<section className="bg-[#f8f5ee] min-h-screen">
        <div className="container mx-auto flex flex-col items-center justify-center min-h-screen text-black md:flex-row">
            {/*Left Portion */}
            <div className="flex flex-col items-center space-y-12 text-center md:w-1/2 md:items-start md:text-left px-8 py-16 md:px-6 md:ml-16 lg:ml-24">
                <h1 className="max-w-md text-4xl md:text-6xl md:leading-tight">
                    Host, Connect, Celebrate: Your Events, Our Platform!
                </h1>
                <p className="max-w-md md:max-w-sm text-black/80 font-light leading-7">
                    Book and learn helpful tips from 3,168+ mentors in world-class companies with our global community.

                    Get started with our platform and host your events with us
                </p>
            </div>

            {/*Right Portion */}
            <div className="relative w-full max-w-md md:max-w-none mx-auto md:mx-0 md:w-1/2">
                <Image src="./next.svg" alt="Home" width={500} height={500} />
            </div>
        </div>
    </section>
    )
}