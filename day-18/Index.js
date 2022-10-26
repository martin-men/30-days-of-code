import { Person } from './Person.js';
import { People_Structure } from './People_Structure.js';

let people = new People_Structure();
let flag = true, nationalFlag = true, opt, name = '', age = 0, height = 0, national = true, person;

while (flag) {
    opt = prompt('1. Add person\n' + 
    '2. Delete person\n' + 
    '3. Show people\n' + 
    '4. Operations with candies\n' +
    '5. Exit');

    switch (opt) {
        case '1':
            name = prompt('Name: ');
            age = Number(prompt('Age: '));
            height = Number(prompt('Height in cm: '));
            national = prompt('National (1) Foreign(0): ');
            national = (national === '1') ? true : false;
            person = new Person(name, age, height, national);
            people.addPerson(person);
            break;

        case '2':
            name = prompt('Name: ');
            
            if (people.deletePerson(name)) {
                alert('Person deleted');
            } else {
                alert('Person not found');
            }
            
            break;

        case '3':
            console.log(people.toString());
            break;

        case '4':
            while (nationalFlag) {
                opt = prompt('1. Show candies by name\n' +
                '2. Show candies by age\n' +
                '3. Shoe candies by height\n' +
                '4. Back to main menu');

                switch (opt) {
                    case '1':
                        national = prompt('National (1) Foreign(0): ');
                        national = (national === '1') ? true : false;
                        console.log(people.candiesName(national));
                        break;

                    case '2':
                        national = prompt('National (1) Foreign(0): ');
                        national = (national === '1') ? true : false;
                        console.log(people.candiesAge(national));
                        break;

                    case '3':
                        national = prompt('National (1) Foreign(0): ');
                        national = (national === '1') ? true : false;
                        console.log(people.candiesHeight(national));
                        break;

                    case '4':
                        nationalFlag = false;
                        break;
                }
            }
            nationalFlag = true;
            break;

        case '5':
            flag = false;
            break;
    }
}