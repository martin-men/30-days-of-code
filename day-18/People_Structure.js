export class People_Structure {
    constructor() {
        this.people = [];
    }
    
    // Agrega una persona al final del arreglo
    addPerson(person) {
        this.people.push(person);
    }

    // Remueve una persona por su nombre
    deletePerson(name) {
        for (let i = 0; i < this.people.length; i++) {
            if (this.people[i].name.toLowerCase() === name.toLowerCase()) {
                this.people.splice(i, 1);       
                return true;
            }
        }
        return false;
    }
    
    // Establece el numero de caramelos segun la cantidad de letras
    // del nombre de la persona. Devuelve una cadena con grafico de
    // cada persona (nacionales o extranjeros).
    candiesName(national) {
        let str = '';
        
        if (national) {
            for (let i = 0; i < this.people.length; i++) {
                if (this.people[i].national) {
                    str += ` ${this.people[i].name}\n` + 
                    this.drawSkull(this.people[i].name.length, true) + '\n';
                }
            }
        } else {
            for (let i = 0; i < this.people.length; i++) {
                if (!this.people[i].national) {
                    str += ` ${this.people[i].name}\n` + 
                    this.drawSkull(this.people[i].name.length, false) + '\n';
                }
            }
        }

        return str;
    }

    // Establece el numero de caramelos segun la edad de la persona.
    // Devuelve una cadena con grafico de cada persona (nacionales o 
    // extranjeros).
    candiesAge(national) {
        let str = '';
        
        if (national) {
            for (let i = 0; i < this.people.length; i++) {
                if (this.people[i].national) {
                    str += ` ${this.people[i].age} years old\n` + 
                    this.drawSkull(Math.floor(this.people[i].age / 4), true) + '\n';
                }
            }
        } else {
            for (let i = 0; i < this.people.length; i++) {
                if (!this.people[i].national) {
                    str += ` ${this.people[i].age} years old\n` + 
                    this.drawSkull(Math.floor(this.people[i].age / 4), false) + '\n';
                }
            }
        }

        return str;
    }

    // Establece el numero de caramelos segun la altura de la persona.
    // Devuelve una cadena con grafico de cada persona (nacionales o 
    // extranjeros).
    candiesHeight(national) {
        let str = '';
        
        if (national) {
            for (let i = 0; i < this.people.length; i++) {
                if (this.people[i].national) {
                    str += ` ${this.people[i].height} cm\n` + 
                    this.drawSkull(Math.floor(this.people[i].height / 30), true) + '\n';
                }
            }
        } else {
            for (let i = 0; i < this.people.length; i++) {
                if (!this.people[i].national) {
                    str += ` ${this.people[i].height} cm\n` + 
                    this.drawSkull(Math.floor(this.people[i].height / 30), false) + '\n';
                }
            }
        }

        return str;
    }

    // Dibuja un craneo con el numero de caramelos o coladas moradas 
    // especificado en una espada.
    drawSkull(numCandies, national) {
        let str = '                      ______\n' + 
        '                   .-"      "-.\n' +
        '                  /            \\ \n' +
        '                 |              |\n' +
        '                 |,  .-.  .-.  ,|\n' + 
        '                 | )(_o/  \\o_)( |\n' + 
        '                 |/     /\\     \\|\n' +
        '       (@_       (_     ^^     _)\n' + 
        '  ______) \\_______\\__|IIIIII|__/_______';

        for (let i = 0; i < numCandies; i++) {
            str += '_';
        }

        str += '\n' + 
        '|  ||||||||||||||                     ';

        for (let i = 0; i < numCandies; i++) {
            str += ' ';
        }

        str += ' \\ \n' + 
        '|  ||||||||||||||              ';

        for (let i = 0; i < numCandies; i++) {
            if (national) {
                str += '🍷';
            } else { 
                str += '🍬';
            }
        }
        
        str += '\n' +
        '|_______   ________|-\\IIIIII/-|________';

        for (let i = 0; i < numCandies; i++) {
            str += '_';
        }

        str += '/\n' +
        '        )_/        \\          /\n' + 
        '        (@          `--------`\n';

        return str;
    }
    
    // Devuelve una cadena con la informacion de todas las 
    // personas en el arreglo.
    toString() {
        let str = "";
        
        for (let i = 0; i < this.people.length; i++) {
            str += this.people[i].toString();
        }
        
        return str;
    }
}