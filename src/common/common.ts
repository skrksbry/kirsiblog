import { headers } from "next/headers";

const getDate = (date: Date) => {
    const time = new Date(date);
    return `${time.getFullYear()}년 ${time.getMonth()+1}월 ${time.getDate()}일`
}

const getClientIp = () => {
    const headersList = headers();
    let ip = headersList.get("x-forwarded-for");
    if (ip) return ip = ip.split(',')[0].trim();
    return ip = "0.0.0.0";
}

export { getDate, getClientIp };
