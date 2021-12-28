import dayjs from 'dayjs'

export interface DateObject {
    date: number;
    month: number;
    year: number;
}

export interface DateInputInterface {
    date: any,
    handleChange: (value: DateObject) => void,
}

export interface DatePickerHeaderInterface {
    date: dayjs.Dayjs;
    setDate: (value: dayjs.Dayjs) => void;
}

export interface CalendarInterface {
    headings: string[];
    onChange: (value: dayjs.Dayjs) => void;
    startDate: any;
    month: string;
    year: number;
    daysInMonth: number;
    daysInLastMonth: number;
    dayOfWeek: number;
}

export interface DatePickerProps {
    date: dayjs.Dayjs; 
    onChange: (value: dayjs.Dayjs) => void; 
}
