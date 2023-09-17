import './App.css';
import {useState, useEffect} from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import AboutView from './components/AboutView'
import SearchView from './components/SearchView'
import { Routes, Route } from 'react-router-dom';
import React from 'react';
import MovieView from './components/MovieView'




function App() {

  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if(searchText){
    fetch(`https://api.themoviedb.org/3/search/movie?query=${searchText}&language=en-US&api_key=1d02c59884e6c61d9fd0278a52a48fd0`)
    .then(response => response.json())
    .then (data => {
      setSearchResults(data.results)
    })
  }
  }, [searchText])



  return (
    <div >
        <Navbar searchText={searchText} setSearchText={setSearchText} />
        <Routes>
        <Route path="/about" element={<AboutView />} />
        <Route path="/" element={<Home />} />
        <Route path='/search' element={<SearchView keyword={searchText} searchResults={searchResults} />}/>
        <Route path="/movies/:id" element={<MovieView />} />
        </Routes>
    </div>
  );
}

export default App;
