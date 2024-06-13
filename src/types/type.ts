export interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface RequestBody {
  messages: string[];
}

export type Theme = "default" | "neutral" | "dark" | "forest" | "base";

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
}
