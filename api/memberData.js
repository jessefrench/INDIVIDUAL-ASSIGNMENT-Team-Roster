import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getMembers = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/members.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const deleteMember = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/members/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const getSingleMember = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/members/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createMember = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/members.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateMember = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/members/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const searchMembers = async (searchValue, uid) => {
  const allMembers = await getMembers(uid);

  const filteredMembers = await allMembers.filter((member) => (
    member.name.toLowerCase().includes(searchValue)
    || member.role.toLowerCase().includes(searchValue)
  ));

  return filteredMembers;
};

export {
  getMembers,
  createMember,
  deleteMember,
  getSingleMember,
  updateMember,
  searchMembers,
};
