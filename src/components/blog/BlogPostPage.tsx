import { getRouteApi, Link } from "@tanstack/react-router";
import Markdown from "react-markdown";
import styles from "../../routes/BlogPage.module.css";

const postRoute = getRouteApi("/blog/$slug");

export function BlogPostPage() {
  const { post, content } = postRoute.useLoaderData();
  return (
    <article className={styles.page}>
      <header>
        <h1>{post.title}</h1>
        <time dateTime={post.date}>{post.date}</time>
      </header>
      <div className={styles.content}>
        <Markdown skipHtml>{content}</Markdown>
      </div>
      <Link className={styles.backLink} to="/blog">
        ← All posts
      </Link>
    </article>
  );
}
