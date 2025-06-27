function isHoliday(start: Date) {
    return start.getDay() === 6 || start.getDay() === 0 || start.getDate() === 1;
}

const calcDailyFee = (end: Date, start: Date, freeMinutes: number, dailyMax: number) => {
    const totalMinutes = Math.ceil((end.getTime() - start.getTime()) / 60000);

    // 檢查是否為週六、週日或國定假日
    if (isHoliday(start)) {
        // 週六日及國定假日每半小時收費50元
        if (totalMinutes <= freeMinutes) {
            return 0;
        }
        return 50;
    }

    // 15分鐘內免費
    if (totalMinutes <= freeMinutes) {
        return 0;
    }

    const number = Math.floor(totalMinutes / 30);

    return Math.min((number + 1) * 30, dailyMax);
}

export const calculate = (start: Date, end: Date): number => {
    const freeMinutes = 15;
    const dailyMax = 150;
    const saturdayMax = 2400;

    // 計算總天數
    const startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    const endDay = new Date(end.getFullYear(), end.getMonth(), end.getDate());
    const totalDays = Math.ceil((endDay.getTime() - startDay.getTime()) / (24 * 60 * 60 * 1000));

    // 如果是同一天
    if (totalDays === 0) {
        return calcDailyFee(end, start, freeMinutes, dailyMax);
    }

    // 跨日的情況
    let totalFee = 0;

    // 計算第一天的費用
    if (start.getHours() === 0 && start.getMinutes() === 0) {
        // 如果是完整天數，檢查是否為週六
        if (start.getDay() === 6) {
            totalFee += saturdayMax;
        } else {
            totalFee += dailyMax;
        }
    } else {
        // 如果是部分天數，直接收30元
        totalFee += 30;
    }

    // 計算最後一天的費用
    if (end.getHours() === 0 && end.getMinutes() === 0) {
        // 如果是0點結束，不計費
        totalFee += 0;
    } else {
        // 如果不是0點結束，直接收30元
        totalFee += 30;
    }


    return totalFee + (totalDays - 1) * dailyMax;

};
