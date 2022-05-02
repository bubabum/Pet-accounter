import React, { useContext } from 'react'
import { ReactPropTypes } from 'react';
import './PetsItem.css';
import Context from '../context';
import dog from '../img/dog.png';
import cat from '../img/cat.png';

function PetsItem({ pet }) {
	const feed = pet.feed;
	const { openPetsOptions } = useContext(Context);
	const { showPetOptions } = useContext(Context);
	const { removePet } = useContext(Context);

	let icon = dog;
	if (pet.type === 'Cat') {
		icon = cat;
	}

	let petsItemClasses = ['pets__item'];
	if (showPetOptions === pet.id) petsItemClasses.push('active')

	let feedLeft = 100;
	if (feed.date !== null) feedLeft = (Date.now() - feed.date) / 86400000 * feed.consumption / feed.amount * 100;
	let percentage = Math.ceil(100 - feedLeft);
	if (percentage < 0) percentage = 0;

	return (
		<li className={petsItemClasses.join(' ')} onClick={(event) => openPetsOptions(event, pet.id)}>
			<div className='pets__block'>
				<img className='pets__img' src={icon} alt="Logo" />
				<div className='pets__name'>{pet.name}</div>
			</div>
			<div className='pets__type'>{pet.type}</div>
			<div className='pets__block'>
				<div className='pets__progres'><span style={{ backgroundColor: `hsl(${percentage * 1.3}, 100%, 50%)`, width: `${percentage}%` }}></span></div>
				<div className='pets__feed'><span>{percentage}</span>%</div>
				<button className='bi bi-trash3-fill' onClick={(event) => removePet(event, pet.id)}></button>
			</div>
		</li >
	)
}

export default PetsItem