//Easy HTTP Lib v2

class EasyHTTP {
    async get(url) {
        const response = await fetch(url);
        const resData = await response.json();
        return resData;

    }
    async post(url, data) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)

        });
        const resData = await response.json();
        return resData;
}

    //HTTP  Put Update
    async put(url, data) {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)

        });
        const resData = await response.json();
        return resData;
    }

    //HTTP DELETE
    async delete(url) {
    const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        });
        const resData = await "Resources Delete";
        return resData;
    }
}