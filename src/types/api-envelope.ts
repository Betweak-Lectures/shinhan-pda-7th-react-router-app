export interface ApiErrorEnvelope {
  success: false;
  error: {
    message: string;
    details?: string;
  };
}

export interface ApiResponeEnvelope<T> {
  success: true;
  data: T;
}

export interface ApiPaginationResponseEnvelope<T> {
  success: true;
  data: {
    items: T[];
    pagination: {
      page: number;
      pageSize: number;
      total: number;
      totalPages: number;
    };
  };
}

export type ApiEnvelope<T> = ApiResponeEnvelope<T> | ApiErrorEnvelope;
export type ApiPaginationEnvelope<T> =
  | ApiPaginationResponseEnvelope<T>
  | ApiErrorEnvelope;
