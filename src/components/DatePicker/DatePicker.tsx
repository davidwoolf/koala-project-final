import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import _get from 'lodash/get'

import {
    DateObject,
    CalendarInterface,
    DatePickerProps,
} from '../../config/types'

// elements
import DateField from './DateField'
import Header from './Header'

const checkIsSelected = (dateString: string, date: any) => {
    if(!date) {
        return false
    }

    return date.format('M D YYYY') == dayjs(dateString).format('M D YYYY') ? true : false
}

const Calendar = ({
    headings = ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    onChange,
    startDate,
    month,
    year,
    daysInMonth,
    daysInLastMonth,
    dayOfWeek,
}: CalendarInterface) => {
    return(
        <div
        className="
            grid
            grid-cols-7
            pt-3
        ">
            {headings.map((i, index) => (
                <span
                key={i + index}
                className="
                    flex
                    font-semibold
                    items-center
                    justify-center
                    text-black
                    text-center
                    text-xs
                    py-1
                    uppercase
                ">
                    {i}
                </span>
            ))
            .concat(
                Array.from(Array(dayOfWeek), (x, index: number) => {
                    const day = daysInLastMonth - dayOfWeek + index + 1
                    return (
                        <span
                        key={`prev_${day}`}
                        className="
                            flex
                            items-center
                            text-center
                            justify-center
                            opacity-50
                            text-black
                            text-sm
                            py-2
                            uppercase
                        ">
                            {day}
                        </span>
                    )
                })
            ).concat(
                Array.from(Array(daysInMonth), (x, index: number) => {
                    const isSelected = checkIsSelected(
                        `${month} ${index + 1}, ${year}`,
                        startDate
                    )

                    return (
                        <button
                        key={`current_${index}`}
                        className={`
                            flex
                            items-center
                            text-center
                            justify-center
                            text-sm
                            py-2
                            transition-all
                            uppercase

                            hover:bg-black
                            hover:bg-opacity-10
                            hover:text-black
                            hover:rounded-full

                            ${
                                isSelected
                                ? 'bg-primary bg-opacity-10 text-primary rounded-full'
                                : 'transparent text-black rounded-none'
                            }
                        `}
                        onClick={() => {
                            onChange(dayjs(`${month} ${index + 1}, ${year}`))
                        }}>
                            {index + 1}
                        </button>
                    )
                })
            )}
        </div>
    )
}

const DatePicker = ({ 
    date, 
    onChange,
} : DatePickerProps) => {
    // local date is used for changing months, etc without requiring an actual date change
    // which might trigger other logic
    // the local date is set to the current date on load, but then is on its own
    const [localDate, setLocalDate] = useState(dayjs(date))

    return(
        <div
        className="
            bg-white
            rounded-lg
            max-w-sm
            p-4
            shadow-card
        ">
            <div
            className="flex pb-3">
                <DateField
                date={date}
                handleChange={(value: DateObject) => {
                    setLocalDate(
                        localDate
                        .set('year', value.year)
                        .set('month', value.month)
                        .set('date', value.date)
                    )

                    const newDate = dayjs()
                                    .set('year', value.year)
                                    .set('month', value.month)
                                    .set('date', value.date)

                    onChange(newDate)
                }} />
            </div>

            <div
            className="
                flex
                items-center
                pl-2
            ">
                <Header
                date={localDate}
                setDate={(value: dayjs.Dayjs) => {
                    setLocalDate(value)
                }} />
            </div>

            <Calendar
            headings={['S', 'M', 'T', 'W', 'TH', 'F', 'S']}
            onChange={(value: dayjs.Dayjs) => {
                onChange(
                    date
                    .set('year', value.get('year'))
                    .set('month', value.get('month'))
                    .set('date', value.get('date'))
                )
            }}
            startDate={date}
            month={localDate.format('MMMM')}
            year={localDate.year()}
            daysInMonth={localDate.daysInMonth()}
            daysInLastMonth={localDate.subtract(1, 'month').daysInMonth()}
            dayOfWeek={localDate.startOf('month').day()} />
        </div>
    )
}

export default DatePicker
