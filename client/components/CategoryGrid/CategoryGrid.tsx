interface CategoryGridProps {
  categories?: string[];
}

const defaultCategories = ["Figures", "Katanas", "Clothing", "Accessories"];

export default function CategoryGrid({
  categories = defaultCategories,
}: CategoryGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {categories.map((category) => (
        <div
          key={category}
          className="rounded-xl bg-white p-6 text-center font-semibold shadow"
        >
          {category}
        </div>
      ))}
    </div>
  );
}
