import React, { useEffect, useState } from 'react'
import _get from 'lodash/get'
import { ThemeProvider } from 'styled-components'

// Components
import { Countdown } from './components/Countdown/Countdown';

interface StateProps {
  theme: object;
}

const App = () => {
	const [theme, setTheme] = useState<StateProps | {}>({})

	useEffect(() => {
		const headers = new Headers()
		headers.append('Content-Type', 'application/json')
		headers.append('Accept', 'application/json')
		headers.append('X-Organization-Id', '1')

    	fetch('https://api.koala.io/marketing/v1/device-configurations/alias/web-config', {
      		method: 'GET',
      		headers: headers,
    	})
    	.then(res => res.json())
    	.then(
			result => setTheme(result.data.data),
      		error => console.log(error)
		)
	}, [])


	// return null
	return(
		<ThemeProvider theme={theme}>
			<Countdown />
	  	</ThemeProvider>
	)
}
export default App
