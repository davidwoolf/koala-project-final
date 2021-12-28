import React from 'react'
import dayjs from 'dayjs'
import _get from 'lodash/get'

import {
    DatePickerHeaderInterface,
} from '../../config/types'

const Header = ({ 
    date, 
    setDate, 
}: DatePickerHeaderInterface) => (
    <>
        <button
        onClick={() => setDate(date.subtract(1, 'month'))}>

            <svg 
            width="8" 
            height="14" 
            viewBox="0 0 8 14" 
            fill="none"
            className="
            block
            text-primary
            ">   
                <title>Previous Month</title>

                <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M6.64641 0.646484L7.35352 1.35359L1.70707 7.00004L7.35352 12.6465L6.64641 13.3536L0.292855 7.00004L6.64641 0.646484Z" 
                className="fill-current" />
            </svg>
        </button>

        <span
        className="
            font-normal
            px-3
            text-black
            text-md
        ">
            {date.format('MMMM YYYY')}
        </span>

        <button
        onClick={() => setDate(date.add(1, 'month'))}>
            <svg 
            width="8" 
            height="14" 
            viewBox="0 0 8 14" 
            fill="none"
            className="
                block
                rotate-180
                text-primary
                transform
            ">
                <title>Next Month</title>
                <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M6.64641 0.646484L7.35352 1.35359L1.70707 7.00004L7.35352 12.6465L6.64641 13.3536L0.292855 7.00004L6.64641 0.646484Z" 
                className="fill-current" />
            </svg>
        </button>

        <div className="flex-1"></div>

        <button
        className="
            bg-primary
            bg-opacity-10
            block
            font-medium
            leading-tight
            rounded-md
            p-1.5
            px-2
            text-primary
            text-xs
            transition-all

            hover:opacity-80
            active:opacity-60
        "
        onClick={() => setDate(dayjs())}>
            Today
        </button>
    </>
)

export default Header