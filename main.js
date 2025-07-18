let users = [];

function fetchUsers() {
  new Promise((resolve) => {
    let request = new XMLHttpRequest();
    request.open("GET", "https://jsonplaceholder.typicode.com/users");
    request.send();
    resolve(request);
  }).then((request) => {
    request.onload = () => {
      if (request.status >= 200 && request.status < 300) {
        let response = JSON.parse(request.response);

        response.forEach(({ name, email, id }) =>
          users.push({ id, name, email })
        );

        populateUsers();
      } else {
        console.log("faield: " + request.status);
      }
    };
  });
}

function fetchUsersPosts(userId) {
  new Promise((resolve) => {
    let request = new XMLHttpRequest();

    request.open(
      "GET",
      "https://jsonplaceholder.typicode.com/users/" + userId + "/posts"
    );

    request.send();
    resolve(request);
  }).then((request) => {
    let posts = [];
    request.onload = () => {
      if (request.status >= 200 && request.status < 300) {
        let response = JSON.parse(request.response);
        response.forEach(({ title, body }) => posts.push({ title, body }));
        populateUsersPosts(posts);
      } else {
        console.log("faield: " + request.status);
      }
    };
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
