export const isAllowedVisitorPath = (pathname: string): boolean => {
    if (pathname === "/") return true;
    if (pathname === "/tours") return true;

    // /tours/details/:id
    const tourDetailsRegex = /^\/tours\/details\/[^/]+$/;
    return tourDetailsRegex.test(pathname);
};