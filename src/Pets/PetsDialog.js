import React, { useContext } from 'react'
import { ReactPropTypes } from 'react';
import './PetsDialog.css';

function PetsDialog({ addPet, cancelForm }) {

	const [petName, setPetName] = React.useState('');
	const [petType, setPetType] = React.useState('Dog');

	function handleSubmit(event) {
		event.preventDefault();
		addPet(petName, petType);
	}

	return (
		<form className='pets__form box' onSubmit={handleSubmit}>
			<input className='pets__input' type="text" placeholder="Name" value={petName} onChange={event => setPetName(event.target.value)} />
			<select className='pets__input' value={petType} onChange={event => setPetType(event.target.value)}>
				<option value="Dog">Dog</option>
				<option value="Cat">Cat</option>
			</select>
			<div className='form-btns'>
				<button className='form-btn bi bi-check2' type="submit"></button>
				<button className='form-btn bi bi-x' onClick={cancelForm}></button>
			</div>
		</form>
	)
}

export default PetsDialog