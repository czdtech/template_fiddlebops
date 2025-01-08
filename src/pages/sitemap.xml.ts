import { config } from "@/config/site";
import type { APIRoute } from "astro";

const pages = ["", "#play-fiddlebops", "#features", "#faq"];

export const GET: APIRoute = async () => {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map(
          (page) => `
        <url>
          <loc>${new URL(page, config.env.siteUrl).toString()}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>${page === "" ? "1.0" : "0.7"}</priority>
        </url>`
        )
        .join("")}
    </urlset>`;

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
