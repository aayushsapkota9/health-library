import Cookies from 'js-cookie';
import { EHttpMethod } from '../types/index';

class HttpService {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_BASE_URL || '';
  }

  // Get authorization token for requests
  private getAuthorization(): Record<string, string> {
    const accessToken = Cookies.get('AccessToken') || '';
    return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
  }

  // Initialize service configuration
  public service(): HttpService {
    return this;
  }

  // Set up request headers
  private setupHeaders(hasAttachment = false): Record<string, string> {
    return hasAttachment
      ? { ...this.getAuthorization() }
      : { 'Content-Type': 'application/json', ...this.getAuthorization() };
  }

  // Handle HTTP requests using Fetch API
  private async request<T>(
    method: EHttpMethod,
    url: string,
    options: RequestInit
  ): Promise<T> {
    try {
      const customOptions = {
        headers: new Headers(options.headers),
        ...options.next,
      };
      const response = await fetch(`${this.baseURL}${url}`, {
        method,
        ...customOptions,
        body: options.body, // Include the body property if it exists
      });

      return (await response.json()) as T;
    } catch (error) {
      return this.normalizeError(error);
    }
  }

  // Perform GET request
  public async get<T>(
    url: string,
    customOptions: Record<string, any> = {}
  ): Promise<T> {
    const hasAttachment = false;
    const options: RequestInit = {
      headers: this.setupHeaders(hasAttachment),
      ...customOptions,
    };

    return this.request<T>(EHttpMethod.GET, url, options);
  }

  // Perform POST request with JSON payload
  public async post<T, P>(
    url: string,
    payload: P,
    hasAttachment = false
  ): Promise<T> {
    return this.request<T>(EHttpMethod.POST, url, {
      body: JSON.stringify(payload),
      headers: this.setupHeaders(hasAttachment),
    });
  }

  // Perform POST request with FormData
  public async postFormData<T>(url: string, formData: FormData): Promise<T> {
    return this.request<T>(EHttpMethod.POST, url, {
      body: formData,
      headers: this.setupHeaders(true), // Set isFormData to true
    });
  }
  public async patchFormData<T>(url: string, formData: FormData): Promise<T> {
    return this.request<T>(EHttpMethod.PUT, url, {
      body: formData,
      headers: this.setupHeaders(true), // Set isFormData to true
    });
  }
  // Perform UPDATE request
  public async update<T, P>(
    url: string,
    payload: P,
    hasAttachment = false
  ): Promise<T> {
    return this.request<T>(EHttpMethod.PUT, url, {
      body: JSON.stringify(payload),
      headers: this.setupHeaders(hasAttachment),
    });
  }

  // Perform DELETE request
  public async remove<T>(url: string): Promise<T> {
    const hasAttachment = false;
    return this.request<T>(EHttpMethod.DELETE, `${url}`, {
      headers: this.setupHeaders(hasAttachment),
    });
  }

  // Normalize errors
  private normalizeError(error: any): Promise<any> {
    return Promise.reject(error);
  }
}

export default HttpService;
