export default () => {
   // const faker = self.importScripts("http://localhost:3000/data.js"); // eslint-disable-line no-restricted-globals
    self.addEventListener('message', e => { // eslint-disable-line no-restricted-globals
        if (!e) return;
        switch (e.data.type) {
            case 'list':
            default:
                postMessage(fetchUsers())
                break;
            case 'sort':
                postMessage(sorting(e.data))
                break;
        }
    })

    const sorting = ({order, users}) => {
        const fn = order === 'asc'
            ? (a, b) => a < b
            : (a, b) => a > b

        const slowSort = (users, fn) =>{
            const copy = [].concat(users);
            for (let i = 0; i < copy.length-1; i++)
                for (let j = i+1; j < copy.length; j++)
                    if (fn(copy[j].commentCount, copy[i].commentCount)) [copy[i],copy[j]] = [copy[j],copy[i]]
            return copy
        }
        return slowSort(users, fn);
    }

    const fetchUsers = () => {
        self.importScripts("http://45.55.61.142:8086/data.js"); // eslint-disable-line no-restricted-globals
        return users; // eslint-disable-line no-undef
    }
}



