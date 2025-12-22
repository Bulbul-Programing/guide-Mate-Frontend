import { ReactNode } from "react";

interface KPIStatCardProps {
    label: string;
    value: ReactNode;
    icon?: ReactNode;
}

const KPIStatCard = ({ label, value, icon }: KPIStatCardProps) => {
    return (
        <div className="relative bg-card border border-t-4 border-primary rounded-2xl p-5 shadow-sm hover:shadow-md transition">
            {/* Accent Bar */}
            {/* <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-primary" /> */}

            <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{label}</p>
                {icon && (
                    <div className="size-9 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                        {icon}
                    </div>
                )}
            </div>

            <p className="text-3xl font-bold mt-3 tracking-tight">
                {value}
            </p>
        </div>
    );
};

export default KPIStatCard;
