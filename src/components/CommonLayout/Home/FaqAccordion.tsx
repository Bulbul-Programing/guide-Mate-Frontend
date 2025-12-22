"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqAccordion() {
    return (
        <div>
            <h1 className="text-2xl md:text-4xl font-bold mb-7">Frequently asked question</h1>
            <Accordion type="single" collapsible className="w-full space-y-4 mb-10">

                <AccordionItem
                    value="item-1"
                    className="bg-card border border-border rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                    <AccordionTrigger className="px-5 py-4 text-lg font-semibold text-foreground">
                        What is your platform about?
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pb-4 text-muted-foreground text-base">
                        Our platform connects travelers with local guides to explore unique
                        experiences worldwide. Discover hidden gems with trusted guides.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem
                    value="item-2"
                    className="bg-card border border-border rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                    <AccordionTrigger className="px-5 py-4 text-lg font-semibold text-foreground">
                        How do I book a tour?
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pb-4 text-muted-foreground text-base">
                        Browse tours, select your preferred dates, and complete the booking
                        via our secure payment system. You will receive confirmation instantly.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem
                    value="item-3"
                    className="bg-card border border-border rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                    <AccordionTrigger className="px-5 py-4 text-lg font-semibold text-foreground">
                        Can I cancel or reschedule a booking?
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pb-4 text-muted-foreground text-base">
                        Yes, you can cancel or reschedule tours according to the guide’s
                        cancellation policy. Refunds are processed based on the terms.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem
                    value="item-4"
                    className="bg-card border border-border rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                    <AccordionTrigger className="px-5 py-4 text-lg font-semibold text-foreground">
                        Do I need an account to book?
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pb-4 text-muted-foreground text-base">
                        Yes, creating an account helps track your bookings, manage reviews, and
                        receive exclusive offers.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem
                    value="item-5"
                    className="bg-card border border-border rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                    <AccordionTrigger className="px-5 py-4 text-lg font-semibold text-foreground">
                        Is my personal information safe?
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pb-4 text-muted-foreground text-base">
                        Absolutely. We follow strict privacy practices and use secure encryption
                        to protect your personal information.
                    </AccordionContent>
                </AccordionItem>

            </Accordion>
        </div>
    );
}
