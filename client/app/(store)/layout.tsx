import Navbar from "@/components/store/Navbar/Navbar";
import AnnouncementBar from "@/components/store/AnnouncementBar";
import Footer from "@/components/store/Footer/Footer";

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
