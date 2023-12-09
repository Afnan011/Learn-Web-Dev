class User{
    constructor(name, email){
        this.name = name;
        this.email = email;
    }

    courseList = []

    getInfo(){
        return{
            name: this.name,
            email:this.email
        }
    }

    enrollCourse(name){
        this.courseList.push(name)
    }

    getCourseList(){
        return this.courseList
    }

}

// const afnan = new User("Afnan", "afnan@gmail.com")

// afnan.enrollCourse("DSA")
// afnan.enrollCourse("asdf")
// afnan.enrollCourse("gg")
// console.log(afnan.getInfo().name);

// let courses = afnan.getCourseList();

// courses.forEach( (v) => {
//     console.log(v);
// })