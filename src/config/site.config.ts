import { NavItem } from "@/types/type";

interface SiteConfig {
  name: string;
  description: string;
  mainNav: NavItem[];
  links: {
    twitter: string;
    github: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "FlowchartAI",
  description: "Draw diagram with natural language.",
  mainNav: [],
  links: {
    twitter: "https://twitter.com",
    github: "https://github.com/sixshootercat",
  },
};
