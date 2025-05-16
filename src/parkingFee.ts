export function calculateParkingFee(
  startTime: Date,
  endTime: Date,
  hourlyRate: number,
  dailyMax: number
): number {
  // 计算总小时数（包括小数部分）
  const totalHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
  
  // 计算基本费用
  let fee = totalHours * hourlyRate;
  
  // 如果停车时间跨天，需要按天分别计算
  if (startTime.getDate() !== endTime.getDate()) {
    // 计算第一天和最后一天的费用
    const firstDayHours = (24 - startTime.getHours() - startTime.getMinutes() / 60);
    const lastDayHours = endTime.getHours() + endTime.getMinutes() / 60;
    
    // 计算中间完整的天数
    const fullDays = Math.floor(totalHours / 24);
    
    // 计算总费用
    fee = Math.min(firstDayHours * hourlyRate, dailyMax) +
          Math.min(lastDayHours * hourlyRate, dailyMax) +
          (fullDays * dailyMax);
  } else {
    // 单天停车，确保不超过每日最高限额
    fee = Math.min(fee, dailyMax);
  }
  
  return Math.round(fee);
} 