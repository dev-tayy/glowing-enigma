export type RepositoryFindAll<T> = {
  docs: T[];
  limit: number;
  total: number;
  currentPage: number;
  hasNext: boolean;
  remainingCount: number;
  totalPages: number;
};

export type IResponse<T = void | {}> = {
  status: boolean;
  message: string;
  data?: T;
  error?: string | object;
  code?: number;
};
