import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import _get from 'lodash/get'

import {
    DateInputInterface,
} from '../../config/types'


const getVariantStyles = (invalid: boolean, focused: boolean) => {
    if(focused) {
        return 'border-primary border-opacity-70 shadow-input-focused';
    } else {
        if(invalid) {
            return 'border-warning shadow-input'
        } else {
            return 'border-black-600 border-opacity-30 shadow-input'
        }
    }
}

const DateField = ({ 
    date = false, 
    handleChange, 
}: DateInputInterface) => {
    const [value, setValue] = useState('')
    const [invalid, setInvalid] = useState(false)

    useEffect(() => {
        setValue(
            date
            ? date.format('MM/DD/YYYY')
            : dayjs().format('MM/DD/YYYY')
        )
    }, [date])

    useEffect(() => {
        let timer: any

        timer = setTimeout(() => {
            if (value.length == 0) {
                const today = dayjs()

                setInvalid(false)

                handleChange({
                    date: today.date(),
                    month: today.month(),
                    year: today.year(),
                })
            } else {
                const checkDate = dayjs(value)

                if (checkDate.isValid() && value.length == 10) {
                    setInvalid(false)

                    handleChange({
                        date: checkDate.date(),
                        month: checkDate.month(),
                        year: checkDate.year(),
                    })
                } else {
                    if (!checkDate.isValid()) {
                        setInvalid(true)
                    }
                }
            }
        }, 500)

        return () => {
            clearTimeout(timer)
        }
    }, [value])

    return (
        <label
        className={`
            bg-white
            border
            cursor-text
            flex
            items-center
            px-3
            h-9
            rounded-lg
            transition-all

            ${getVariantStyles(invalid, false)}
        `}>
            <span
            className={`
                font-medium
                h-full
                flex
                items-center
                ${invalid ? 'text-warning' : 'text-black'}
            `}>
                Date
            </span>

            <input
            className={`
                appearance-none
                bg-transparent
                border-none
                font-medium
                rounded-none
                pr-0
                pl-2
                shadow-none
                text-mobile-input
                w-full
                
                md:text-md
                focus:outline-none
            `}
            onChange={(e) => {
                setValue(e.target.value)
            }}
            placeholder="mm/dd/yyyy"
            value={value} />
        </label>
    )
}

export default DateField