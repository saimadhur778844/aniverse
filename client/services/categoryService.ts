import api from "./api";

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  isActive?: boolean;
}

export interface CategoryResponse {
  success?: boolean;
  categories: Category[];
}

export interface SingleCategoryResponse {
  success?: boolean;
  category: Category;
}

export interface CategoryPayload {
  name: string;
  slug?: string;
  description?: string;
  image?: string;
  isActive?: boolean;
}

class CategoryService {
  async getCategories(): Promise<Category[]> {
    const { data } = await api.get<Category[] | CategoryResponse>(
      "/categories"
    );

    return Array.isArray(data)
      ? data
      : data.categories;
  }

  async createCategory(
    category: CategoryPayload
  ): Promise<Category> {
    const { data } =
      await api.post<SingleCategoryResponse>(
        "/categories",
        category
      );

    return data.category;
  }

  async updateCategory(
    id: string,
    category: CategoryPayload
  ): Promise<Category> {
    const { data } =
      await api.put<SingleCategoryResponse>(
        `/categories/${id}`,
        category
      );

    return data.category;
  }

  async deleteCategory(
    id: string
  ): Promise<void> {
    await api.delete(`/categories/${id}`);
  }
}

const categoryService =
  new CategoryService();

export default categoryService;