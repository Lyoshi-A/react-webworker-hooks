var fs = require('fs');
var faker = require('faker');
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
fs.appendFile('data.json', JSON.stringify(users), function (err) {
    if (err) throw err;
    console.log('Saved!');
});
