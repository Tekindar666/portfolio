import { Link } from "@tanstack/react-router";
import { posts } from "../../lib/blog";
import styles from "../../routes/BlogPage.module.css";

export function BlogPage() {
  return (
    <section className={styles.page} aria-label="Blog posts">
      {posts.length === 0 && <p>No posts yet.</p>}
      <ul className={styles.list}>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to="/blog/$slug" params={{ slug: post.slug }}>
              {post.title}
            </Link>
            <time dateTime={post.date}>{post.date}</time>
          </li>
        ))}
      </ul>
    </section>
  );
}
