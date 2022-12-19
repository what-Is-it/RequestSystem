const ERROR_CODES = {
    EMAIL_NOT_FOUND: 'Пользователя с таким email не существует',
    INVALID_PASSWORD: 'Неправельный пароль',
    auth: 'Пожалуйста войдите в систему',
}

export default function error(code) {
    return ERROR_CODES[code] ? ERROR_CODES[code] : 'Неизвестная ошибка'
}
