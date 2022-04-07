import bugModel from '../Models/bugModel';
import axios from 'axios';

export const retrieveBugs = async () => {
    const result = await axios.get('http://localhost:5000/bugs/')
    const data = result;
    console.log(result)
}

// export function retrieveBugs() {
//     let data = [];

//     data.push(new bugModel({
//         _id: 1,
//         name: "Crash on Load",
//         details: "Crashes after 3 seconds",
//         status: "open",
//         steps: "Open application and it will crash",
//         assigned: "SB",
//         author: "John Doe",
//         priority: 1,
//         time: "23:38",
//         comments: ['hello'],
//     }))
//     data.push(new bugModel({
//         _id: 2,
//         name: "Wont Load",
//         details: "Crashes after 3 seconds",
//         status: "closed",
//         steps: "Open application and it will crash",
//         assigned: "SB",
//         author: "John Doe",
//         priority: 3,
//         time: "23:38",
//         comments: ['hello'],
//     }))

//     let sorted = data.sort((a, b) => {return a.priority - b.priority})

//     return sorted;
// }
