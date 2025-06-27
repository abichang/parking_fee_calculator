function isFullDay(end: Date) {
    return end.getHours() === 0 && end.getMinutes() === 0;
}

function calcTodayFee(end: Date, start: Date, freeMinutes: number, dailyMax: number) {
    const totalMinutes = Math.ceil((end.getTime() - start.getTime()) / 60000);

    // 檢查是否為週六、週日或國定假日
    if (start.getDay() === 6 || start.getDay() === 0 || start.getDate() === 1) {
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

    // 超過15分鐘收費30元
    if (totalMinutes > 15 && totalMinutes <= 30) {
        return 30;
    }

    // 超過30分鐘收費60元
    if (totalMinutes > 30 && totalMinutes <= 60) {
        return 60;
    }

    // 超過60分鐘收費90元
    if (totalMinutes > 60 && totalMinutes <= 150) {
        return 90;
    }

    return dailyMax;
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
        return calcTodayFee(end, start, freeMinutes, dailyMax);
    }

    // 跨日的情況
    let totalFee = 0;

    // 計算第一天的費用
    if (isFullDay(start)) {
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
    if (!isFullDay(end)) {
        totalFee += 30;
    }

    // 計算中間完整天數的費用
    if (totalDays > 1) {
        totalFee += (totalDays - 1) * dailyMax;
    }

    return totalFee;
};
