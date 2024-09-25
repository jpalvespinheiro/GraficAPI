import request from 'supertest';
import app from '../app';

describe('GET /api/charts', () => {
  it('deve retornar dados para gráfico de pizza', async () => {
    const response = await request(app).get('/api/charts?tipo=pie&dataInicio=2023-01-01&dataFim=2023-12-31');
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('deve retornar erro se parâmetros estiverem faltando', async () => {
    const response = await request(app).get('/api/charts');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Parâmetros "tipo", "dataInicio" e "dataFim" são obrigatórios.');
  });
});
