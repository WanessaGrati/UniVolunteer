const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateDigit = () => {
    const digits = "0123456789";
    return digits[generateRandomNumber(0, 9)];
};

const generateLowercase = () => {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    return lowercase[generateRandomNumber(0, 25)];
};

const generateUppercase = () => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return uppercase[generateRandomNumber(0, 25)];
};

const generateCharacter = () => {
    const number = generateRandomNumber(0, 2);

    switch (number) {
        case 0: return generateDigit();
        case 1: return generateLowercase();
        case 2: return generateUppercase();
    }
};

const generateRandomPassword = () => {
    const length = 10;
    let password = '';

    for (let i = 0; i < length; i++) {
        password += generateCharacter();
    }

    return password;
};

const isLetter = (password) => {
    let i;
    for (i = 0; i < password.length; i++) {
        if ((password[i] >= 'a' && password[i] <= 'z') || (password[i] >= 'A' && password[i] <= 'Z')) {
            return true;
        }
    }

    return false;
}

const isDigit = (password) => {
    let i;
    for (i = 0; i < password.length; i++) {
        if (password[i] >= '0' && password[i] <= '9') {
            return true;
        }
    }

    return false;
}

export const verifyPassword = (password) => {

    if (password.length < 8) return false;
    return !(!isDigit(password) && !isLetter(password));
}
export default generateRandomPassword;