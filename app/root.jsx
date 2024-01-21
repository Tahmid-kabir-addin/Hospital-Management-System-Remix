import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";

import Error from "./components/Error";
import styles from "./tailwind.css";
function Document({ title, children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <Meta />
        <Links />
        <title>{title}</title>
      </head>
      <body className="bg-gradient-to-r from-slate-300 to-slate-350">
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export function ErrorBoundary() {
  const error = useRouteError();
  let title = "An error occurred";
  if (isRouteErrorResponse(error)) {
    title = error.statusText;
  }
  return (
    <Document title={title}>
      <main>
        <Error />
        <p>
          {error.message ?? "Something went wrong. Please try again later."}
        </p>
        <p>
          Back to <Link to="/">safety!</Link>
        </p>
        {/* </Error> */}
      </main>
    </Document>
  );
}

// export async function loader() {
//   const uname = await getUser(request);
//   console.log("🚀 ~ loader ~ uname:", uname);
//   if (!uname) return redirect("/");
// }
