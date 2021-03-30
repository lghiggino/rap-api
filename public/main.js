const deleteText = document.querySelectorAll(".delete")

Array.from(deleteText).forEach(element => {
    element.addEventListener("click", deleteRapper)
})

async function deleteRapper(){
    // console.log(e.target.parentElement.childNodes[1].innerText)
    const sName = this.parentNode.childNodes[1].innerText
    const bName = this.parentNode.childNodes[3].innerText
    try {
        const response = await fetch("deleteRapper", {
            method: "delete",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "stageNameS" : sName,
                "birthNameS" : bName
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }
    catch(err){
        console.log(err)
    }
}   


// EDIT TEXT
const editText = document.querySelectorAll(".edit")

Array.from(editText).forEach(element => {
    element.addEventListener("click", showModal)
})

function showModal(){
    const modal = document.querySelector(".modal")
    modal.classList.add("is-active")

    document.querySelector(".modal-close").addEventListener("click", () => {
        modal.classList.remove("is-active")
    })

    const rapperId = document.getElementById("rapperId")
    rapperId.innerHTML = `
        <li class="has-text-white">${this.parentNode.childNodes[1].innerText}</li>
        <li class="has-text-white">${this.parentNode.childNodes[3].innerText}</li>
    `
    
}


//async function editRapper(){
    // const sName = this.parentNode.childNodes[1].innerText
    // const bName = this.parentNode.childNodes[3].innerText
    // try{






        // document.querySelector(".modal-close").addEventListener("click", () => {
        //     modal.classList.remove("is-active")
        // })
    //}
    // catch(err){
    //     console.log(err)
    // }
    
//}