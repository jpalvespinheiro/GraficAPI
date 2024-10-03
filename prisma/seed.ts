import { ChartType, PrismaClient, TipoConta } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  // Apagando dados antigos
  await prisma.chartData.deleteMany({});
  await prisma.conta.deleteMany({});
  await prisma.user.deleteMany({});
  
  console.log('Dados antigos apagados com sucesso!');

  const user = await prisma.user.create({
    data: {
      email: 'jpalvespinheiro@gmail.com',
    },
  });

  console.log(`Usuário criado com ID: ${user.id}`);

  const pieChartData = [
    { category: 'Receitas', value: 30000, type: ChartType.RECEITA, createdAt: new Date('2024-09-01') },
    { category: 'Despesas', value: 8000, type: ChartType.DESPESA, createdAt: new Date('2024-09-02') },
    { category: 'Investimentos', value: 3000, type: ChartType.DESPESA, createdAt: new Date('2024-09-03') },
    { category: 'Funcionarios', value: 54000, type: ChartType.DESPESA, createdAt: new Date('2024-09-04') },
    { category: 'Imposto', value: 6000, type: ChartType.DESPESA, createdAt: new Date('2024-09-05') },
    { category: 'Beneficios', value: 25000, type: ChartType.DESPESA, createdAt: new Date('2024-09-06') },
    { category: 'Outros', value: 78000, type: ChartType.DESPESA, createdAt: new Date('2024-09-07') }
  ];

  const lineChartData = [
    { date: new Date('2024-09-01'), receitas: 500, despesas: 200 },
    { date: new Date('2024-09-02'), receitas: 600, despesas: 300 },
    { date: new Date('2024-09-03'), receitas: 800, despesas: 400 },
    { date: new Date('2024-09-04'), receitas: 700, despesas: 500 },
    { date: new Date('2024-09-05'), receitas: 900, despesas: 300 },
    { date: new Date('2024-09-06'), receitas: 1100, despesas: 600 },
    { date: new Date('2024-09-07'), receitas: 1200, despesas: 700 },
  ];

  const barChartData = [
    { product: 'Produto A', value: 5000, createdAt: new Date('2024-09-01') },
    { product: 'Produto B', value: 7000, createdAt: new Date('2024-09-02') },
    { product: 'Produto C', value: 3000, createdAt: new Date('2024-09-03') },
    { product: 'Produto D', value: 2000, createdAt: new Date('2024-09-04') },
    { product: 'Produto F', value: 8000, createdAt: new Date('2024-09-05') },
    { product: 'Produto G', value: 10000, createdAt: new Date('2024-09-06') },
    { product: 'Produto H', value: 12000, createdAt: new Date('2024-09-07') },
    { product: 'Produto I', value: 14000, createdAt: new Date('2024-09-08') },
    { product: 'Produto J', value: 16000, createdAt: new Date('2024-09-09') },
  ];


  await prisma.chartData.createMany({
    data: pieChartData.map(item => ({
      type: item.type,  
      label: item.category,
      value: item.value,
      createdAt: item.createdAt,
    })),
  });

  await prisma.chartData.createMany({
    data: lineChartData.map(item => ({
      type: 'LINE',
      label: `Receitas e Despesas em ${item.date.toISOString().split('T')[0]}`,
      value: item.receitas - item.despesas,
      createdAt: item.date,
    })),
  });


  await prisma.chartData.createMany({
    data: barChartData.map(item => ({
      type: 'BAR',
      label: item.product,
      value: item.value,
      createdAt: item.createdAt,
    })),
  });


  const contas = [
    { descricao: 'Pagamento fornecedor - Empresa A', vencimento: new Date('2024-10-01'), valor: 1000, tipo: TipoConta.PAGAR, userId: user.id },
    { descricao: 'Venda de serviço - Empresa B', vencimento: new Date('2024-10-05'), valor: 2000, tipo: TipoConta.RECEBER, userId: user.id },
    { descricao: 'Manutenção - Empresa C', vencimento: new Date('2024-10-10'), valor: 1500, tipo: TipoConta.PAGAR, userId: user.id },
    { descricao: 'Consultoria prestada - Empresa D', vencimento: new Date('2024-10-15'), valor: 3000, tipo: TipoConta.RECEBER, userId: user.id },
    { descricao: 'Compra de equipamento - Empresa A', vencimento: new Date('2024-10-20'), valor: 2500, tipo: TipoConta.PAGAR, userId: user.id },
    { descricao: 'Projeto finalizado - Empresa B', vencimento: new Date('2024-10-25'), valor: 4000, tipo: TipoConta.RECEBER, userId: user.id },
  ];

  await prisma.conta.createMany({
    data: contas,
  });

  console.log('Dados inseridos com sucesso!');
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
