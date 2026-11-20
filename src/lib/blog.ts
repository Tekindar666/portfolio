import { createBlogCatalog } from "./blog-catalog";

const metadata = import.meta.glob<unknown>("../blog/*/info.json", {
  eager: true,
  import: "default",
});
const content = import.meta.glob<string>("../blog/*/content.md", {
  query: "?raw",
  import: "default",
});

const assets = import.meta.glob<string>(
  "../blog/*/assets/*.{png,jpg,jpeg,gif,webp,svg,avif}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
);

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

export async function loadPostContent(slug: string) {
  const markdown = await content[`../blog/${slug}/content.md`]();
  return markdown.replace(
    /(!\[[^\]]*\]\()(?:\.\/)?(assets\/[^\s)]+)(\))/g,
    (_, opening: string, path: string, closing: string) => {
      const url = assets[`../blog/${slug}/${path}`];
      if (!url) throw new Error(`Blog post "${slug}": missing asset ${path}`);
      return `${opening}${url}${closing}`;
    },
  );
}
