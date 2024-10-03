import request from 'supertest';
import app from '../app';

describe('GET /api/charts', () => {
  it('deve retornar dados para gráfico de pizza', async () => {
    const response = await request(app).get('/api/charts?tipo=PIE&dataInicio=2023-01-01&dataFim=2023-12-31');
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('deve retornar dados para gráfico de linha', async () => {
    const response = await request(app).get('/api/charts?tipo=LINE&dataInicio=2023-01-01&dataFim=2023-12-31');
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.labels).toBeDefined();
    expect(response.body.datasets).toBeDefined();
  });

  it('deve retornar dados para gráfico de barras', async () => {
    const response = await request(app).get('/api/charts?tipo=BAR&dataInicio=2023-01-01&dataFim=2023-12-31');
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.labels).toBeDefined();
    expect(response.body.datasets).toBeDefined();
  });

  it('deve retornar erro se parâmetros estiverem faltando', async () => {
    const response = await request(app).get('/api/charts');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Parâmetros "tipo", "dataInicio" e "dataFim" são obrigatórios.');
  });

  it('deve retornar erro se as datas forem inválidas', async () => {
    const response = await request(app).get('/api/charts?tipo=PIE&dataInicio=invalid-date&dataFim=2023-12-31');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Datas de início e fim inválidas');
  });

  it('deve retornar erro se a data de início for posterior à data de fim', async () => {
    const response = await request(app).get('/api/charts?tipo=PIE&dataInicio=2023-12-31&dataFim=2023-01-01');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('A data de início deve ser anterior à data de fim');
  });
});

describe('GET /api/total-receitas', () => {
  it('deve retornar o total de receitas', async () => {
    const response = await request(app).get('/api/total-receitas?dataInicio=2023-01-01&dataFim=2023-12-31');
    expect(response.status).toBe(200);
    expect(response.body.total).toBeDefined();
  });
});

describe('GET /api/total-despesas', () => {
  it('deve retornar o total de despesas', async () => {
    const response = await request(app).get('/api/total-despesas?dataInicio=2023-01-01&dataFim=2023-12-31');
    expect(response.status).toBe(200);
    expect(response.body.total).toBeDefined();
  });
});

describe('GET /api/lucro-liquido', () => {
  it('deve retornar o lucro líquido', async () => {
    const response = await request(app).get('/api/lucro-liquido?dataInicio=2023-01-01&dataFim=2023-12-31');
    expect(response.status).toBe(200);
    expect(response.body.lucroLiquido).toBeDefined();
  });
});

describe('GET /api/contas-vencidas', () => {
  it('deve retornar contas vencidas', async () => {
    const response = await request(app).get('/api/contas-vencidas');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('GET /api/contas-a-vencer', () => {
  it('deve retornar contas a vencer', async () => {
    const response = await request(app).get('/api/contas-a-vencer');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
