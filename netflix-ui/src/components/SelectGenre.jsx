//Component to select a particular genre
import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { fetchDataByGenre } from '../store';

export default function SelectGenre({genres,type}) {
    const dispatch = useDispatch();
  return (
    //of type select 
    //if we change the genre then we will fetch the movie by that genre using dispatch
    //where that genre will be target value that we selected
    <Select className='flex' onChange={e => {
        dispatch(fetchDataByGenre({genre:e.target.value,type}))
    }}>
        {/* //we map all the genres type which will be shown as option and we can select any one genre */}
        {genres.map((genre)=> {
            return <option value={genre.id} key={genre.id}>{genre.name}</option>
        })}
    </Select>
  )
}

const Select = styled.select`
    margin-left:5rem;
    cursor:pointer;
    font-size:1.4rem;
    background-color:rgba(0,0,0,0.4);
    color:white;
`