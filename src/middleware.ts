// import { withAuth } from "next-auth/middleware";

// export default withAuth(function middleware(a) {}, {
//   secret: process.env.NEXTAUTH_SECRET,
//   callbacks: {
//     authorized(params) {
//       console.log(params.req.nextUrl.pathname, "asidjjfiasjdf");
//       // console.log(params.token, "asjdifjiasdjfjasdif");
//       return !!params.token;
//     },
//   },
// });

// export const config = {
//   matcher: ["/auth/login", "/calendar", "/gallery/add", "/profile"],
// };

export default function middleware() {}
