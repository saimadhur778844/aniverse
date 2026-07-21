import api from "@/lib/axios";

export const getCategories = async () => {
  const { data } = await api.get("/categories");

  return data;
};

export const createCategory = async (category: any) => {
  const { data } = await api.post(
    "/categories",
    category
  );

  return data;
};

export const updateCategory = async (
  id: string,
  category: any
) => {
  const { data } = await api.put(
    `/categories/${id}`,
    category
  );

  return data;
};

export const deleteCategory = async (id: string) => {
  const { data } = await api.delete(`/categories/${id}`);

  return data;
};