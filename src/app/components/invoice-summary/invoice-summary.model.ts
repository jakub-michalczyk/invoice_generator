export interface CompanyResponse {
  metadata: Metadata;
  record: Company;
}

export interface Company {
  name: string;
  address: string;
  phones: string[];
}

export interface Metadata {
  createdAt: string;
  private: boolean;
  id: string;
}

export interface Item {
  name: string;
  count: number;
  price: number;
}
