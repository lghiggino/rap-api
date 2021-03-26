const deleteText = document.querySelectorAll(".delete")

Array.from(deleteText).forEach(element => {
    element.addEventListener("click", deleteRapper)
})

//async
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