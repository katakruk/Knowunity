import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Knowie",
  description: "Voice active recall for Knowunity",
  appleWebApp: {
    capable: true,
    title: "Knowie",
    // Lets the web app draw under the status bar when launched from the home
    // screen, which is what makes env(safe-area-inset-top) meaningful.
    statusBarStyle: "black-translucent",
  },
};

// viewportFit: 'cover' is what makes env(safe-area-inset-*) resolve to real
// values instead of 0. It is a supported field on Next's ViewportLayout type
// (node_modules/next/dist/lib/metadata/types/extra-types.d.ts) even though the
// bundled generateViewport doc page omits it from its field list.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  colorScheme: "dark",
  // The one literal colour in the app. A <meta> tag cannot read a CSS custom
  // property, so this cannot come from a token. Value is --background-page.
  // If that token changes, change this with it.
  themeColor: "#090c18",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
