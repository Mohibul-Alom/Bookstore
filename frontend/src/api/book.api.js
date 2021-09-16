const BASE_URL = "http://localhost:5000";

const bookGET = `${BASE_URL}/book`;
const bookPOST = `${BASE_URL}/book/create`;
const bookPUT = `${BASE_URL}/book/edit`;
const bookDELETE = `${BASE_URL}/book/delete`;

const getBooks = async() => {

    try {
        
        const req = await fetch(bookGET, {
            method: "GET",
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            },
        });
    
        const res = await req.json();
        return res;

    } catch (error) {
        console.error(error);
    }

}

const getBookById = async (id) =>{
    try {
        const req = await fetch(`${bookGET}/${id}`, {
            method: "GET",
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            },
        });
    
        const res = await req.json();
        return res;

    } catch (error) {
        console.error(error);
    }
}

const postBook = async(form) => {

    try {
        
        const req = await fetch(bookPOST, {
            method: "POST",
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(form)
        })

    } catch (error) {
        console.log(error);
    }

}

const editBook = async(form) => {
    try {
        
        const req = await fetch(bookPUT, {
            method: "PUT",
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(form)
        })
        const res = await req.json();
        return res;

    } catch (error) {
        console.log(error);
    }
}


const deleteBooks = async(form) => {
    try {

        const req = await fetch(bookDELETE, {
            method: "DELETE",
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(form)
        });
    
        const res = await req.json();

        return res;
        
    } catch (error) {
        console.error(error);
    }
}


export  {
    getBooks,
    getBookById,
    postBook,
    editBook,
    deleteBooks
}