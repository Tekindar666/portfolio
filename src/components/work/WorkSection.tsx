import styles from "./WorkSection.module.css";

const experience = [
  {
    company: "Inkitt",
    role: "Software Engineer",
    dates: "Apr 2026 – Oct 2026",
    description:
      "Owned the video production pipeline for a video streaming app, including the CMS and video splitting and upload tools. Refactored the video player across backend, web, and mobile. Built monetization experiments to support business goals.",
  },
  {
    company: "Inkitt",
    role: "Software Engineering Intern",
    dates: "Feb 2026 – Apr 2026",
    description:
      "Worked on a small, fast-moving team. Fixed stale-data caching issues in web apps and built infrastructure for content A/B testing for a video streaming app.",
  },
  {
    company: "GTSP Group",
    role: "Software Intern",
    dates: "Dec 2024 – Mar 2025",
    description: "Designed a 3D landing page for the business.",
  },
];

export function WorkSection() {
  return (
    <section className={styles.section} aria-labelledby="work-heading">
      <h2 id="work-heading" className={styles.heading}>Work</h2>
      <ul className={styles.list}>
        {experience.map((job) => (
          <li key={`${job.company}-${job.role}`}>
            <div className={styles.company}>
              <h3>{job.company}</h3>
              <p className={styles.dates}>{job.dates}</p>
            </div>
            <p className={styles.role}>{job.role}</p>
            <p className={styles.description}>{job.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
