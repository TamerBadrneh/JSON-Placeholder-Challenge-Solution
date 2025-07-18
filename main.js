let users = [];

function fetchUsers() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) => {
      data.forEach(({ name, email, id }) => users.push({ id, name, email }));
      populateUsers();
    });
}

function fetchUsersPosts(userId) {
  fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
    .then((response) => response.json())
    .then((data) => {
      let posts = [];
      data.forEach(({ title, body }) => posts.push({ title, body }));
      populateUsersPosts(posts);
    });
}

function populateUsers() {
  users.forEach((user) => {
    $("#users-section").append(
      `
        <article onclick="fetchUsersPosts(${user.id})" class="card" style="width: 18rem">
            <div class="card-body">
                <h2 class="card-title">${user.name}</h2>
                <p class="card-text">${user.email}</p>
            </div>
        </article>
      `
    );
  });
}

function populateUsersPosts(posts) {
  $("#posts-section").html(
    `<h2 class="w-100 text-center mb-4 mt-3">User's Posts</h2>`
  );

  posts.forEach((post) => {
    $("#posts-section").append(
      `
        <article class="card" style="width: 18rem">
            <div class="card-body">
                <h2 class="card-title">${post.title}</h2>
                <p class="card-text">
                ${post.body}
                </p>
            </div>
        </article>
      `
    );
  });
}

fetchUsers();
