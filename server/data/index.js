import mongoose from "mongoose";
import { faker } from '@faker-js/faker';

export const users = [];
export const posts = [];

for (let i = 0; i < 500; i++) {
    users.push({
        _id: new mongoose.Types.ObjectId(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        picturePath: faker.image.imageUrl(),
        friends: [],
        location: faker.address.city() + ', ' + faker.address.stateAbbr(),
        occupation: faker.name.jobTitle(),
        viewedProfile: Math.floor(Math.random() * 10000),
        impressions: Math.floor(Math.random() * 10000),
        createdAt: faker.date.past().getTime(),
        updatedAt: faker.date.recent().getTime(),
        __v: 0,
    });
}

for (let i = 0; i < 1000; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    posts.push({
        _id: new mongoose.Types.ObjectId(),
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        location: user.location,
        description: faker.lorem.sentences(),
        picturePath: faker.image.imageUrl(),
        userPicturePath: user.picturePath,
        likes: new Map(),
        comments: [],
    });
    for (let j = 0; j < 4; j++) {
        posts[i].likes.set(users[Math.floor(Math.random() * users.length)]._id, true)
    }
    for (let k = 0; k < 4; k++) {
        posts[i].comments.push(faker.lorem.sentence())
    }
}