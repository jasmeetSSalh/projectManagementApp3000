export default class Task {
    constructor(id, name, description, assignedTo, dueDate, status, lastModified, creator) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.assignedTo = assignedTo;
        this.dueDate = dueDate;
        this.status = status;
        this.lastModified = lastModified;
        this.creator = creator;
    }
    speak () {
        console.log(`${this.name} says hello!`);
    }
}