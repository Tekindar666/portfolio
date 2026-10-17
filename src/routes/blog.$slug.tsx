import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BlogPostPage } from "../components/blog/BlogPostPage";
import { findPost, loadPostContent } from "../lib/blog";
import styles from "./BlogPage.module.css";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = findPost(params.slug);
    if (!post) throw notFound();
    return { post, content: await loadPostContent(post.slug) };
  },
  component: BlogPostPage,
  pendingComponent: () => <p>Loading post…</p>,
  errorComponent: () => (
    <section className={styles.page}>
      <h1>Unable to load post</h1>
      <p>Please refresh to try again.</p>
      <Link to="/blog">Back to blog</Link>
    </section>
  ),
  notFoundComponent: () => (
    <section className={styles.page}>
      <h1>Post not found</h1>
      <Link to="/blog">Back to blog</Link>
    </section>
  ),
});

