import { HttpClient } from '@angular/common/http';
import { API } from 'src/environments/environment';
import {
  IFilter,
  IPaginator,
  IRetornoList,
  ISorting
} from '../components/grid';
import { HttpProvider } from '../providers/http.provider';
import { SessionProvider } from '../providers/session.provider';

export abstract class BaseGridApi<T> {
  abstract list(
    params: ISorting<T> & IPaginator & IFilter
  ): Promise<IRetornoList<any>>;
  abstract remove(id: number): Promise<number>;
}

export class BaseApi<T> extends HttpProvider implements BaseGridApi<T> {
  protected baseUrl: string;

  constructor(
    protected entity: string,
    protected http: HttpClient,
    protected session: SessionProvider
  ) {
    super(http, session);

    this.baseUrl = `${API}/${entity}`;
  }

  async list(params: ISorting<T> & IPaginator & IFilter) {
    return this.get<IRetornoList<T>>(`${this.baseUrl}`, params);
  }

  async labels(filtro?: number) {
    const complemento = filtro || '';

    return this.get<T[]>(`${this.baseUrl}/labels/${complemento}`);
  }

  async getById(id: number) {
    return this.get<T>(`${this.baseUrl}/${id}`);
  }

  async save(item: T) {
    return this.post<number>(`${this.baseUrl}`, item);
  }

  async remove(id: number) {
    return super.delete(`${this.baseUrl}/${id}`);
  }
}
