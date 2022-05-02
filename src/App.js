import React from 'react';
import Context from './context';
import './App.css';
import PetsList from './Pets/PetsList';
import PetsDialog from './Pets/PetsDialog';
import PetsOptions from './Pets/PetsOptions';

function App() {

	const [pets, setPets] = React.useState([
		// {
		// 	id: 1,
		// 	name: 'Грінка',
		// 	type: 'Dog',
		// 	feed: {
		// 		date: Date.parse("2022-4-10"),
		// 		amount: 8000,
		// 		consumption: 200,
		// 	},
		// },
		// {
		// 	id: 2,
		// 	name: 'Олаф',
		// 	type: 'Dog',
		// 	feed: {
		// 		date: Date.parse("2022-4-20"),
		// 		amount: 12000,
		// 		consumption: 100,
		// 	},
		// },
	])

	const [showAddForm, setShowAddForm] = React.useState(false);
	const [showPetOptions, setShowPetOptions] = React.useState(null);

	function addPet(name, type) {
		setPets(
			pets.concat([
				{
					id: Date.now(),
					name,
					type,
					feed: {
						date: null,
						amount: 0,
						consumption: 0,
					},
				}
			])
		)
		setShowAddForm(false)
	}

	function openPetsOptions(event, id) {
		event.stopPropagation();
		setShowPetOptions(id);
	}

	function removePet(event, id) {
		event.stopPropagation();
		setShowPetOptions(null);
		setShowAddForm(false);
		setPets(pets.filter(item => item.id !== id));
	}

	function setPetFeed(id, amount, consumption) {
		setPets(
			pets.map(item => {
				if (item.id === id) {
					if (!item.feed.date) {
						item.feed.date = Date.now();
					}
					item.feed.amount = amount;
					item.feed.consumption = consumption;
				}
				return item
			})
		)
	}

	function resetPetFeed(id, amount, consumption) {
		setPets(
			pets.map(item => {
				if (item.id === id) {
					item.feed.date = null;
					item.feed.amount = 0;
					item.feed.consumption = 0;
				}
				return item
			})
		)
	}
	React.useEffect(() => {
		const localStorageData = JSON.parse(localStorage.getItem("pets"));
		if (!localStorageData) return
		if (localStorageData.length > 0) {
			setPets(localStorageData);
		}
	}, []);

	React.useEffect(() => {
		localStorage.setItem("pets", JSON.stringify(pets));
	}, [pets]);

	return (
		<Context.Provider value={{ openPetsOptions, showPetOptions, removePet, setPetFeed, resetPetFeed }}>
			<div className='wrapper'>
				<div className="pets" onClick={() => setShowPetOptions(null)}>
					<div className="pets__header">
						<div className="pets__header-block">
							<div className="pets__title">Pet accounter</div>
							<button className="add-btn bi bi-plus-lg" onClick={() => setShowAddForm(!showAddForm)}>Add</button>
						</div>
						<div className="pets__captions">
							<div className="pets__name">Name</div>
							<div className="pets__type">Type</div>
							<div className="pets__feed">Feed left</div>
						</div>
					</div>
					<hr className="pets__divider" />
					{showAddForm && <PetsDialog addPet={addPet} cancelForm={() => setShowAddForm(false)} />}
					<PetsList pets={pets} />
				</div>
				<div>
					<div className="user box">
						<div className="bi bi-person-circle"></div>
						<div className="user__name">Username</div>
						<div className="bi bi-gear-wide"></div>
					</div>
					{showPetOptions !== null && <PetsOptions pet={pets.find(item => item.id === showPetOptions)} />}
				</div>
			</div>
		</Context.Provider>
	)
}

export default App;
