import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OurError } from '../utils/our-error.utils';
import { SessionProvider } from './session.provider';

@Injectable({ providedIn: 'root' })
export class HttpProvider {
  constructor(protected http: HttpClient, public session: SessionProvider) {}

  async generateHeaders(customHeaders: any = {}) {
    const token = this.session.token;
    const basicHeaders: any = {};
    if (token) {
      basicHeaders.Authorization = `Bearer ${token}`;
    }
    const headers = {
      ...basicHeaders,
      ...customHeaders
    };

    return new HttpHeaders(headers);
  }

  async get<T>(url: string, params?: any, customHeaders: any = {}): Promise<T> {
    try {
      const headers = await this.generateHeaders(customHeaders);

      return await this.http.get<T>(url, { params, headers }).toPromise();
    } catch (err) {
      this.exceptionHandler(err);
    }
  }

  async post<T>(url: string, body?: any, customHeaders: any = {}): Promise<T> {
    try {
      const headers = await this.generateHeaders(customHeaders);

      return await this.http.post<T>(url, body, { headers }).toPromise();
    } catch (err) {
      this.exceptionHandler(err);
    }
  }

  async delete(url: string, params?: any, customHeaders: any = {}) {
    try {
      const headers = await this.generateHeaders(customHeaders);

      return await this.http
        .delete<number>(url, { headers, params })
        .toPromise();
    } catch (err) {
      this.exceptionHandler(err);
    }
  }

  protected exceptionHandler(err: HttpErrorResponse) {
    if (err.status === 401) {
      this.session.logout();
      throw new OurError('Sessão expirada. Por favor, faça login novamente.');
    }

    if (err.error?.mensagem) {
      throw new OurError(err.error.mensagem);
    } else {
      throw err.message;
    }
  }
}
