export type Platform = "web" | "react-native" | "ios" | "android";

export interface PlatformInfo {
  id: Platform;
  name: string;
  icon: string;
  language: string;
  fileExtension: string;
}

export const PLATFORMS: PlatformInfo[] = [
  {
    id: "web",
    name: "Web",
    icon: "🌐",
    language: "tsx",
    fileExtension: ".tsx",
  },
  {
    id: "react-native",
    name: "React Native",
    icon: "📱",
    language: "tsx",
    fileExtension: ".tsx",
  },
  {
    id: "ios",
    name: "iOS (SwiftUI)",
    icon: "🍎",
    language: "swift",
    fileExtension: ".swift",
  },
  {
    id: "android",
    name: "Android (Compose)",
    icon: "🤖",
    language: "kotlin",
    fileExtension: ".kt",
  },
];

export function getPlatformInfo(platform: Platform): PlatformInfo {
  return PLATFORMS.find((p) => p.id === platform) || PLATFORMS[0];
}
