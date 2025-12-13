import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const SuccessPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/20 px-4">
            <div className="w-full max-w-lg rounded-2xl bg-card shadow-xl border border-border p-8 text-center">
                {/* Icon */}
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle2 className="h-10 w-10 text-primary" strokeWidth={2.2} />
                </div>


                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
                    Payment Successful 🎉
                </h1>


                {/* Description */}
                <p className="mt-3 text-muted-foreground leading-relaxed">
                    Thank you for your booking. Your payment has been processed
                    successfully and your spot is now confirmed.
                </p>


                {/* Info Card */}
                <div className="mt-6 rounded-xl bg-muted/60 border border-border px-5 py-4 text-sm text-muted-foreground">
                    A confirmation email has been sent to you with booking and payment
                    details. If you have any questions, feel free to contact our support
                    team.
                </div>


                {/* Actions */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Button asChild className="w-full sm:w-auto">
                        <Link href="/traveler/dashboard/allTours">View My Bookings</Link>
                    </Button>


                    <Button
                        asChild
                        variant="outline"
                        className="w-full sm:w-auto"
                    >
                        <Link href="/">
                            Back to Home
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>


                {/* Footer */}
                <p className="mt-8 text-xs text-muted-foreground">
                    © {new Date().getFullYear()} Your Travel Platform. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default SuccessPage;