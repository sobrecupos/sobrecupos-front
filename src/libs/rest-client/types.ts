export type RestClientConfig = RequestInit & {
  baseUrl?: string;
};

export type RequestOptions = RequestInit & {
  params?: object;
};

export type RequestWithBodyOptions = Omit<RequestOptions, 'body'> & {
  body?: Record<string, unknown>;
};
