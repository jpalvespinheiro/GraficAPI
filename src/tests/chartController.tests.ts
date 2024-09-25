import request from 'supertest';
import app from '../app';
import { getChartDataService } from '../services/chartService';

jest.mock('../services/chartService');

describe('GET /api/charts', () => {
  it('deve retornar dados para gráfico de pizza', async () => {

    (getChartDataService as jest.Mock).mockResolvedValue([
      { label: 'A', value: 10 },
      { label: 'B', value: 20 },
    ]);

    const response = await request(app)
      .get('/api/charts')
      .query({ type: 'pie', startDate: '2023-01-01', endDate: '2023-12-31' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0].label).toBe('A');
    expect(response.body[1].label).toBe('B');
  });

  it('deve retornar erro se parâmetros estiverem faltando', async () => {
    const response = await request(app)
      .get('/api/charts')
      .query({ type: 'pie' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Parâmetros ausentes');
  });

  it('deve retornar erro 500 se ocorrer um erro no serviço', async () => {
    
    (getChartDataService as jest.Mock).mockRejectedValue(new Error('Erro simulado'));

    const response = await request(app)
      .get('/api/charts')
      .query({ type: 'pie', startDate: '2023-01-01', endDate: '2023-12-31' });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Erro ao buscar dados');
  });
});
