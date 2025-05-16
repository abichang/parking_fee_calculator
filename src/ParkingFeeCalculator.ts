export const calculate = (start: Date, end: Date): number => {
    const freeMinutes = 15;
    const dailyMax = 150;
    const saturdayMax = 2400;

    const startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    const endDay = new Date(end.getFullYear(), end.getMonth(), end.getDate());
    const totalDays = Math.ceil((endDay.getTime() - startDay.getTime()) / (24 * 60 * 60 * 1000));

    if (totalDays === 0) {
        const totalMinutes = Math.ceil((end.getTime() - start.getTime()) / 60000);

        if (start.getDay() === 6 || start.getDay() === 0 || start.getDate() === 1) {
            if (totalMinutes <= freeMinutes) {
                return 0;
            }
            return 50;
        }

        if (totalMinutes <= freeMinutes) {
            return 0;
        }

        if (totalMinutes > 15 && totalMinutes <= 30) {
            return 30;
        }

        if (totalMinutes > 30 && totalMinutes <= 60) {
            return 60;
        }

        if (totalMinutes > 60 && totalMinutes <= 150) {
            return 90;
        }

        if (totalMinutes > 150) {
            return dailyMax;
        }
    }

    let totalFee = 0;

    if (start.getHours() === 0 && start.getMinutes() === 0) {
        if (start.getDay() === 6) {
            totalFee += saturdayMax;
        } else {
            totalFee += dailyMax;
        }
    } else {
        totalFee += 30;
    }

    if (end.getHours() === 0 && end.getMinutes() === 0) {
        totalFee += 0;
    } else {
        totalFee += 30;
    }

    if (totalDays > 1) {
        totalFee += (totalDays - 1) * dailyMax;
    }

    return totalFee;
};
