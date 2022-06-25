// Створити ToDoList

// інпут введення назви завдання, валідація (поле обов'язкове)
// при кліку на кнопку додати, завдання з'являється під формою, якщо поставити галочку біля завдання, то текст перекреслюється 
// якщо забрати галочку то перекреслення зникає
// можливість видалити завдання
// const form = document.querySelector("form")
// const input = form.elements["taskName"]
// const addButton = form.elements["addButton"]
// const taskInput = form.elements["taskName"]
// const toDoContainer = document.querySelector(".toDoListConatiner")
// function errorCheck(){
//     const formError = form.lastElementChild
//     console.log(formError)
//     if(formError.classList.contains("error")){
//         formError.remove()
//     }
// }
// taskInput.addEventListener("blur",function(){
//     validation(taskInput)
// })
// console.dir(taskInput)
// function validation(obj){
//     let error = true
//     if(obj.value.trim()===""){
//         errorCheck()
//         form.insertAdjacentHTML("beforeend",'<div class="error">input task field is empty</div>')
//         error = false
//     }else{
//         errorCheck()
//     }
//     return error
// }
// // form.insertAdjacentElement("beforeend",`<div class="task m-auto col-8 d-flex justify-content-between"><div class="col-11 m-auto"><input type="checkbox" id="checkbox" class="my-auto ms-1"> <label for="checkbox">${}</label></div><button class="col-1">×</button></div>`)

// form.addEventListener("submit",function(e){
//     e.preventDefault()
// })
// taskInput.addEventListener("change",function(){
//     validation(taskInput)
// })
// let counter = 0
// addButton.addEventListener("click",function(){
//     if(validation(taskInput)){
//         counter+=1
//         toDoContainer.insertAdjacentHTML("beforeend",`<div class="task m-auto col-8 d-flex justify-content-between">
//         <div class="col-11 m-auto">
//             <input type="checkbox" id="checkbox${counter}" name="task" class="taskCheck my-auto ms-1">
//             <label name="taskLabel" for="checkbox${counter}" class="taskLabel">${taskInput.value}</label>
//         </div>
//         <button class="col-1 removeBtn">×</button>
//     </div>`)
//         taskInput.value=""
//     }
// })
// toDoContainer.addEventListener("click",function(e){
//     if(e.target.classList.contains("removeBtn")){
//         let removeBtnParent = e.target.closest(".task")
//         removeBtnParent.remove()
//     }
//     if(e.target.classList.contains("taskCheck")){
//         let label = e.target.labels[0]
//         console.log(e.target.labels)
//         label.classList.toggle("underline")
//     }
// })
const form = document.getElementById("form")
const taskInput = document.getElementById("taskInput")
const indicator = document.querySelector(".indicator")
// const password = document.getElementById("password")
// const password2 = document.getElementById("password2")
// const email = document.getElementById("email")
const addButton = form.querySelector(".addTask")
indicatorAnim()
form.addEventListener("submit",function(e){
    e.preventDefault()
    validate()
})
form.addEventListener("click",(e)=>{
    if((e.target).classList.contains("checkbox")){
        const label =e.target.nextSibling.nextSibling;
        label.classList.toggle("overline")
        indicatorAnim()
    }
    if(e.target.classList.contains("removeBtn")){
        e.target.parentElement.remove()
        indicatorAnim()
    }
    if(e.target.classList.contains("markTask")){
        let allTasksArray = document.querySelectorAll(".input_controls_task label")
        allTasksArray.forEach(function(element){
            element.classList.add("overline")
            element.previousElementSibling.checked=true
        })
        indicatorAnim()
    }
    if(e.target.classList.contains("unMarkTask")){
        let allTasksArray = document.querySelectorAll(".input_controls_task label")
        allTasksArray.forEach(function(element){
            element.classList.remove("overline")
            element.previousElementSibling.checked=false
        })
        indicatorAnim()
    }
    if(e.target.classList.contains("removeMarkedTasks")){
        const markedTasksArray = form.querySelectorAll(".overline")
        markedTasksArray.forEach(function(element){
            element.parentElement.parentElement.remove()
        })
        indicatorAnim()
    }
})
function indicatorAnim(){
    const beforeElem = document.querySelector(".background")
    let markedTasksArray = document.querySelectorAll(".overline")
    let allTasksArray = document.querySelectorAll(".input_controls_task")
    const indicator = form.querySelector(".indicator")
    indicator.firstElementChild.innerHTML = `${markedTasksArray.length} of ${allTasksArray.length} tasks done`
    let backgroundFillingPercent = (markedTasksArray.length)/allTasksArray.length
    let width = backgroundFillingPercent*indicator.clientWidth
    beforeElem.style=`width:${width}px`
}
let counter = 0
function addTask(text){
    counter+=1
    taskInput.value=""
    addButton.insertAdjacentHTML("beforebegin",
        `<div class="input_controls_task">
        <div>
            <input id="checkbox${counter}" name="checkbox" class="checkbox" type="checkbox">
            <label for="checkbox${counter}">${text}</label>
        </div>
        <button class="removeBtn" style="width: 30px;height: 30px;" type="button">×</button>
    </div>`)
    indicatorAnim()
}
function setError(element,error){
    const inputControls = element.parentElement
    const errorMsg = inputControls.querySelector(".error")
    errorMsg.innerHTML=error
    inputControls.classList.add("error")
    inputControls.classList.remove("success")
    
}
// const isValidEmail = email => {
//     const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
// }
function setSuccess(element){
    const inputControls = element.parentElement
    const errorMsg = inputControls.querySelector(".error")
    inputControls.classList.add("success")
    inputControls.classList.remove("error")
    errorMsg.innerHTML=""
}
function validate(){
    const taskInputValue = taskInput.value.trim()
    // const passwordValue = password.value.trim()
    // const password2Value = password2.value.trim()
    // const emailValue = email.value.trim()
    if(taskInputValue===""){
        setError(taskInput,"Task field is empty")
    }else{
        setSuccess(taskInput)
        addTask(taskInputValue)
    }
    // if(emailValue===""){
    //     setError(email,"Email field is empty")
    // }else if(!isValidEmail(emailValue)){
    //     setError(email,"Email field has invalid format")
    // }else{
    //     setSuccess(email)
    // }
    // if(passwordValue===""){
    //     setError(password,"Password field is empty")
    // }else if(passwordValue.length<8){
    //     setError(password,"Password is too short")
    // }else{
    //     setSuccess(password)
    // }
    // if(password2Value===""){
    //     setError(password2,"Password2 field is empty")
    // }else if(password2Value.length<8){
    //     setError(password2,"Password is too short")
    // }else if(password2Value!=passwordValue){
    //     console.log("hhhh")
    //     setError(password2,"Password2 doesn't match password1")
    // }
    // else{
    //     setSuccess(password2)
    // }
}