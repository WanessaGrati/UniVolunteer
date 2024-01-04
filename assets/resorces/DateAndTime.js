const isDigit = (digit) => {
    if (digit >= '0' && digit <= '9') return true;
    else return false;
};

const isDot = (dot)=> {
    if (dot === '.') return true;
    else return false;
};

const verifyDateFormat = (date) => {
    if (date.length != 10) return false;
    if (!isDot(date[2]) && !isDot(date[5])) return false;

    if (
        !isDigit(date[0]) &&
        !isDigit(date[1]) &&
        !isDigit(date[3]) &&
        !isDigit(date[4]) &&
        !isDigit(date[6]) &&
        !isDigit(date[7]) &&
        !isDigit(date[8]) &&
        !isDigit(date[9])
    ) return false;

    return true;
};

const verifyDay = (day) => {
    return day > 0 && day <= 31;
};

const verifyMonth = (month) => {
    return month > 0 && month <= 12;
};

const verifyYear = (year) => {
    return year >= 2020;
};

const verifyValidDayAndMonth = (day, month) => {
    switch (month) {
        case 1:
        case 3:
        case 5:
        case 8:
        case 10:
        case 12:
            return day <= 31;

        case  2:
            return day <= 29;

        case 4:
        case 6:
        case 9:
        case 11:
            return day <= 30;
    }
};

const verifyValidDate = (date) => {
    if (!verifyDateFormat(date)) return false;

    let day = parseInt(date.slice(0, 2));
    let month = parseInt(date.slice(3, 5));
    let year = parseInt(date.slice(6, 10));

    if (!verifyDay(day)) return false;
    if (!verifyMonth(month)) return false;
    if (!verifyYear(year)) return false;

    if (!verifyValidDayAndMonth(day, month)) return false;

    return true;
};

export default verifyValidDate;
