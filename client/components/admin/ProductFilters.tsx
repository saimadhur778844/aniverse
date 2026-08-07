"use client";

interface ProductFiltersProps {
  search: string;
  category: string;
  anime: string;
  status: string;
  featured: string;

  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onAnimeChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onFeaturedChange: (value: string) => void;
}

export default function ProductFilters({
  search,
  category,
  anime,
  status,
  featured,
  onSearchChange,
  onCategoryChange,
  onAnimeChange,
  onStatusChange,
  onFeaturedChange,
}: ProductFiltersProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">

      <div className="grid gap-4 lg:grid-cols-5">

        <input
          value={search}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
          placeholder="Search products..."
          className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
        />

        <select
          value={category}
          onChange={(e) =>
            onCategoryChange(e.target.value)
          }
          className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
        >
          <option value="">
            All Categories
          </option>
        </select>

        <input
          value={anime}
          onChange={(e) =>
            onAnimeChange(e.target.value)
          }
          placeholder="Anime"
          className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
        />

        <select
          value={status}
          onChange={(e) =>
            onStatusChange(e.target.value)
          }
          className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
        >
          <option value="">
            All Status
          </option>

          <option value="published">
            Published
          </option>

          <option value="draft">
            Draft
          </option>

          <option value="archived">
            Archived
          </option>

        </select>

        <select
          value={featured}
          onChange={(e) =>
            onFeaturedChange(e.target.value)
          }
          className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
        >
          <option value="">
            All Products
          </option>

          <option value="true">
            Featured
          </option>

          <option value="false">
            Regular
          </option>

        </select>

      </div>

    </div>
  );
}