import {
  createRootRoute,
  Link,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import styles from "./RootLayout.module.css";
import { useLayoutEffect, useRef, type PointerEvent } from "react";

export const Route = createRootRoute({
  component: RootLayout,
});

function measureActiveLink(
  nav: HTMLElement | null,
): { left: number; width: number } | null {
  const link = nav?.querySelector<HTMLAnchorElement>('a[data-status="active"]');
  if (!link) return null;
  return {
    left: link.offsetLeft,
    width: link.offsetWidth,
  };
}

function positionPill(
  pill: HTMLSpanElement | null,
  position: { left: number; width: number } | null,
) {
  if (!pill) return;

  pill.style.visibility = position ? "visible" : "hidden";
  if (!position) return;

  pill.style.transform = `translateX(${position.left}px)`;
  pill.style.width = `${position.width}px`;
}

function RootLayout() {
  const navRef = useRef<HTMLElement | null>(null);
  const pillRef = useRef<HTMLSpanElement | null>(null);
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  function handleLinkPointerEnter(event: PointerEvent<HTMLAnchorElement>) {
    if (event.pointerType === "touch") return;

    const link = event.currentTarget;
    positionPill(pillRef.current, {
      left: link.offsetLeft,
      width: link.offsetWidth,
    });
  }

  useLayoutEffect(() => {
    positionPill(pillRef.current, measureActiveLink(navRef.current));
  }, [pathname]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link className={styles.name} to="/">
          Edward Tan
        </Link>
        <nav
          ref={navRef}
          aria-label="Main Nav"
          onPointerLeave={() => {
            positionPill(pillRef.current, measureActiveLink(navRef.current));
          }}
        >
          <span ref={pillRef} className={styles.pill} aria-hidden="true" />
          <Link
            to="/"
            activeOptions={{ exact: true }}
            onPointerEnter={handleLinkPointerEnter}
          >
            About
          </Link>
          <Link to="/work" onPointerEnter={handleLinkPointerEnter}>
            Work
          </Link>
          <Link to="/projects" onPointerEnter={handleLinkPointerEnter}>
            Projects
          </Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
