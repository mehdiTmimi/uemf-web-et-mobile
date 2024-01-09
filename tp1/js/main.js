// recuperer tous les elements
const refInput = document.querySelector("#refInput")
const intituleInput = document.querySelector("#intituleInput")
const prixInput = document.querySelector("#prixInput")
const effacerBtn = document.querySelector("#effacerBtn")
const ajouterBtn = document.querySelector("#ajouterBtn")
const tbody = document.querySelector("#tbody")

// creer une fonction qui accepte en parametre un produit et qui le rajoute dans le tbody
const addProduit = (produit)=>{
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
    let {ref,intitule,prix} = produit // object destructing
    // let ref = produit.ref
    // let intitule = produit.intitule
    // let prix = produit.prix
    td1.innerText=ref
    td2.innerText=intitule
    td3.innerText=prix
    buttonDelete.innerText="X"

    buttonDelete.addEventListener("click",()=>{
        tr.remove()
    })
}
const effacer = ()=>{
    refInput.value=""
    intituleInput.value=""
    prixInput.value=""
}
effacerBtn.addEventListener("click",()=>{
    effacer()
})
ajouterBtn.addEventListener("click",()=>{
    // recuperer les valeurs
    let ref = refInput.value
    let intitule = intituleInput.value
    let prix = prixInput.value
    // verifier
    if(!ref || !intitule || !prix)
        return alert("veuillez remplir tous les champs")

    //appeler la fonction addProduit
    let newProduit = {ref, intitule, prix}
   // let newProduit = {ref:ref, intitule:intitule, prix: prix}
    addProduit(newProduit)
    effacer()
})
// let newProduit = {ref:"c01", intitule : "souris" , prix: 20}
// addProduit(newProduit)
// let newProduit2 = {ref:"c02", intitule : "claiver" , prix: 100}
// addProduit(newProduit2)
// let newProduit3 = {ref:"c03", intitule : "ecran" , prix: 2000}
// addProduit(newProduit3)