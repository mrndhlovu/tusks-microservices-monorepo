import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { IAxiosInterceptorError } from '.';
import { getErrorMessage, isBrowser } from '../util';
import END_POINTS from './endpoints';

export interface ISsHeaders extends AxiosRequestConfig {
  [key: string]: any;
}

const excludeRedirectUrls = [END_POINTS.verifyOtp];

export class AxiosConfig {
  ssrHeaders?: ISsHeaders;

  bearerToken?: string;

  http: AxiosInstance;

  constructor(ssrHeaders?: ISsHeaders) {
    this.ssrHeaders = ssrHeaders;

    this.http = axios.create({
      baseURL: isBrowser
        ? `/api`
        : `${process.env.NEXT_PUBLIC_NGINX_BASE_URL}/api`,
      headers: ssrHeaders || {},
    });

    this.http.interceptors.request.use(
      request => this.reqHandlerHandler(request),
      error => this.errorHandler(error),
    );

    this.http.interceptors.response.use(
      request => this.responseHandler(request),
      error => this.errorHandler(error),
    );
  }

  private responseHandler = (response: AxiosResponse) => {
    return response;
  };

  private reqHandlerHandler = (request: AxiosRequestConfig) => {
    if (this.bearerToken) {
      request.headers.authorization = `Bearer ${this.bearerToken}`;
    }

    return request;
  };

  private errorHandler = (error: AxiosError) => {
    const message = getErrorMessage(error?.response?.data);

    if (!isBrowser && error) {
      return Promise.reject({
        status: error?.response?.status || 500,
        message,
      });
    }
    const notificationEvent = new CustomEvent('ERROR_NOTIFICATION', {
      detail: message?.[0],
    });

    window.dispatchEvent(notificationEvent);

    if (
      message.indexOf('SESSION EXPIRED') > -1 &&
      error?.response?.status === 401 &&
      !excludeRedirectUrls?.includes(error?.config?.url)
    ) {
      const sessionExpireEvent = new CustomEvent('SESSION_EXPIRED');
      window.dispatchEvent(sessionExpireEvent);
      return;
    }

    if (
      (message.indexOf('SESSION EXPIRED') > -1 ||
        message.indexOf('jwt expired') > -1) &&
      error.response.status === 400
    ) {
      return this.refreshToken(error.config).catch(err => {
        throw new Error('Access denied, please login again');
      });
    }

    if (
      message.indexOf('SESSION EXPIRED') > -1 &&
      error.response.status === 400
    ) {
      return this.refreshToken(error.config).catch(err => {
        throw new Error('Access denied, please login again');
      });
    }

    const data: IAxiosInterceptorError = {
      status: error?.response?.status || 500,
      message,
    };

    return Promise.reject(data);
  };

  private async refreshToken(config: AxiosError['config']) {
    const response = await this.http
      .get(END_POINTS.refreshToken)
      .catch((error: AxiosError) => {
        const event = new Event('SESSION_EXPIRED');
        window.dispatchEvent(event);
        return error;
      });

    if (response?.status === 200) {
      return await this.http(config).then((res: AxiosResponse) => res?.data);
    }

    return response;
  }
}
