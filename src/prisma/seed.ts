import { Currency, PrismaClient } from '@prisma/client';
import { Points } from '@/constants/points';

const prisma = new PrismaClient();

async function createExchangeRates() {
  await prisma.exchangeRate.createMany({
    data: [
      {
        currency: Currency.USD,
        rate: 1,
      },
      {
        currency: Currency.KRW,
        rate: 1300,
      },
      {
        currency: Currency.EUR,
        rate: 0.85,
      },
      {
        currency: Currency.JPY,
        rate: 110,
      },
    ],
  });

  console.log('Exchange rates created successfully');
}

async function getKRWExchangeRate() {
  const krwExchangeRate = await prisma.exchangeRate.findUnique({
    where: {
      currency: Currency.KRW,
    },
  });

  if (!krwExchangeRate) {
    throw new Error('KRW 환율 정보를 찾을 수 없습니다.');
  }

  return krwExchangeRate;
}

async function createPointPacks(exchangeRateId: number) {
  await prisma.point.createMany({
    data: [
      {
        name: '100POINT',
        description: 'This is a 100 point pack',
        price: Points.ONE_HUNDRED,
        exchangeRateId,
      },
      {
        name: '300POINT',
        description: 'This is a 300 point pack',
        price: Points.THREE_HUNDRED,
        exchangeRateId,
      },
      {
        name: '500POINT',
        description: 'This is a 500 point pack',
        price: Points.FIVE_HUNDRED,
        exchangeRateId,
      },
      {
        name: '1000POINT',
        description: 'This is a 1000 point pack',
        price: Points.ONE_THOUSAND,
        exchangeRateId,
      },
    ],
  });

  console.log('Point packs created successfully');
}

async function main() {
  await createExchangeRates();
  const krwExchangeRate = await getKRWExchangeRate();
  await createPointPacks(krwExchangeRate.id);

  console.log('Seed data inserted successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
