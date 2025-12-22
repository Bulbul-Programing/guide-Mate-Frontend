""

import { NavSection } from "@/types/dashboardNavItem";
import { getDefaultDashboardRoute, UserRole } from "./auth-utils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
    const defaultDashboard = getDefaultDashboardRoute(role);

    return [
        {
            items: [
                {
                    title: "My Profile",
                    href: `/my-profile`,
                    icon: "User",
                    roles: ["TRAVELER", "GUIDE", "ADMIN"],
                },
                {
                    title: "Change Password",
                    href: "/change-password",
                    icon: "Settings", // ✅ String
                    roles: ["TRAVELER", "GUIDE", "ADMIN"],
                },
                {
                    title: "Home",
                    href: "/",
                    icon: "Home", // ✅ String
                    roles: ["TRAVELER", "GUIDE", "ADMIN"],
                }
            ]
        }
    ]
}

export const getTravelerNavItem = async (): Promise<NavSection[]> => {

    return [
        {
            title: "Dashboard",
            items: [
                {
                    title: "Dashboard",
                    href: "/traveler/dashboard",
                    icon: "LayoutDashboard",
                    roles: ["TRAVELER"],
                }
            ],
        },
        {
            title: "Tour Management",
            items: [
                {
                    title: "Tours",
                    href: "/traveler/dashboard/allTours",
                    icon: "Calendar", // ✅ String
                    badge: undefined,
                    roles: ["TRAVELER"],
                }
            ],
        }
    ];
}

export const getGuideNavItems = async (): Promise<NavSection[]> => {

    return [
        {
            title: "Dashboard",
            items: [
                {
                    title: "Dashboard",
                    href: "/guide/dashboard",
                    icon: "LayoutDashboard",
                    roles: ["GUIDE"],
                }
            ],
        },
        {
            title: "Spots",
            items: [
                {
                    title: "My Spot",
                    href: "/guide/dashboard/my-spots",
                    icon: "Calendar", // ✅ String
                    badge: undefined,
                    roles: ["GUIDE"],
                },
                {
                    title: "Book Tours",
                    href: "/guide/dashboard/booksTour",
                    icon: "ClipboardList", // ✅ String
                    roles: ["GUIDE"],
                },
            ],
        },
    ]
}

export const adminNavItems: NavSection[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Dashboard",
                href: "/admin/dashboard",
                icon: "LayoutDashboard",
                roles: ["ADMIN"],
            }
        ],
    },
    {
        title: "User Management",
        items: [
            {
                title: "Users",
                href: "/admin/dashboard/user-management",
                icon: "User",
                roles: ["ADMIN"],
            }
        ],
    },
    {
        title: "Spot Management",
        items: [
            {
                title: "Tour Spot",
                href: "/admin/dashboard/guide-spot",
                icon: "Mountain",
                roles: ["ADMIN"],
            },
            {
                title: "Payments",
                href: "/admin/dashboard/all-payments",
                icon: "DollarSign",
                roles: ["ADMIN"],
            },
        ]
    },
    {
        title: "Coupon Management",
        items: [
            {
                title: "Coupon",
                href: "/admin/dashboard/coupon",
                icon: "Percent",
                roles: ["ADMIN"],
            }
        ]
    }
]

export const getNavItemsByRole = async (role: UserRole): Promise<NavSection[]> => {
    const commonNavItems = getCommonNavItems(role);

    switch (role) {
        case "ADMIN":
            return [...adminNavItems, ...commonNavItems,];
        case "TRAVELER":
            return [...await getTravelerNavItem(), ...commonNavItems];
        case "GUIDE":
            return [...await getGuideNavItems(), ...commonNavItems];
        default:
            return [];
    }
}