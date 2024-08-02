import { NextRequestWithAuth, withAuth } from "next-auth/middleware";

const RESTRIC_ROUTE = ["/zod", "/cookie", "/redirect"];
const AUTH_PAGE = "/auth-nextAuth";
const HOME_PAGE = "/";
export default withAuth(
  async function middleware(req: NextRequestWithAuth) {
    const auth = req.nextauth;

    if (req.nextUrl.pathname === AUTH_PAGE && auth.token) {
      //return Response.redirect(req.url);// 이렇게 하면 무한 redirection된다.
      return Response.redirect(new URL(HOME_PAGE, req.url));
    }
  },
  {
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      authorized({ req, token }) {
        const { nextUrl } = req;
        const isAuthenticated = !!token;
        const isPublicRoute = RESTRIC_ROUTE.includes(nextUrl.pathname);
        if (isAuthenticated && !isPublicRoute) return true;
        if (!isAuthenticated && isPublicRoute) return false;
        return true;
      },
    },
  },
);

export const config = {
  matcher: ["/zod", "/cookie", "/redirect", "/auth-nextAuth"],
};

// 로그인 전, 로그인page O, restricRoute X
// 로그인 후, 로그인 page X , restricRoute O
