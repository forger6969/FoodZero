const TOKEN = "8423556747:AAGU31YAaYVlpELm8B6KzBJozSe65g7rk5M";
const CHAT_ID = "6299152655";

function sendToTelegram(message) {
    fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
            parse_mode: "HTML"
        })
    })
        .then(res => res.json())
        .then(data => console.log("Отправлено в ТГ:", data))
        .catch(err => console.error("Ошибка при отправке:", err));
}





const menu = document.getElementById(`menu`)
const burger = document.getElementById(`burger`)
const close = document.getElementById(`close`)

burger.addEventListener(`click`, () => {
    menu.classList.add(`active`)
})

close.addEventListener(`click`, () => {
    menu.classList.remove(`active`)
})

const dropdownBox = document.getElementById("dropdown-time");
const dropDownBtn = document.getElementById("main-6-time-select");
const btnText = dropDownBtn.querySelector("p");
const options = document.querySelectorAll(".time-option")

const personDrop = document.getElementById("dropdown-person")
const personBtn = document.getElementById("main-6-person-input")
const persBtnText = personBtn.querySelector("p")
const personOpt = document.querySelectorAll(".person-option")

dropDownBtn.addEventListener("click", () => {
    if (dropdownBox.classList.contains("active")) {
        dropdownBox.classList.remove("active");
        dropDownBtn.classList.remove("active");
    } else {
        dropdownBox.classList.add("active");
        dropDownBtn.classList.add("active");
        personDrop.classList.remove("active")
    }
});

options.forEach(option => {
    option.addEventListener('click', () => {
        dropDownBtn.value = option.textContent;
        dropdownBox.classList.remove("active");
        dropDownBtn.classList.remove("active");
    });
});

const dataInput = document.getElementById("main-6-data-input")

dataInput.addEventListener("input", () => {
    let value = dataInput.value.replace(/\D/g, "");
    if (value.length > 2) {
        value = value.slice(0, 2) + "/" + value.slice(2);
    }
    if (value.length > 5) {
        value = value.slice(0, 5) + "/" + value.slice(5)
    }
    dataInput.value = value;
})

personBtn.addEventListener('click', () => {
    if (personDrop.classList.contains(`active`)) {
        personDrop.classList.remove(`active`)
        personBtn.classList.remove(`active`)
    } else {
        personDrop.classList.add(`active`)
        personBtn.classList.add(`active`)
        dropdownBox.classList.remove(`active`)
    }
})

personOpt.forEach(OptPers => {
    OptPers.addEventListener("click", () => {
        personBtn.value = OptPers.textContent
        personDrop.classList.remove("active")
        personBtn.classList.remove("active")
    })
})

const app = document.getElementById(`approved-btn`)
let allBronInfo = []

let bookingData = []


app.addEventListener(`click`, () => {

    let bookingData = []

    const data = dataInput.value;
    const time = dropDownBtn.value;
    const person = personBtn.value;
    const email = emailInput.value;

    bookingData.push(`День: ${data}`)
    bookingData.push(`Врем: ${time}`)
    bookingData.push(`Людей: ${person}`)

    console.log("Данные брони:", bookingData);

    let message = bookingData.join("\n");
    sendToTelegram(message);

    // очищаем поля
    dataInput.value = ``;
    dropDownBtn.value = "";
    personBtn.value = "";
    emailInput.value = ``;
});

const emailInput = document.getElementById(`footer-input`)
const emailBtn = document.getElementById(`footer-btn`)
const warning = document.getElementById(`warning-footer`)
const warningNot = document.getElementById(`warning-not`)

let userEmailArr = []

emailBtn.addEventListener(`click`, (event) => {
    event.preventDefault()
    emailInputValue = emailInput.value

    if (emailInputValue === "") {
        warning.classList.add(`active`)
        setTimeout(() => {
            warning.classList.remove(`active`)
        }, 2000);
    } else if (emailInput.value.includes(`@gmail.com`)) {
        let emailBtnText = emailBtn.textContent
        emailBtn.textContent = `Sended!`
        emailInput.value = ``
        setTimeout(() => {
            emailBtn.textContent = emailBtnText
        }, 2000);
    } else if (!emailInputValue.includes(`@gmail.com`)) {
        warningNot.classList.add(`active`)
        setTimeout(() => {
            warningNot.classList.remove(`active`)
        }, 2000);
    }

    bookingData.unshift(`email: ${emailInputValue}`)
    bookingData.push(`День: ${data}`)
    bookingData.push(`Врем: ${time}`)
    bookingData.push(`Людей: ${person}`)

    let message = bookingData.join("\n");
    sendToTelegram(message);

    console.log(bookingData);
})
