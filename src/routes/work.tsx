import { createFileRoute } from "@tanstack/react-router";
import { WorkSection } from "../components/work/WorkSection";

export const Route = createFileRoute("/work")({
  component: WorkPage,
});

function WorkPage() {
  return <WorkSection />;
}
