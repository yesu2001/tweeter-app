"use client";
import "./globals.css";
import Header from "@/components/Header";
import StoreProvider from "@/reducers/StoreProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#F2F2F2]">
        <StoreProvider>
          <Header />
          <main className="h-full flex ">{children}</main>
        </StoreProvider>
      </body>
    </html>
  );
}
