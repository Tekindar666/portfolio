import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: AboutPage,
});

function AboutPage() {
  return <div>Hello!</div>;
}
