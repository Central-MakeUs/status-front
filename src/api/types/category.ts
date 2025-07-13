export interface CategoryDTO {
  id: string;
  name: string;
}

export interface GetRandomCategoriesByAttributesParams {
  attributeIds?: number[];
  limit?: number;
}
