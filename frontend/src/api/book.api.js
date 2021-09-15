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
    deleteBooks
}