export class Person {
  constructor(name, age, height, national) {
    this.name = name;
    this.age = age;
    this.height = height;
    this.national = national;
  }

  // Devuelve una cadena con la informacion 
  // de la persona.
  toString() {
    let str = "----------------------\n";
    str += "| Name: " + this.name + "\n";
    str += "| Age: " + this.age + "\n";
    str += "| Height: " + this.height + "\n";
    str += "| National: " + this.national + "\n";
    str += "----------------------\n";
    return str;
  }
}
