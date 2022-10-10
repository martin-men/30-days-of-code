export class Branch {
  constructor(name) {
    this.origin = null;
    this.tail = null;
    this.size = 0;
    this.name = name;
  }

  // Inserta commit al final
  push(newCommit) {
    if (this.origin == null) {
      this.origin = newCommit;
      this.tail = newCommit;
    } else {
      this.tail.next = newCommit;
      this.tail = newCommit;
    }
    this.size++;
  }

  // Elimina commit final y devuelve su contenido
  pop() {
    if (this.origin == null) {
      return null;
    } else {
      let currCommit = this.origin; // Commit actual
      let prevCommit = null; // Commit anterior
      let commitData; // Contenido del commit a eliminar

      while (currCommit.next != null) {
        prevCommit = currCommit;
        currCommit = currCommit.next;
      }

      commitData = currCommit.data;

      if (currCommit == this.origin) {
        this.origin = null;
        this.tail = null;
      } else {
        prevCommit.next = null;
        this.tail = prevCommit;
      }
      this.size--;

      return commitData;
    }
  }

  // Devuelve el tamaño de la rama
  getSize() {
    return this.size;
  }

  // Muestra la rama
  toString() {
    let currCommit = this.origin;
    let str = "";

    while (currCommit != null) {
      if (currCommit == this.tail) {
        str += currCommit.data;
      } else {
        str += currCommit.data + " -> ";
      }
      currCommit = currCommit.next;
    }

    return str;
  }
}
