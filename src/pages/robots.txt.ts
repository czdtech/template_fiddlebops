import { config } from "@/config/site";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const body = `
User-agent: *
Allow: /

# Sitemap
Sitemap: ${new URL("sitemap.xml", config.env.siteUrl).toString()}

# Host
Host: ${config.env.siteUrl}
  `.trim();

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
