import { Button } from '@/components/ui/button';
import { ArrowLeft, RefreshCcw, XCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const CancelPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-destructive/5 via-background to-muted/30 px-4">
            <div className="w-full max-w-lg rounded-2xl bg-card shadow-xl border border-border p-8 text-center">
                {/* Icon */}
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
                    <XCircle className="h-10 w-10 text-destructive" strokeWidth={2.2} />
                </div>


                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
                    Payment Cancelled
                </h1>


                {/* Description */}
                <p className="mt-3 text-muted-foreground leading-relaxed">
                    Your payment was not completed. Don’t worry — no charges were made.
                    You can retry the payment or go back and choose a different option.
                </p>


                {/* Info Box */}
                <div className="mt-6 rounded-xl bg-muted/60 border border-border px-5 py-4 text-sm text-muted-foreground">
                    If you faced any issues during payment, please ensure your payment
                    details are correct or contact our support team for assistance.
                </div>


                {/* Actions */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Button asChild className="w-full sm:w-auto">
                        <Link href="/">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Home
                        </Link>
                    </Button>


                    <Button
                        asChild
                        variant="outline"
                        className="w-full sm:w-auto"
                    >
                        <Link href="/">
                            <RefreshCcw className="mr-2 h-4 w-4" />
                            Try Again
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

export default CancelPage;