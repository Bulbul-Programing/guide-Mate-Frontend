""

import { NavSection } from "@/types/dashboardNavItem";
import { getDefaultDashboardRoute, UserRole } from "./auth-utils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
    const defaultDashboard = getDefaultDashboardRoute(role);

    return [
        {
            items: [
                {
                    title: "Home",
                    href: "/",
                    icon: "Home", // ✅ String
                    roles: ["TRAVELER", "GUIDE", "ADMIN"],
                },
                {
                    title: "Dashboard",
                    href: defaultDashboard,
                    icon: "LayoutDashboard",
                    roles: ["TRAVELER", "GUIDE", "ADMIN"],
                },
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

            ]
        }
    ]
}

export const getTravelerNavItem = async (): Promise<NavSection[]> => {

    return [
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
        title: "User Management",
        items: [
            {
                title: "Admins",
                href: "/admin/dashboard/user-management",
                icon: "Shield", // ✅ String
                roles: ["ADMIN"],
            },
            {
                title: "Guides",
                href: "/admin/dashboard/guide-spot",
                icon: "Stethoscope",
                roles: ["ADMIN"],
            },
            {
                title: "Traveler",
                href: "/admin/dashboard/all-payments",
                icon: "Users", // ✅ String
                roles: ["ADMIN"],
            },
        ],
    }
]

export const getNavItemsByRole = async (role: UserRole): Promise<NavSection[]> => {
    const commonNavItems = getCommonNavItems(role);

    switch (role) {
        case "ADMIN":
            return [...commonNavItems, ...adminNavItems];
        case "TRAVELER":
            return [...commonNavItems,
            // ...doctorNavItems
            ...await getTravelerNavItem()
            ];
        case "GUIDE":
            return [...commonNavItems,
            // ...patientNavItems
            ...await getGuideNavItems()
            ];
        default:
            return [];
    }
}