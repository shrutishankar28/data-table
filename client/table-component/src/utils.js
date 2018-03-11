export default async function apiRequest(payload = JSON.stringify(({}))) {
    try {
        let responseJson = {};
        const reqURL = "http://localhost:1337/";
        const response = await fetch(reqURL, {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: payload
        });
        if (response.status === 200) {
            responseJson = await response.json();
            return responseJson;
        } else {
            throw 'Error'; 
        }
    } catch (error) {
        throw error;
    }
}