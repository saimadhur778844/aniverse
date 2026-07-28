"use client";

import styles from "./PasswordStrength.module.css";

interface PasswordStrengthProps {
  password: string;
}

export default function PasswordStrength({
  password,
}: PasswordStrengthProps) {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];

  const score = checks.filter(Boolean).length;

  const getStrength = () => {
    if (score <= 2) {
      return {
        label: "Weak",
        className: styles.weak,
      };
    }

    if (score <= 4) {
      return {
        label: "Medium",
        className: styles.medium,
      };
    }

    return {
      label: "Strong",
      className: styles.strong,
    };
  };

  const strength = getStrength();

  return (
    <div className={styles.container}>
      <div className={styles.bars}>
        {[1, 2, 3, 4, 5].map((bar) => (
          <span
            key={bar}
            className={`${styles.bar} ${
              bar <= score
                ? strength.className
                : ""
            }`}
          />
        ))}
      </div>

      <span className={styles.label}>
        Password Strength:{" "}
        <strong>{strength.label}</strong>
      </span>
    </div>
  );
}