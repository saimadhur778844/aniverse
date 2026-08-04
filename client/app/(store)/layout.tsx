import Navbar from "@/components/store/Navbar/Navbar";
import Footer from "@/components/store/Footer/Footer";

// export default function StoreLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <>
//       <Navbar />
//       <main className="flex-1">{children}</main>
//       <Footer />
//     </>
//   );
// }
export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}