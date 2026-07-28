"use client";

import styles from "./PasswordStrength.module.css";

interface Props {
  password: string;
}

export default function PasswordStrength({
  password,
}: Props) {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];

  const score = checks.filter(Boolean).length;

  const getLabel = () => {
    if (score <= 2) return "Weak";
    if (score <= 4) return "Medium";
    return "Strong";
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.bars}>
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className={`${styles.bar} ${
              item <= score
                ? styles.active
                : ""
            }`}
          />
        ))}
      </div>

      <span className={styles.label}>
        {getLabel()}
      </span>
    </div>
  );
}