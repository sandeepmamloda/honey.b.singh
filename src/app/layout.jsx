import "./globals.css";
import Navbar from "@/components/common/navbar/navbar";
import Footer from "@/components/common/footer/footer";
import SmoothScroll from "@/components/common/smooth-scroll/smoothscroll";
import Loader from "@/components/common/loader/loader";

export const metadata = {
  metadataBase: new URL("https://honey-b-singh.vercel.app"),
  title: {
    default: "Honey B. Singh — Films about Girlhood & Womanhood",
    template: "%s — Honey B. Singh",
  },
  description:
    "Directing and writing by South Asian women, mostly. One honest scene at a time — and the internet side, four times the volume.",
  keywords: [
    "Honey B Singh",
    "South Asian filmmaker",
    "women directors",
    "Punjabi film",
    "yoga teacher",
  ],
  authors: [{ name: "Honey B. Singh" }],
  creator: "Honey B. Singh",
  openGraph: {
    type: "website",
    siteName: "Honey B. Singh",
    locale: "en_US",
    images: ["/og/default.png"],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: { canonical: "/" },
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Loader>
          <SmoothScroll>
            <Navbar />
            {children}
            <Footer />
          </SmoothScroll>
        </Loader>
      </body>
    </html>
  );
}