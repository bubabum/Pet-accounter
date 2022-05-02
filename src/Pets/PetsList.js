import React from 'react';
import { ReactPropTypes } from 'react';
import './PetsList.css';
import PetsItem from './PetsItem';

function PetsList({ pets }) {

	return (
		<ul className='pets__list'>
			{pets.map((pet, index) => {
				return <PetsItem pet={pet} key={pet.id} index={index} />
			})}
		</ul>
	)
}

export default PetsList