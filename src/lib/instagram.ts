export function extractInstagramUrls(project: any): string[] {
  if (!project) return [];

  const possibleFields = [
    project.IGLinks,
    project.igLinks,
    project.igLink,
    project.IgLinks,
    project.ig_links,
    project.reelLinks,
    project.instagramLinks,
    project.socialLinks,
  ];

  const urls: string[] = [];
  const regex = /(https?:\/\/(www\.)?instagram\.com\/(reel|p|reels|tv)\/[a-zA-Z0-9_-]+)/gi;

  for (const field of possibleFields) {
    if (!field) continue;

    if (Array.isArray(field)) {
      field.forEach((item) => {
        if (typeof item === "string") {
          const matches = item.match(regex);
          if (matches) urls.push(...matches);
        } else if (item && typeof item === "object") {
          const str = JSON.stringify(item);
          const matches = str.match(regex);
          if (matches) urls.push(...matches);
        }
      });
    } else if (typeof field === "string") {
      const matches = field.match(regex);
      if (matches) urls.push(...matches);
    } else if (typeof field === "object") {
      const str = JSON.stringify(field);
      const matches = str.match(regex);
      if (matches) urls.push(...matches);
    }
  }

  // Fallback search across entire project JSON if empty
  if (urls.length === 0) {
    const fullStr = JSON.stringify(project);
    const matches = fullStr.match(regex);
    if (matches) urls.push(...matches);
  }

  // Deduplicate and clean trailing slashes
  const unique = Array.from(new Set(urls.map((u) => u.trim())));
  return unique;
}
