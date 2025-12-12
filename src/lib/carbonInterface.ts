import axios, { AxiosInstance } from 'axios';
import { CarbonAPIResponse, EstimateRequest } from '../types';

const API_KEY = process.env.CARBON_INTERFACE_API_KEY;
const BASE_URL = 'https://www.carboninterface.com/api/v1';

export class CarbonInterfaceService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
  }

  async createEstimate(request: EstimateRequest): Promise<CarbonAPIResponse> {
    const response = await this.client.post('/estimates', request);
    return response.data;
  }

  async getEstimate(id: string): Promise<CarbonAPIResponse> {
    const response = await this.client.get(`/estimates/${id}`);
    return response.data;
  }

  async getVehicleMakes(): Promise<any> {
    const response = await this.client.get('/vehicle_makes');
    return response.data;
  }

  async getVehicleModels(makeId: string): Promise<any> {
    const response = await this.client.get(`/vehicle_makes/${makeId}/vehicle_models`);
    return response.data;
  }
}

export const carbonAPI = new CarbonInterfaceService();