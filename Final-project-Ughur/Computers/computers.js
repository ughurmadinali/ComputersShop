const tbody = document.querySelector('tbody')
const currentUser = localStorage.getItem('currentUser')
const users = JSON.parse(localStorage.getItem('users'))
const addBtn = document.querySelector('#addBtn')

const myComputers = users.find((user) => user.name === currentUser).computers
let change = false

function updateTable(){
    tbody.innerHTML = ''

    for (let computer of myComputers){  
        tbody.innerHTML += `<tr>
                               <td>${computer.id}</td>
                               <td>${computer.mark}</td>
                               <td>
                                  <img src="${computer.img}" alt="">
                                </td>
                                <td>
                                   <button class="btn btn-danger">Delete</button>
                                   <button class="btn btn-primary">Change</button>
                                </td>
                            <tr>`;
        }
}

updateTable()

const allInputs = document.querySelectorAll('input')

function addComputer(){
    if(!change){
        const newComputer = {
            id: myComputers.length === 0 ? 1 : myComputers.at(-1).id + 1,
            mark: allInputs[0],
            ram: allInputs[1],
            gpu: allInputs[2],
            image: allInputs[3],
            cpu: allInputs[4],
            rom: allInputs[5],
            os: allInputs[6],
            new: allInputs[7],
        }

        myComputers.push(newComputer)
        for(let input of allInputs){
            input.value = ''
        }
        for(let user of users){
            if(user.name === currentUser){
                user.computers = myComputers
            }
        }
        localStorage.setItem('users', JSON.stringify(users))
        updateTable()
    }
}

addBtn.addEventListener('click', addComputer)