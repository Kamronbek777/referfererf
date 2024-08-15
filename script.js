const userList = document.querySelector('.list');
const userForm = document.querySelector('form');
const numberInput = document.querySelector('.number');
const ageInput = document.querySelector('.age');

function renderUsers(users, title) {
  const html = `
    <h1>${title}</h1>
    <ul>
      ${users.map((user) => `
        <li class="list-item">
          <h2 class="name">Name: ${user.firstName}</h2>
          <p class="email">Email: ${user.email}</p>
          <h3 class="age">Age: ${user.age}</h3>
          <p class="address">Address: ${user.address}</p>
          <h3 class="phone">Phone number: ${user.phone}</h3>
        </li>
      `).join('')}
    </ul>
  `;
  userList.innerHTML += html;
}

userForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const limit = parseInt(numberInput.value, 10);
  const minAge = parseInt(ageInput.value, 10);

  fetch('https://dummyjson.com/users')
    .then(response => response.json())
    .then((data) => {
      const filteredUsers = data.users.filter((user) => user.age >= minAge);
      const limitedUsers = filteredUsers.slice(0, limit);
      const otherUsers = filteredUsers.slice(limit);

      userList.innerHTML = '';
      renderUsers(limitedUsers, `First ${limit} Users`);
      renderUsers(otherUsers, 'Others');
    });
});