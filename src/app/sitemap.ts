import type { MetadataRoute } from "next";

import { personal } from "@/data/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: personal.portfolio,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
