export default bug

function bug(bug) {
    if (bug != undefined) {
        this._id = bug._id;
        this.name = bug.name;
        this.status = bug.status;
        this.details = bug.details;
        this.steps = bug.steps;
        this.priority = bug.priority;
        this.assigned = bug.assigned;
        this.author = bug.author;
        this.time = bug.time;
        this.comments = bug.comments;
    }
}