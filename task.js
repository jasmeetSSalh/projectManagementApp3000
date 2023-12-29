export default class Task {
    constructor(id, name, description, personName, assignedTo, dueDate, status, lastModified) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.personName = personName;
        this.assignedTo = assignedTo;
        this.dueDate = dueDate;
        this.status = status;
        this.lastModified = lastModified;
    }
    speak () {
        console.log(`${this.name} says hello!`);
    }
}