import type { Metadata } from "next";
import "./globals.css"; 

export const metadata: Metadata = {
  title: "Starship Database",
  description: "Browse and search for starships from the Star Wars universe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Browse and search for starships from the Star Wars universe." />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
