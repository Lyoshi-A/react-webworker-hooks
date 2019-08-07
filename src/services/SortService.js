import faker from 'faker';

export function fetchUsers() {
    const users = [];

    for (let i = 0; i < 10000; i++) {
        let id = faker.random.uuid();
        let name = faker.name.findName();
        let email = faker.internet.email();
        const dt = new Date(faker.date.recent());
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let joinedOn = dt.toLocaleDateString('en-EN', options);
        let commentCount = faker.random.number();
        let user = {
            id,
            name,
            email,
            joinedOn,
            commentCount
        };
        users.push(user);
    }
    return Promise.resolve(users);
}

export const slowSort = (users, fn) =>{
    const copy = [...users];
    for (let i = 0; i < copy.length-1; i++)
        for (let j = i+1; j < copy.length; j++)
            if (fn(copy[j].commentCount, copy[i].commentCount)) [copy[i],copy[j]] = [copy[j],copy[i]]
    return copy
}


