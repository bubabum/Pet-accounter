import React, { useContext } from 'react'
import { ReactPropTypes } from 'react';
import Context from '../context';
import './PetsOptions.css';
import PetsTimer from './PetsTimer';

function PetsOptions({ pet }) {
	const feed = pet.feed;
	const { setPetFeed } = useContext(Context);
	const { resetPetFeed } = useContext(Context);
	const [editOptions, setEditOptions] = React.useState(false);
	const [amount, setAmount] = React.useState(feed.amount);
	const [consumption, setConsumption] = React.useState(feed.consumption);
	const [balance, setBalance] = React.useState(Math.ceil(amount - (consumption / 24 / 60 / 60 / 1000 * (Date.now() - feed.date))));

	function handleSubmit(event) {
		event.preventDefault();
		setPetFeed(pet.id, amount, consumption);
		setEditOptions(false);
	}

	React.useEffect(() => {
		setAmount(feed.amount);
		setConsumption(feed.consumption);
		const newBalance = Math.ceil(feed.amount - (feed.consumption / 24 / 60 / 60 / 1000 * (Date.now() - feed.date)));
		if (newBalance < 0) {
			setBalance(0);
		} else {
			setBalance(newBalance);
		}
	}, [pet.id, feed.amount, feed.consumption]);

	return (
		<div className='options'>
			<div className='options__header'>Pet's feed data</div>
			{editOptions
				? <form className='option__form' onSubmit={handleSubmit}>
					<label>Amount, g</label>
					<input className='pets__input' type="number" value={amount} onChange={event => setAmount(event.target.value)} />
					<label>Consumption, g/day</label>
					<input className='pets__input' type="number" value={consumption} onChange={event => setConsumption(event.target.value)} />
					<div className='form-btns'>
						<button className='form-btn bi bi-check2' type="submit"></button>
						<button className='form-btn bi bi-x' onClick={() => setEditOptions(false)}></button>
					</div>
				</form>
				: <div className='options__body'>
					<div className='options__data'>Amount:<span>{feed.amount} g</span></div>
					<div className='options__data'>Estimated balance:<span>{balance} g</span></div>
					<div className='options__data'>Consumption:<span>{feed.consumption} g/day</span></div>
					{feed.date && balance > 0
						? <PetsTimer pet={pet} />
						: <div className='options__data'>Time left:<span>0</span></div>}
					<button className='options__btn bi bi-pencil-fill' onClick={() => setEditOptions(true)}></button>
					<button className='bi bi-trash3-fill' onClick={resetPetFeed.bind(null, pet.id)}></button>
				</div>}
		</div>
	)
}

export default PetsOptions 