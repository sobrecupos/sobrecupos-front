export type RestClientConfig = RequestInit & {
  baseUrl?: string;
};

export type RequestOptions = RequestInit & {
  params?: object;
  next?: {
    tags?: string[];
    revalidate?: number;
    cache?: "no-store";
  };
};

export type RequestWithBodyOptions = Omit<RequestOptions, "body"> & {
  body?: Record<string, unknown> | FormData;
};
