import React from 'react';
import { ReactPropTypes } from 'react';
import './PetsTimer.css';

function PetsTimer({ pet }) {

	const [timeTillEnd, setTimeTillEnd] = React.useState(pet.feed.amount / pet.feed.consumption * 86400000);
	const [timeFromStart, setTimeFromStart] = React.useState(Date.now() - pet.feed.date);
	const [timeLeft, setTimeLeft] = React.useState(timeTillEnd - timeFromStart);
	const [timerActive, setTimerActive] = React.useState(true);

	const [days, setDays] = React.useState(0);
	const [hours, setHours] = React.useState(0);
	const [minutes, setMinutes] = React.useState(0);
	const [seconds, setSeconds] = React.useState(0);

	function calcTimeLeft() {
		setDays(Math.floor(timeLeft / 1000 / 60 / 60 / 24));
		setHours(Math.floor(timeLeft / 1000 / 60 / 60) % 24);
		setMinutes(Math.floor(timeLeft / 1000 / 60) % 60);
		setSeconds(Math.floor(timeLeft / 1000) % 60);
	}

	React.useEffect(() => {
		setTimeTillEnd(pet.feed.amount / pet.feed.consumption * 86400000);
		setTimeFromStart(Date.now() - pet.feed.date);
		setTimeLeft(timeTillEnd - timeFromStart);
		if (timeLeft > 0 && timerActive) {
			calcTimeLeft();
			setTimeout(() => setTimeLeft(timeLeft - 1000), 1000)
		} else {
			setTimerActive(false);
		}
	}, [timeLeft, timerActive, pet.id]);

	return (
		<div className='options__data'>Time left:
			{timerActive
				? <span>~ {days}d {hours}h {minutes}m {seconds}s</span>
				: <span>0</span>}
		</div>
	)
}

export default PetsTimer