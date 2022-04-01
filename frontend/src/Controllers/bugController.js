import bugModel from '../Models/bugModel';

export function retrieveBugs() {
    let data = [];

    data.push(new bugModel({
        _id: 23456,
        name: "Crash on Load",
        details: "Crashes after 3 seconds",
        steps: "Open application and it will crash",
        assigned: "SB",
        author: "John Doe",
        priority: 1,
        time: "23:38",
    }))
    data.push(new bugModel({
        _id: 234532346,
        name: "Wont Load",
        details: "Crashes after 3 seconds",
        steps: "Open application and it will crash",
        assigned: "SB",
        author: "John Doe",
        priority: 3,
        time: "23:38",
    }))

    let sorted = data.sort((a, b) => a.priority - b.priority)

    return sorted;
}