export default function handler(req, res) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  res.setHeader("Content-Type", "text/plain");
  res.send(`User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${base}/api/sitemap`);
}
