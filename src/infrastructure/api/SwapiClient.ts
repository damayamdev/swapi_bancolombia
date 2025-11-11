import {
  ApiError,
  NetworkError,
  NotFoundError,
  type SwapiPersonajeResponse,
  type SwapiVehiculoResponse,
  type SwapiBusquedaResponse,
} from './types';

export class SwapiClient {
  private readonly baseUrl: string;
  private readonly timeout: number;

  constructor(baseUrl = 'https://swapi.dev/api', timeout = 5000) {
    this.baseUrl = baseUrl;
    this.timeout = timeout;
  }

  private async fetchWithTimeout(url: string, options: RequestInit = {}): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof Error && error.name === 'AbortError') {
        throw new NetworkError('Tiempo de espera de la solicitud agotado.');
      }

      throw new NetworkError('Ocurrió un error de red', error);
    }
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (response.status === 404) {
      throw new NotFoundError('Recurso no encontrado');
    }

    if (!response.ok) {
      throw new ApiError(`Error HTTP: ${response.status}`, response.status);
    }

    try {
      return await response.json();
    } catch (error) {
      throw new ApiError('Respuesta JSON no válida', response.status, error);
    }
  }

  async getPersonaje(id: string): Promise<SwapiPersonajeResponse> {
    const url = `${this.baseUrl}/people/${id}/`;
    const response = await this.fetchWithTimeout(url);
    return this.handleResponse<SwapiPersonajeResponse>(response);
  }

  async buscarPersonajes(name: string): Promise<SwapiBusquedaResponse<SwapiPersonajeResponse>> {
    const url = `${this.baseUrl}/people/?search=${encodeURIComponent(name)}`;
    const response = await this.fetchWithTimeout(url);
    return this.handleResponse<SwapiBusquedaResponse<SwapiPersonajeResponse>>(response);
  }

  async getAllPersonajes(page = 1): Promise<SwapiBusquedaResponse<SwapiPersonajeResponse>> {
    const url = `${this.baseUrl}/people/?page=${page}`;
    const response = await this.fetchWithTimeout(url);
    return this.handleResponse<SwapiBusquedaResponse<SwapiPersonajeResponse>>(response);
  }

  async getVehiculoByUrl(url: string): Promise<SwapiVehiculoResponse> {
    const response = await this.fetchWithTimeout(url);
    return this.handleResponse<SwapiVehiculoResponse>(response);
  }
}

export const swapiClient = new SwapiClient();
