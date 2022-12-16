import { getDoctors, getDoctorById, updateDoctors } from "/api.js";

const selectDoctors = document.getElementById("doctors")
const form = document.getElementById("my-form")
const select1 = document.createElement("select");
const reserveBtn = document.getElementById("reserve")

let selectedDoctor;
let reserveDate;



selectDoctors.onchange = () => {
    const id = getSelectedValue()
    getDoctorByIdHandler(id)
}
getDoctorsHandler();

select1.onchange = () => {
    reserveDate = getSelectedValue()
}

form.onsubmit = (e) => {
    e.preventDefault()
    selectedDoctor.dates.splice(selectedDoctor.dates.indexOf(reserveDate),1)
    selectedDoctor.reservations.push(gatherFormData(e))
    console.log(selectedDoctor);
    update(selectedDoctor.id, selectedDoctor)
}

async function getDoctorsHandler() {
    const result = await getDoctors();
    doctorsName(result);
}

function doctorsName(data) {
    data.map(doctor => {
        createOptionForSelectTag(doctor, selectDoctors)
    })
}

function createOptionForSelectTag(doctor, selectTag) {
    const option = document.createElement("option")
    option.value = doctor.id;
    option.innerText = doctor.name;
    selectTag.append(option);
}

function getSelectedValue() {
    return selectDoctors.value
}

async function getDoctorByIdHandler(id) {
    const result = await getDoctorById(id);
    selectedDoctor = result
    select1.id = "date"
    const emptyOption = document.createElement("option")
    emptyOption.innerHTML = "choose a date"
    select1.append(emptyOption)

    console.log(result);
    result.dates.forEach(date => {
        const option = document.createElement("option")
        option.value = date;
        option.innerText = new Date(date).toLocaleString("en-US");
        select1.append(option);
    })
    reserveBtn.before(select1);
}


function gatherFormData(e){
    const {name,lastName,phoneNumber} = e.target
    return {
        name : name.value,
        lastName : lastName.value,
        phoneNumber : phoneNumber.value
    }
}

async function update(id, doctor){
    const updateDoctor = await updateDoctors(id, doctor)
}