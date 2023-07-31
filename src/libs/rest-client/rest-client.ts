import { RequestError } from "./request-error";
import {
  RequestWithBodyOptions,
  RequestOptions,
  RestClientConfig,
} from "./types";

export class RestClient {
  private config: RestClientConfig;
  private baseUrl: string;

  constructor({ baseUrl = "", ...config }: RestClientConfig = {}) {
    this.config = config;
    this.baseUrl = baseUrl;
  }

  get(url: string, options: RequestOptions = {}) {
    return this.doRequest(url, {
      ...options,
      method: "GET",
    });
  }

  post(url: string, options: RequestWithBodyOptions = {}) {
    return this.doRequest(url, {
      ...options,
      method: "POST",
      body: JSON.stringify(options.body),
    });
  }

  delete(url: string, options: RequestWithBodyOptions = {}) {
    return this.doRequest(url, {
      ...options,
      method: "DELETE",
      body: JSON.stringify(options.body),
    });
  }

  doRequest(url: string, { params, ...options }: RequestOptions) {
    const requestUrl = this.generateUrl(url, params);
    const requestOptions = this.mergeConfig(options);

    return fetch(requestUrl, requestOptions).then((response) => {
      if (response.ok) {
        return response.json();
      }

      const error = new RequestError(
        `HTTP status code: ${response.status}`,
        response
      );

      throw error;
    });
  }

  private mergeConfig(options: RequestInit) {
    return {
      ...this.config,
      ...options,
      headers: {
        ...this.config.headers,
        ...options.headers,
      },
    };
  }

  private generateUrl(target: string, params: object | undefined) {
    const queryParams = this.getParams(params);

    return `${this.baseUrl}${target}${queryParams}`;
  }

  private getParams(params: object | undefined) {
    if (!params) return "";

    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        searchParams.append(key, value);
      }
    });

    return `?${searchParams.toString()}`;
  }
}
