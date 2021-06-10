const apiUrl = '';

export const sendToApi = async (data) => {
    try {
        const res = await fetch(apiUrl, {
            method: 'POST',
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
            const result = await res.json();
            console.log(result);

        } catch (e) {
            throw new Error(e);
        }
}
