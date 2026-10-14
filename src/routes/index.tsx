import { createFileRoute } from "@tanstack/react-router";
import styles from "./AboutPage.module.css";

export const Route = createFileRoute("/")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <h1 className={styles.heading}>About</h1>
      <p>
        I’m a full-stack engineer based in San Francisco. I build products and
        platforms used by millions of people.
      </p>
      <p>
        Over time, I’ve come to care most about building software that’s easy to
        use and maintain. Software should work—and make things easier for the
        people using it.
      </p>
      <p>
        I enjoy using AI to ship faster and digging into how things work under
        the hood.
      </p>
      <section aria-labelledby="education-heading">
        <h2 id="education-heading" className={styles.heading}>Education</h2>
        <p>
          I hold a double degree from the University of Rochester (2021–2025): a
          Bachelor of Science in Computer Science, and a Bachelor of Science in
          Business Information Systems.
        </p>
      </section>
    </div>
  );
}
