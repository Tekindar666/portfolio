import styles from "./ProjectList.module.css";

const projects = [
  {
    name: "pi.nvim",
    repository: "pi.nvim",
    description: "A two-way bridge between Neovim and the Pi coding agent.",
  },
  {
    name: "HLS Stitching Lab",
    repository: "hls-stitching-lab",
    description: "A playground for learning HLS playlist stitching.",
  },
  {
    name: "Bothoven",
    repository: "bothoven",
    description: "A music bot for Discord.",
  },
  {
    name: "LeetTrack",
    repository: "leettrack",
    description: "A platform for planning and reviewing LeetCode practice.",
  },
  {
    name: "Meju",
    repository: "new_meju",
    description: "A weekly meal planner, rebuilt with Next.js.",
  },
  {
    name: "RustDrop",
    repository: "RustDrop",
    description: "Share files over a local network.",
  },
];

export function ProjectList() {
  return (
    <div className={styles.projects}>
      <h1 className={styles.heading}>Projects</h1>
      <ul className={styles.list}>
        {projects.map((project) => (
          <li key={project.repository} className={styles.project}>
            <a
              className={styles.name}
              href={`https://github.com/Tekindar666/${project.repository}`}
            >
              {project.name}
            </a>{" "}
            <span>{project.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
