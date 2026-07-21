import styles from "./SectionTitle.module.css";

interface SectionTitleProps {
  title: string;
  subtitle: string;
}

export default function SectionTitle({
  title,
  subtitle,
}: SectionTitleProps) {
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
}