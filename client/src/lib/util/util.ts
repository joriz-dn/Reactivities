import {type DateArg, format, formatDistanceToNow} from "date-fns";
import {z} from "zod";

export function formatDate(date: DateArg<Date>) {
    return format(date, 'MMM dd, yyyy h:mm a')
}
export const requiredString = (field: string) => z
    .string({required_error: `${field} is required`})
    .min(1, {message: `${field} is required`});

export function timeAgo(date: DateArg<Date>){
    return formatDistanceToNow(date) + ' ago';   
}
