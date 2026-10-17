export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
}

/** Checks content pairs and metadata before exposing posts to the UI. */
export function createBlogCatalog(
  metadata: Record<string, unknown>,
  contentSlugs: string[],
): BlogPost[] {
  const slugs = new Set([...Object.keys(metadata), ...contentSlugs]);
  const content = new Set(contentSlugs);
  const posts: BlogPost[] = [];

  for (const slug of slugs) {
    const fail = (message: string): never => {
      throw new Error(`Blog post "${slug}": ${message}`);
    };
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      fail("folder name must use lowercase letters, numbers, and hyphens");
    }
    if (!content.has(slug)) fail("missing content.md");
    const info = metadata[slug];
    if (!info || typeof info !== "object" || Array.isArray(info)) {
      fail("missing or invalid info.json");
    }
    const fields = info as Record<string, unknown>;
    for (const key of ["title", "date", "description"]) {
      if (typeof fields[key] !== "string" || !fields[key].trim()) {
        fail(`${key} must be a non-empty string`);
      }
    }
    const { title, date, description } = fields as Record<string, string>;
    const parsed = new Date(`${date}T00:00:00Z`);
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      !Number.isFinite(parsed.getTime()) ||
      parsed.toISOString().slice(0, 10) !== date
    ) {
      fail("date must be a real calendar date in YYYY-MM-DD format");
    }
    posts.push({ slug, title, date, description });
  }

  return posts.sort(
    (a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug),
  );
}
