import { calculateParkingFee } from './parkingFee';

describe('calculateParkingFee', () => {
  it('应该正确计算1小时内的停车费用', () => {
    const startTime = new Date('2024-03-01T10:00:00');
    const endTime = new Date('2024-03-01T10:30:00');
    const hourlyRate = 30;
    const dailyMax = 300;

    const fee = calculateParkingFee(startTime, endTime, hourlyRate, dailyMax);
    expect(fee).toBe(15); // 30分钟，按小时费率的一半计算
  });

  it('应该正确计算超过1小时的停车费用', () => {
    const startTime = new Date('2024-03-01T10:00:00');
    const endTime = new Date('2024-03-01T12:30:00');
    const hourlyRate = 30;
    const dailyMax = 300;

    const fee = calculateParkingFee(startTime, endTime, hourlyRate, dailyMax);
    expect(fee).toBe(75); // 2.5小时，每小时30元
  });

  it('不应该超过每日最高限额', () => {
    const startTime = new Date('2024-03-01T00:00:00');
    const endTime = new Date('2024-03-01T23:59:59');
    const hourlyRate = 30;
    const dailyMax = 300;

    const fee = calculateParkingFee(startTime, endTime, hourlyRate, dailyMax);
    expect(fee).toBe(300); // 应该不超过每日最高限额
  });

  it('应该正确处理跨天的停车', () => {
    const startTime = new Date('2024-03-01T23:00:00');
    const endTime = new Date('2024-03-02T01:00:00');
    const hourlyRate = 30;
    const dailyMax = 300;

    const fee = calculateParkingFee(startTime, endTime, hourlyRate, dailyMax);
    expect(fee).toBe(60); // 2小时，每小时30元
  });
}); 