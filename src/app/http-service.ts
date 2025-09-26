import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private readonly baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  // Contract: Send prediction payload to backend
  // Input: PredictPayload shape with exact keys expected by API
  // Output: Backend response (typed loosely), as Observable
  predictYield(payload: PredictPayload): Observable<PredictResponse> {
    const url = `${this.baseUrl}/predict`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<PredictResponse>(url, payload, { headers });
  }
}

// Exact input keys as provided by user/backend contract
export interface PredictPayload {
  Crop: string;
  Crop_Year: number;
  Season: string;
  State: string;
  Area: number;
  Annual_Rainfall: number;
  Fertilizer: number;
  Pesticide: number;
}

// Minimal flexible response typing; actual service can extend this as backend stabilizes
export interface PredictResponse {
  predicted_yield?: number | string;
  yield?: number | string;
  Yield?: number | string;
  confidence?: number | string;
  [key: string]: unknown;
}
