import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { Analytics, type BeforeSendEvent } from "@vercel/analytics/react";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function trackAboutOnly(event: BeforeSendEvent) {
  return new URL(event.url).pathname === "/" ? event : null;
}

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Analytics beforeSend={trackAboutOnly} />
    </>
  );
}
