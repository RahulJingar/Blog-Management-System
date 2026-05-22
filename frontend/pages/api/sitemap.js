import { getBlogs } from "../../lib/api";

export default async function handler(req, res) {
  try {
    const { data } = await getBlogs({ limit: 200 });
    const blogs = data.blogs || [];
    const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const staticPages = ["/", "/about", "/contact"].map(
      (p) => `<url><loc>${base}${p}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`
    );

    const blogPages = blogs.map(
      (b) => `<url><loc>${base}/blog/${b.slug}</loc><lastmod>${new Date(b.updatedAt).toISOString()}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>`
    );

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticPages, ...blogPages].join("\n")}
</urlset>`;

    res.setHeader("Content-Type", "text/xml");
    res.write(xml);
    res.end();
  } catch {
    res.status(500).send("Error generating sitemap");
  }
}
