const BASE_URL = "http://localhost:5000";

const authorGET = `${BASE_URL}/author`;
const authorPOST = `${BASE_URL}/author/create`;
const authorPUT = `${BASE_URL}/author/edit`;
const authorDELETE = `${BASE_URL}/author/delete`;


const getAuthor = async() => {

    try {
        
        const req = await fetch(authorGET, {
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

const postAuthor = async(form) => {

    try {
        
        const req = await fetch(authorPOST, {
            method: "POST",
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

const putAuthor = async(form) => {
    
    try {
        const req = await fetch(authorPUT, {
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


const deleteAuthor = async(form) => {
    try {

        const req = await fetch(authorDELETE, {
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
    getAuthor,
    postAuthor,
    putAuthor,
    deleteAuthor,
}