import { createBlogCatalog } from "./blog-catalog";

const metadata = import.meta.glob<unknown>("../blog/*/info.json", {
  eager: true,
  import: "default",
});
const content = import.meta.glob<string>("../blog/*/content.md", {
  query: "?raw",
  import: "default",
});

function slugFromPath(path: string) {
  return path.split("/").at(-2)!;
}

export const posts = createBlogCatalog(
  Object.fromEntries(
    Object.entries(metadata).map(([path, info]) => [slugFromPath(path), info]),
  ),
  Object.keys(content).map(slugFromPath),
);

export function findPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function loadPostContent(slug: string) {
  return content[`../blog/${slug}/content.md`]();
}
