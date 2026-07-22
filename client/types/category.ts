export interface Category {
  _id: string;
  name: string;
  slug?: string;
  description?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoryInput {
  name: string;
  description?: string;
  image?: string;
}
