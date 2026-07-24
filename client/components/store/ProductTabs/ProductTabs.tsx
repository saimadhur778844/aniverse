"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";

import { Product } from "@/types/product";

import styles from "./ProductTabs.module.css";

interface ProductTabsProps {
  product: Product;
}

type Tab = "description" | "specifications" | "shipping";

const tabs: { id: Tab; label: string }[] = [
  { id: "description", label: "Description" },
  { id: "specifications", label: "Specifications" },
  { id: "shipping", label: "Shipping" },
];

export default function ProductTabs({
  product,
}: ProductTabsProps) {
  const [activeTab, setActiveTab] =
    useState<Tab>("description");

  const category = useMemo(() => {
    return typeof product.category === "string"
      ? product.category
      : product.category.name;
  }, [product.category]);

  return (
    <section className={styles.container}>
      <div
        className={styles.tabs}
        role="tablist"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={
              activeTab === tab.id
            }
            aria-controls={`${tab.id}-panel`}
            className={clsx(
              styles.tab,
              activeTab === tab.id &&
                styles.active
            )}
            onClick={() =>
              setActiveTab(tab.id)
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        id={`${activeTab}-panel`}
        role="tabpanel"
        className={styles.content}
      >
        {activeTab === "description" && (
          <p>{product.description}</p>
        )}

        {activeTab ===
          "specifications" && (
          <>
            {product.specifications?.length ? (
              <div className={styles.specGrid}>
                {product.specifications.map(
                  (spec) => (
                    <div
                      key={spec.label}
                      className={
                        styles.specRow
                      }
                    >
                      <span
                        className={
                          styles.specLabel
                        }
                      >
                        {spec.label}
                      </span>

                      <span
                        className={
                          styles.specValue
                        }
                      >
                        {spec.value}
                      </span>
                    </div>
                  )
                )}
              </div>
            ) : (
              <div
                className={
                  styles.specGrid
                }
              >
                <div
                  className={
                    styles.specRow
                  }
                >
                  <span
                    className={
                      styles.specLabel
                    }
                  >
                    Anime
                  </span>

                  <span
                    className={
                      styles.specValue
                    }
                  >
                    {product.anime}
                  </span>
                </div>

                <div
                  className={
                    styles.specRow
                  }
                >
                  <span
                    className={
                      styles.specLabel
                    }
                  >
                    Category
                  </span>

                  <span
                    className={
                      styles.specValue
                    }
                  >
                    {category}
                  </span>
                </div>

                <div
                  className={
                    styles.specRow
                  }
                >
                  <span
                    className={
                      styles.specLabel
                    }
                  >
                    Stock
                  </span>

                  <span
                    className={
                      styles.specValue
                    }
                  >
                    {product.stock}
                  </span>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === "shipping" && (
          <div className={styles.shipping}>
            <p>
              <strong>
                Dispatch:
              </strong>{" "}
              {product.shipping
                ?.dispatchTime ??
                "2–4 business days"}
            </p>

            <p>
              <strong>
                Packaging:
              </strong>{" "}
              {product.shipping
                ?.packaging ??
                "Premium protective packaging"}
            </p>

            <p>
              <strong>
                Courier:
              </strong>{" "}
              {product.shipping
                ?.courier ??
                "Trusted courier partner"}
            </p>

            <p>
              Tracking details are shared
              after dispatch.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}