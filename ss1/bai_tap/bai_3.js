const getInfo = ({firstName = 'Quân', degree = 'NA'}) =>{
    console.log(`firstName : ${firstName}`);
    console.log(`degree : ${degree}`);
}

const sv1 ={
    firstName : 'join',
    gender: 'male',
    degree: 'Bachelor',
    english : 'English'
}

const sv2={
    name : 'John',
    gender: 'male',
    degree: 'Bachelor',
    english : 'English'
}
getInfo(sv1);
getInfo(sv2);