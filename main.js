// const result = document.getElementById("result");
// const pagination = document.getElementById("pagination")
// let getSelected
// let users = []
// let current__page = 1
// let user__per__page = 5



// document.getElementById("select").addEventListener("change", () => {
//     displayUser()
//     paginationBtns()
//     getSelecetedValue()
// })

// function getSelecetedValue() {
//     const selectEl = document.getElementById("select")
//     user__per__page = +selectEl.value
    
    
// }

// document.addEventListener("DOMContentLoaded", () => {
//     getUsers()
// })



// async function getUsers() {
//     try{
//         const response = await fetch("https://jsonplaceholder.typicode.com/users")
//         users = await response.json()
//         displayUser()
//         paginationBtns()
//     }catch(error) {
//         console.log(error);
        
//     }
// }

// function displayUser() {
//     result.innerHTML = ""
//     let start = (current__page - 1) * user__per__page
//     let end = start + user__per__page
//     let pagenated__users = users.slice(start, end)

//     pagenated__users.forEach(item => {
//         let tr = document.createElement("tr")
//         tr.innerHTML = `
//             <td>${item.id}</td>
//             <td>${item.name}</td>
//             <td>${item.username}</td>
//             <td>${item.email}</td>
//             <td>${item.address.street}</td>
//             <td>${item.phone}</td>
//             <td>${item.website}</td>
//             <td>${item.company.name}</td>
//         `
//         result.appendChild(tr)
//     })
// }


// function paginationBtns() {
//     pagination.innerHTML = ""
//     let totalPages = Math.ceil(users.length / user__per__page)
//     for (let i = 1; i <= totalPages; i++) {
//         let btn = document.createElement("button")
//         btn.innerHTML = i
//         btn.className = current__page === i ? "btn btn-primary mx-1" : "btn border-primary mx-1"
//         btn.addEventListener("click", () => {
//             current__page = i
//             displayUser()
//             paginationBtns()
//         })
//         pagination.appendChild(btn)
//     }
// }


const result = document.getElementById("result");
const pagination = document.getElementById("pagination");
const userModal = document.getElementById("userModal");
const userForm = document.getElementById("userForm");

let users = [];
let current_page = 1;
let user_per_page = 5;

// Modalni ochish
function openModal() {
    userModal.style.display = 'block';
}

// Modalni yopish
function closeModal() {
    userModal.style.display = 'none';
}

function delUser(id) {
    users = users.filter(user => user.id !== id)
    displayUser()
    paginationBtns()
}

// Modal orqali foydalanuvchi ma'lumotlarini qo'shish
function saveUser() {
    const formData = new FormData(userForm);
    const user = {
        id: users.length + 1,
        name: formData.get('name'),
        username: formData.get('username'),
        email: formData.get('email'),
        address: formData.get('address'),
        phone: formData.get('phone'),
        website: formData.get('website'),
        company: formData.get('company'),
    };

    users.push(user);
    userForm.reset();
    closeModal();
    displayUser();
    paginationBtns();
}


// Foydalanuvchilarni jadvalda ko'rsatish
function displayUser() {
    result.innerHTML = "";
    let start = (current_page - 1) * user_per_page;
    let end = start + user_per_page;
    let paginated_users = users.slice(start, end);

    paginated_users.forEach(item => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.username}</td>
            <td>${item.email}</td>
            <td>${item.address}</td>
            <td>${item.phone}</td>
            <td class="ml-4">
                <button onclick="delUser(${item.id})" class="btn btn-danger w-75 ">DEl</button>
            </td>
        `;
        result.appendChild(tr);
    });
}

// Paginatsiya tugmalarini yaratish
function paginationBtns() {
    pagination.innerHTML = "";
    let totalPages = Math.ceil(users.length / user_per_page);
    for (let i = 1; i <= totalPages; i++) {
        let btn = document.createElement("button");
        btn.innerHTML = i;
        btn.className = current_page === i ? "btn btn-primary mx-1" : "btn btn-secondary mx-1";
        btn.addEventListener("click", () => {
            current_page = i;
            displayUser();
            paginationBtns();
        });
        pagination.appendChild(btn);
    }
}

// Select orqali foydalanuvchilar sonini o'zgartirish
document.getElementById("select").addEventListener("change", (event) => {
    user_per_page = +event.target.value;
    displayUser();
    paginationBtns();
});
