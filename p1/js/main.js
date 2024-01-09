const btns = [...document.querySelectorAll("button")]
// document.getElementsByTagName("button")
const bonjour = (event)=>{
    alert(event.target.innerText)
}
btns.forEach(btn=>{
    btn.addEventListener('click',bonjour)
})