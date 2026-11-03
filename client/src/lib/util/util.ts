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

export function formatDateWithSuffix(date : Date){
    
    const day = date.getDate();
    const year = date.getFullYear();

    // Get the full month name (e.g., "October")
    const month = date.toLocaleString("en-US", { month: "short" });

    // Function to determine the correct ordinal suffix
    const getOrdinalSuffix = (num : number) => {
        if (num > 3 && num < 21) return "th"; // Handles 11th, 12th, 13th
        switch (num % 10) {
            case 1:  return "st";
            case 2:  return "nd";
            case 3:  return "rd";
            default: return "th";
        }
    };

    return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
}

export function formattedTime(date: Date){
    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}