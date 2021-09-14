import React, {useState,useEffect} from 'react';

import { Header } from '../../sections';
import {getBooks} from '../../../api/book.api';

function HomeLayout() {

    const [books, setBooks] = useState([]);

    useEffect(()=> {
        getBooks()
        .then(result => {
            setBooks(result);
            // console.log(result);
        })
        .catch(err => {
            console.log(err);
        })
    },[])

    return (
        <div>
            <Header/>
            <h1>HomeLayout</h1>
            <ul>
                {books.map(book =>(
                    <li key={book._id}>
                        {book.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default HomeLayout
