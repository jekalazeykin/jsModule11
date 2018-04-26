const allUsers = document.querySelector('#btn-users');
const outputUsers = document.querySelector('#output-users');
const outputUser = document.querySelector('#output-user');
const userById = document.querySelector('#btn-user');
const sbmt = document.querySelector('#sbmt');
const dlt = document.querySelector('#btn-dlt');
const rmv = document.querySelector('#btn-remove');

const getAllUsers = () => {

    fetch(" https://test-users-api.herokuapp.com/users/")
        .then(response => {
          if (response.ok) return response.json();
          throw new Error("Error fetching data");
        })
        .then(users => {
          const obj = users;
          for(let i =0; i< obj.data.length; i++){
          const table = document.createElement('tr');
          table.classList.add(`class${i}`);
          outputUsers.append(table);
          table.textContent =   JSON.stringify(`id: ${obj.data[i].id} name: ${obj.data[i].name}  age: ${obj.data[i].age}`);
      }
        })
        .catch(error => {
          console.error("Error:", error);
        })
}

allUsers.addEventListener("click", getAllUsers);

const getUserById = () => {

    const id = (document.querySelector('#txt')).value;
    fetch(`https://test-users-api.herokuapp.com/users/${id}`)
        .then(response =>{
          if (response.ok) return response.json();
          throw new Error("Error fetching data");
        })
        .then(user => {
          const object = user;
          outputUser.textContent = JSON.stringify(`name: ${object.data.name}, age: ${object.data.age}` );
        })
        .catch(error => {
          console.error("Error:", error);
        })
}

userById.addEventListener("click", getUserById)

const addUser = () => {
  const name = (document.querySelector('#name')).value;
  const age = (document.querySelector('#age')).value;
  fetch('https://test-users-api.herokuapp.com/users', {
    method: 'POST',
    body: JSON.stringify({ name: name, age: age}),
    headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
})
    .then(response =>{
      if (response.ok) return response.json();
      throw new Error("Something bad");
})
    .catch(error => {
      console.error("Error:", error);
})
};

sbmt.addEventListener("click", addUser);

const removeUser = () => {

    const id = (document.querySelector('#dlt')).value;
    fetch(`https://test-users-api.herokuapp.com/users/${id}`,{
      method: 'DELETE'
    })
      .then(response =>{
        if (response.ok) return response.json();
        throw new Error("Something bad");
})
      .catch(error => {
        console.error("Error:", error);
})
};

dlt.addEventListener("click", removeUser);

const updateUser = () => {
    const id = (document.querySelector('#remove')).value;
    const newName = (document.querySelector('#new-name')).value;
    const newAge = (document.querySelector('#new-age')).value;
    fetch(`https://test-users-api.herokuapp.com/users/${id}`,{
      method: 'PUT',
      body: JSON.stringify({ name: newName, age: newAge}),
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  })
    .then(response =>{
      if (response.ok) return response.json();
      throw new Error("Something bad");
})
    .catch(error => {
      console.error("Error:", error);
})
}

rmv.addEventListener("click", updateUser);
