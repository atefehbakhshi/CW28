const url = "http://localhost:3000/doctors"
export const getDoctors = async () => {
    try {
        const response = await fetch(url);
        const data = response.json();
        return data;
    } catch (e) {
        console.log(e.message)
    }
}

export const getDoctorById = async (id) => {
    try {
        const response = await fetch(`${url}/${id}`)
        const data = response.json()
        return data
    }catch(e){
        console.log(e.message);
    }
}

export const updateDoctors = async (id,doctor) => {
    try {
        await fetch(`${url}/${id}`,{
            method: "PUT",
            body: JSON.stringify(doctor),
            headers: { "Content-Type": "application/json" },
        })
    }catch(e){
        console.log(e.message);
    }
}


