const person = {
    firstName : 'join',
    lastName : 'Doe',
    age : 30,
    gender : 'male',
    occupation : 'developer',
    nationality : 'America',
    city : 'New York',
    hobbies : ['reading','traveling','photography'],
    languages : ['English', 'Spanish'],
    education : {
        degree: 'Bachelor',
        major : 'Computer Science',
        university : 'Harvard University'
    }
};

// const {firstName, gender, education,languages} = person;

const {firstName, gender, education,languages, ...rest} = person;

const student = {
    firstName,
    gender,
    degree: education.degree,
    english : languages[0]
}
console.log(student);