export type UserRole = 'TRAVELER' | 'GUIDE' | 'ADMIN'

// exact : ["/my-profile", "settings"]
//   patterns: [/^\/dashboard/, /^\/patient/], // Routes starting with /dashboard/* /patient/*
export type RouteConfig = {
    exact: string[],
    patterns: RegExp[],
}

export const authRoutes = ["/login", "/register", "/forgot-password"];

export const commonProtectedRoutes: RouteConfig = {
    exact: ["/my-profile", "/settings", "/change-password", "/reset-password"],
    patterns: [], // [/password/change-password, /password/reset-password => /password/*]
}

export const guideProtectedRoutes: RouteConfig = {
    patterns: [/^\/guide/], // Routes starting with /guide/* 
    exact: [], // "/guide"
}

export const adminProtectedRoutes: RouteConfig = {
    patterns: [/^\/admin/], // Routes starting with /admin/*
    exact: [], // "/admins"
}

export const travelerProtectedRoutes: RouteConfig = {
    patterns: [/^\/traveler/], // Routes starting with /traveler/*
    exact: [], // "/traveler"
}

export const isAuthRoute = (pathname: string) => {
    return authRoutes.some((route: string) => route === pathname);
}

export const isRouteMatches = (pathname: string, routes: RouteConfig): boolean => {
    if (routes.exact.includes(pathname)) {
        return true;
    }
    return routes.patterns.some((pattern: RegExp) => pattern.test(pathname))
    // if pathname === /dashboard/my-appointments => matches /^\/dashboard/ => true
}

export const getRouteOwner = (pathname: string): 'TRAVELER' | 'GUIDE' | 'ADMIN' | 'COMMON' | null => {
    if (isRouteMatches(pathname, adminProtectedRoutes)) {
        return "ADMIN";
    }
    if (isRouteMatches(pathname, guideProtectedRoutes)) {
        return "GUIDE";
    }
    if (isRouteMatches(pathname, travelerProtectedRoutes)) {
        return "TRAVELER";
    }
    if (isRouteMatches(pathname, commonProtectedRoutes)) {
        return "COMMON";
    }
    return null;
}

export const getDefaultDashboardRoute = (role: UserRole): string => {
    if (role === "ADMIN") {
        return "/my-profile";
    }
    if (role === "TRAVELER") {
        return "/my-profile";
    }
    if (role === "GUIDE") {
        return "/my-profile";
    }
    return "/";
}

export const isValidRedirectForRole = (redirectPath: string, role: UserRole): boolean => {
    const routeOwner = getRouteOwner(redirectPath);

    if (routeOwner === null || routeOwner === "COMMON") {
        return true;
    }

    if (routeOwner === role) {
        return true;
    }

    return false;
}