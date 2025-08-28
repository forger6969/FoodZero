const menu = document.getElementById(`menu`)
const burger = document.getElementById(`burger`)
const close = document.getElementById(`close`)

burger.addEventListener(`click`, () => {
    menu.classList.add(`active`)
})

close.addEventListener(`click`, () => {
    menu.classList.remove(`active`)
})
