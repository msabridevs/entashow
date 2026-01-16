import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://entashow.com";
  const now = new Date();

  return [
    { url: `${base}/ar`, lastModified: now },
    { url: `${base}/en`, lastModified: now },
    { url: `${base}/ar/explore`, lastModified: now },
    { url: `${base}/en/explore`, lastModified: now },
    { url: `${base}/ar/about`, lastModified: now },
    { url: `${base}/en/about`, lastModified: now },
    { url: `${base}/ar/contact`, lastModified: now },
    { url: `${base}/en/contact`, lastModified: now },
    { url: `${base}/privacy`, lastModified: now },
    { url: `${base}/terms`, lastModified: now },
  ];
}

