import { v4 as uuid } from 'uuid';

export const defaultUser = {
  id: uuid(),
  username: 'dandie_jadie',
  name: 'Jade Kang',
  profile_image:
    'https://media.licdn.com/dms/image/C5603AQEc7KLxlNmepQ/profile-displayphoto-shrink_400_400/0/1629602117313?e=1677715200&v=beta&t=DQsUN-iAPSQ_xxQvofjuvoc8tAh9P_B1scn5ZQyVA0o',
};

export function getDefaultUser() {
  return {
    id: uuid(),
    username: 'username',
    name: 'name',
    profile_image:
      'https://reedbarger.nyc3.digitaloceanspaces.com/reactbootcamp/avatar.png',
  };
}

export const defaultPost = {
  id: uuid(),
  likes: 10,
  caption: `<span class="">Do you know the 10 JavaScript concepts you need to learn React? 🤔⚛️👇<br>•<br>•<br>👉 Get the FREE cheatsheet to learn them now: bit.ly/10-js-tips 🔥</span>`,
  user: defaultUser,
  media:
    'https://reedbarger.nyc3.digitaloceanspaces.com/reactbootcamp/post.jpeg',
  comments: [],
  created_at: '2020-02-28T03:08:14.522421+00:00',
};

export function getDefaultPost() {
  return {
    id: uuid(),
    likes: 10,
    caption: `<span class="">Do you know the 10 JavaScript concepts you need to learn React? 🤔⚛️👇<br>•<br>•<br>👉 Get the FREE cheatsheet to learn them now: bit.ly/10-js-tips 🔥</span>`,
    user: defaultUser,
    media:
      'https://reedbarger.nyc3.digitaloceanspaces.com/reactbootcamp/post.jpeg',
    comments: [],
    created_at: '2020-02-28T03:08:14.522421+00:00',
  };
}

export const defaultNotifications = [
  {
    id: uuid(),
    type: 'follow',
    user: defaultUser,
    created_at: '2020-02-29T03:08:14.522421+00:00',
  },
  {
    id: uuid(),
    type: 'like',
    user: defaultUser,
    post: defaultPost,
    created_at: '2020-02-29T03:08:14.522421+00:00',
  },
];

export const defaultCurrentUser = {
  id: uuid(),
  username: 'dandie_jadie',
  name: 'Jade Kang',
  profile_image:
    'https://media.licdn.com/dms/image/C5603AQEc7KLxlNmepQ/profile-displayphoto-shrink_400_400/0/1629602117313?e=1677715200&v=beta&t=DQsUN-iAPSQ_xxQvofjuvoc8tAh9P_B1scn5ZQyVA0o',
  website: 'https://jadekang.me',
  email: 'j.dandyloper@gmail.com',
  bio: 'This is my bio',
  phone_number: '555-555-5555',
  posts: Array.from({ length: 10 }, () => getDefaultPost()),
  gender: 'Male',
  followers: [defaultUser],
  following: [defaultUser],
};
