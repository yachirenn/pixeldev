import Navigation from "@/components/public/layouts/Navigation";
import Footer from "@/components/public/layouts/Footer";
import BackToTop from "@/components/public/layouts/BackToTop";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <main>{children}</main>
      <Footer />
      <BackToTop />
    </>
  );
}