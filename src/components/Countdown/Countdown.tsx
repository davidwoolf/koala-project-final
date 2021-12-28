import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs'
import DatePicker from '../DatePicker/DatePicker'


// Example of how to break down two dates into their difference
// of days, hours, minutes, and seconds. Using native date logic
// is not recommended due to the large amount of work involved with
// different years, months, etc. This is simply an example of how you could do that
const getRemaingTime = (date: Date) => {
	interface Measurement {
		measure: string,
		interval: number,
	}

	const now: Date = new Date()

	// amount of seconds remaining (assuming the date passed in is in the future, see below)
	let remainingTime = (date.getTime() - now.getTime()) / 1000

	// We want to grab the full amount of days, hours, minutes, and seconds
	// to do this, we can map over each one with their interval (in seconds)
	// and return a new array of objects with the label (aka: units) and the value 	
	let measurements: Measurement[] = [{
		measure: 'days',
		interval: 86400,
	}, {
		measure: 'hours',
		interval: 3600,
	}, {
		measure: 'minutes',
		interval: 60,
	}, {
		measure: 'seconds',
		interval: 1,
	}]

	return {
		end_date: date,
		today: now, 
		expired: remainingTime <= 0,
		countdown_values: 
			remainingTime > 0
			? measurements.map(measurement => {
				// To start, we set the rounded down value of the measurement,
				// based off of the remainingTime variable we created previously.
				// then, before returning, we update the remaining time to shave off
				// the rounded value, converted back into seconds (using our interval value)

				// IE: divide evenly, take the remainder, repeat
				let value = Math.floor(remainingTime / measurement.interval)

				remainingTime = remainingTime - (value * measurement.interval)
				
				return {
					label: measurement.measure,
					value,
				}
			})
			: []
	}
}

// Uncomment and change the date to see the returned value
// console.log(getRemaingTime(new Date('2022-03-01')))


// a tiny little helper to add a cute zero to the beginning of hours, minutes, 
// and seconds when they are less than 10. Any number can be passed in and the last
// 2 digits are returned. This cuts down on unnecessary checks like (number < 10)
const getFormatting = (value: number) => {
	return ("0" + value).slice(-2)
}

export const Countdown = () => {
	// native example of grabbing remaining time


	// To quickly handle complex date logic, I used DayJS, which 
	// is a tiny date library with TypeScript support. 
	const [endDate, setEndDate] = useState(dayjs().endOf('day'))
	const [now, setNow] = useState(dayjs())
	const [countDownExpired, setCountDownExpired] = useState(false)

	const days = endDate.diff(now, 'day')
	// we assume the end date is at midnight
	const hours = endDate.hour() - now.hour()
	const minutes = now.second() > 0 ? `${getFormatting(60 - now.minute())}` : `${getFormatting(61 - now.minute())}`
	const seconds = now.second() > 0 ? `${getFormatting(60 - now.second())}` : "00"


	// To handle updating every second gracefully (ie: low priority if the screen 
	// is hidden or the CPU is low on resources), I setup a requestAnimationFrame.
	// To avoid repeated requestAnimationFrame calls, the frame is instantiated on component mount
	// and assigned to a ref (requestRef). This is also cleared when the component unmounts

	// Another ref (previousTimeRef) is used to see if a second has passed and if so, sets the now
	// variable to the current time (by simply resetting it to a new dayjs() instance)
	const requestRef: { current: any } = useRef()
	const previousTimeRef: { current: number | undefined } = useRef()

	const animate = (time: number) => {
		if (previousTimeRef.current !== undefined) {
			const deltaTime = time - previousTimeRef.current

			if(deltaTime >= 1000) {
				previousTimeRef.current = time

				setNow(dayjs())
			}
		} else {
			previousTimeRef.current = time
		}
		
		requestRef.current = requestAnimationFrame(animate)
	}

	useEffect(() => {
		requestRef.current = requestAnimationFrame(animate)

		return () => cancelAnimationFrame(requestRef.current)
	}, [])

	useEffect(() => {
		if(endDate.isBefore(now)) {
			setCountDownExpired(true)
		} else {
			setCountDownExpired(false)
		}
	}, [endDate])

  	return(
		<div
		className="
			antialiased
			bg-black-800
			h-screen
			flex
			items-center
			justify-center
			w-screen
		">
			{/*  
				I wanted to showcase a datepicker I created for another project,
				both because it's complex but also to demonstrate that it's flexible
				and can be ported to another project quickly (minus some styling which 
				I also ported over for the sake of time).
			*/}
			<DatePicker
			date={endDate}
			onChange={(value: dayjs.Dayjs) => {
				setEndDate(value.endOf('day'))
			}} />

			<div
			className="
				ml-12
				text-black
			">
				{!countDownExpired &&
					<>
					
						<h2
						className="
							font-semibold
							text-lg
						">
							Countdown ends on {endDate.format('MMMM DD, YYYY')} at midnight:
						</h2>

						<div
						className="
							flex
							space-x-0.5
							text-lg
							pt-2
						">
							{days > 0 && 
								<>
									<span>{days} {days === 1 ? 'day' : 'days'}</span>
									<span className="opacity-30 px-2">/</span>
								</>
							}
							<span>{hours} hours</span>
							<span className="opacity-30 px-2">/</span>
							<span>{minutes} minutes</span>
							<span className="opacity-30 px-2">/</span>
							<span>{seconds} seconds</span>
						</div>
					</>
				}

				{
					countDownExpired &&
				
					<h2
					className="
						font-semibold
						text-lg
					">
						The countdown has expired. Thanks for playing!
					</h2>
				}
			</div>
		</div>
  	)
}