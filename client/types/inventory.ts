export interface InventoryProduct {
  _id: string;

  name: string;

  sku?: string;

  anime: string;

  image: string;

  stock: number;

  reservedStock: number;

  incomingStock: number;

  availableStock: number;

  minimumStock: number;

  purchasePrice: number;

  price: number;

  profit: number;

  warehouse: string;

  supplier: string;

  category?: {
    _id: string;
    name: string;
  };
}

export interface InventoryAnalytics {
  inventoryValue: number;

  lowStock: number;

  outOfStock: number;

  incoming: number;
}

export interface InventoryResponse {
  products: InventoryProduct[];

  total: number;

  page: number;

  pages: number;
}