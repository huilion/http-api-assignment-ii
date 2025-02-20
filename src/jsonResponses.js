const users = {};

// Sending JSON responses
const respondJSON = (request, response, status, object) => {
  const content = JSON.stringify(object);

  // Response headers
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);

  // Write content if GET
  if (request.method !== 'HEAD') {
    response.write(content);
  }

  response.end();
};

// Get users and return the response
const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };

  return respondJSON(request, response, 200, responseJSON);
};

// Take form input and add user
const addUser = (request, response) => {
  const responseJSON = {
    message: 'Name and age are required',
  };

  const { name, age } = request.body;

  // If inputs are not satisfied...
  if (!name || !age) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 204;

  // Adding a unique user
  if (!users[name]) {
    responseCode = 201;
    users[name] = {
      name, age,
    };
  }

  // If name exists, update age
  users[name].age = age;

  // Created successfully
  if (responseCode === 201) {
    responseJSON.message = 'Created successfully!';
    return respondJSON(request, response, responseCode, responseJSON);
  }
  // Sending back 204
  return respondJSON(request, response, responseCode, {});
};

const notFound = (request, response) => {
  const responseJSON = {
    message: "The page you are looking for doesn't exist",
    id: 'notFound',
  };

  respondJSON(request, response, 404, responseJSON);
};

module.exports = {
  getUsers,
  addUser,
  notFound,
};
