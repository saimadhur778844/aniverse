import Link from "next/link";
import styles from "./AnnouncementBar.module.css";

export default function AnnouncementBar() {
  return <div className={styles.bar}><div className={styles.inner}><span>FREE SHIPPING ON ORDERS ABOVE ₹999</span><span className={styles.dot}>•</span><Link href="/products">SHOP ANIVERSE</Link></div></div>;
}
