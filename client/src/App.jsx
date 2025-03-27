import "./App.css";
import { useEffect, useState } from "react";


function App() {

	const [movies, setMovies] = useState([]);
	const [search, setSearch] = useState('');
	const [newMovie, setNewMovie] = useState('');

	useEffect(() => {
		fetch('http://localhost:3001/movies')
			.then((response) => response.json())
			.then((data) => setMovies(data));
	}
	, []);

	const handleSearch = (event) => {
		setSearch(event.target.value);
	}

	const handleAddMovie = (event) => {
		event.preventDefault();
		fetch('http://localhost:3001/movies', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title: newMovie })
		})
			.then((response) => response.json())
			.then((newMovieFromServer) => {
				setMovies((prevMovies) => [
					...prevMovies,
					newMovieFromServer
				]);
				setNewMovie('');
			});
	}

	const handleDeleteMovie = (id) => {
		fetch(`http://localhost:3001/movies/${id}`, {
			method: 'DELETE'
		})
			.then((response) => response.json())
			.then(() => {
				setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
			});
	}

	const filteredMovies = movies.filter((movie) => {
		return movie && movie.title && movie.title.toLowerCase().includes(search.toLowerCase());
	  });
	  


	return (
		<div className="App">
			<h1>Movies</h1>
			<input 
			type="text" 
			placeholder="Search for a movie"
			value={search} 
			onChange={handleSearch} 
			/>
			<form onSubmit={handleAddMovie}>
				<input 
				type="text" 
				placeholder="Add a new movie"
				value={newMovie} 
				onChange={(event) => setNewMovie(event.target.value)} 
				/>
				<button type="submit">Add</button>
			</form>
			<ul>
				{filteredMovies.map((movie) => (
					<li key={movie.id}>
						{movie.title}
						<button onClick={() => handleDeleteMovie(movie.id)}>Delete</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default App;
