export default class Project {
    constructor(id, name, description, lastModified, creator) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.tasks = [];
        this.users = [];
        this.lastModified = lastModified;
        this.creator = creator;
    }
    speak () {
        console.log(`${this.name} says hello!`);
    }
}