const getDate = (date: Date) => {
    const time = new Date(date);
    return `${time.getFullYear()}년 ${time.getMonth()+1}월 ${time.getDate()}일`
}

export { getDate };
