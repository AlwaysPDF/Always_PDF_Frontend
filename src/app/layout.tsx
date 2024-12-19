import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ContextProvider } from "@/components/ContextApi/ContextApi";
// cp -R ./node_modules/pspdfkit/dist/pspdfkit-lib public/pspdfkit-lib

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Always PDF",
  description: "An app to answer questions based on the pdf or document you upload",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/assets/favicon.png" type="image/x-icon" />
        {/* External Stylesheets for Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
          integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body>
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  );
}
