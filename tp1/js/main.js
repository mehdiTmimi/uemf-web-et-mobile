// recuperer tous les elements
const refInput = document.querySelector("#refInput")
const intituleInput = document.querySelector("#intituleInput")
const prixInput = document.querySelector("#prixInput")
const effacerBtn = document.querySelector("#effacerBtn")
const ajouterBtn = document.querySelector("#ajouterBtn")
const updateBtn = document.querySelector("#updateBtn")
const tbody = document.querySelector("#tbody")
const dispMoyenne = document.querySelector("#dispMoyenne")
const loadingDiv = document.querySelector("#loadingDiv")
const URL = "http://localhost:3001/produits"
const load = () => {
    const xhr = new XMLHttpRequest()
    xhr.open("GET", URL, true)
    // affichage d'un loading
    loadingDiv.classList.remove("hidden")
    xhr.addEventListener("load", () => {
        // cache le loading
        loadingDiv.classList.add("hidden")
        if (xhr.status == 200) {
            let produits = JSON.parse(xhr.response)
            produits.forEach(produit => addProduit(produit))
        }
        else
            alert("erreur on loading produits")
    })
    xhr.addEventListener("error", () => {
        alert("error loading produits")
    })
    xhr.send()
}
load()
updateBtn.addEventListener('click', () => {
    let eles = [...document.querySelectorAll("#tbody td:nth-child(3)")]
    let moyenne =
        eles.map(ele => parseFloat(ele.innerText)).reduce((cml, value) => cml + value) / eles.length
    dispMoyenne.innerText = moyenne

})
// creer une fonction qui accepte en parametre un produit et qui le rajoute dans le tbody
const addProduit = (produit) => {
    // creer les elements
    const tr = document.createElement("tr")
    const td1 = document.createElement("td")
    const td2 = document.createElement("td")
    const td3 = document.createElement("td")
    const td4 = document.createElement("td")
    const buttonDelete = document.createElement("button")
    // les relier
    tbody.appendChild(tr)
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    td4.appendChild(buttonDelete)
    //les remplir
    let { id, ref, intitule, prix } = produit // object destructing
    // let ref = produit.ref
    // let intitule = produit.intitule
    // let prix = produit.prix
    td1.innerText = ref
    td2.innerText = intitule
    td3.innerText = prix
    buttonDelete.innerText = "X"

    buttonDelete.addEventListener("click", () => {
        loadingDiv.classList.remove("hidden")
        const xhr = new XMLHttpRequest()
        xhr.open("DELETE", URL + "/" + id, true)
        xhr.addEventListener("load", () => {
            loadingDiv.classList.add("hidden")
            if (xhr.status == 200)
                tr.remove()
            else alert("error deleting produit")
        })
        xhr.addEventListener("error", () => {
            alert("error delleting produit")
        })
        xhr.send()
    })
}
const effacer = () => {
    refInput.value = ""
    intituleInput.value = ""
    prixInput.value = ""
}
effacerBtn.addEventListener("click", () => {
    effacer()
})
ajouterBtn.addEventListener("click", () => {
    // recuperer les valeurs
    let ref = refInput.value
    let intitule = intituleInput.value
    let prix = prixInput.value
    // verifier
    if (!ref || !intitule || !prix)
        return alert("veuillez remplir tous les champs")

    //appeler la fonction addProduit
    let newProduit = { ref, intitule, prix }
    // let newProduit = {ref:ref, intitule:intitule, prix: prix}
    const xhr = new XMLHttpRequest()
    xhr.open("POST", URL, true)
    loadingDiv.classList.remove("hidden")
    xhr.addEventListener("load", () => {
        loadingDiv.classList.add("hidden")
        if (xhr.status == 201) {
            addProduit(newProduit)
            effacer()
        }
        else
            alert("error ...")
    })
    xhr.setRequestHeader("fsgd","sdgfxd")
    xhr.setRequestHeader("Content-Type","application/json")
    xhr.send(JSON.stringify(newProduit))
})
// let newProduit = {ref:"c01", intitule : "souris" , prix: 20}
// addProduit(newProduit)
// let newProduit2 = {ref:"c02", intitule : "claiver" , prix: 100}
// addProduit(newProduit2)
// let newProduit3 = {ref:"c03", intitule : "ecran" , prix: 2000}
// addProduit(newProduit3)