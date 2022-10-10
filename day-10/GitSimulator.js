import { Commit } from "./Commit.js";
import { Branch } from "./Branch.js";

export class GitSimulator {
  constructor() {
    // Arreglo de ramas
    this.branches = new Array(1);
    // Se crea la rama main
    this.branches[0] = new Branch("main");
    this.currentBranch = this.branches[0];
    this.currentCommit;
  }

  // Crea una nueva rama
  gitBranch(branchName) {
    // Verifica si la rama ya existe
    if (!this.verifyBranchExistence(branchName)) {
      let newBranch = new Branch(branchName);
      // Copia los commits de la rama actual a la nueva rama
      let auxBranch = this.copyBranch(this.currentBranch, newBranch);
      this.currentBranch = auxBranch;
      // Agrega la nueva rama al arreglo de ramas
      this.branches.push(this.currentBranch);

      return true;
    } else {
      return false;
    }
  }

  // Cambia de rama
  gitCheckout(branchName) {
    // Verifica si la rama existe
    let existence = this.verifyBranchExistence(branchName);

    if (existence) {
      // Se obtiene la rama
      this.currentBranch = this.branches.find((branch) => {
        return branch.name === branchName;
      });
      this.currentCommit = this.currentBranch.tail;

      return true;
    } else {
      return false;
    }
  }

  // Crea un nuevo commit en la rama actual
  gitCommit(message) {
    this.currentCommit = new Commit(message, this.currentBranch.name);
    this.currentBranch.push(this.currentCommit);
  }

  // Revierte el último commit de la rama actual
  gitRevert() {
    let data = this.currentBranch.pop();

    if (data != null) {
      this.currentCommit = this.currentBranch.tail;
      return data;
    } else {
      return false;
    }
  }

  // Muestra la información del commit actual
  gitStatus() {
    if (this.currentCommit != null) {
      return (
        "Current commit: " +
        this.currentCommit.data +
        "\n" +
        "On branch:" +
        this.currentBranch.name
      );
    } else {
      return "No commits on branch " + this.currentBranch.name;
    }
  }

  // Muestras los commits de todas las ramas
  gitLog() {
    let str = "";

    this.branches.forEach((branch) => {
      str += branch.toString() + ": " + branch.name.toUpperCase() + "\n";
    });

    return str;
  }

  // Copia los commits de una rama a otra
  copyBranch(originBranch, targetBranch) {
    let auxCommit = originBranch.origin;
    let copyCommit;

    while (auxCommit != null) {
      copyCommit = new Commit(auxCommit.data, targetBranch.name);
      targetBranch.push(copyCommit);
      auxCommit = auxCommit.next;
    }

    return targetBranch;
  }

  // Verifica si la rama existe
  verifyBranchExistence(branchName) {
    let branch = this.branches.find((branch) => {
      return branch.name === branchName;
    });
    return branch != undefined;
  }

  // Reconoce el comando ingresado y retorna un mensaje
  recognizeCommand(command) {
    let commandArray = command.split(" ");
    let str = "";

    if (commandArray[0] === "git") {
      if (commandArray[1] === "commit") {
        commandArray.shift();
        commandArray.shift();
        this.gitCommit(commandArray.join(" "));
        str = "[" + this.currentCommit.branch + "] " + this.currentCommit.data;
      } else if (commandArray[1] === "branch") {
        commandArray.shift();
        commandArray.shift();

        str = commandArray.join(" ");

        if (this.gitBranch(str)) {
          str =
            "Branch " +
            str +
            " created \n" +
            "Current branch: " +
            this.currentBranch.name;
        } else {
          str = "Branch " + str + " already exists";
        }
      } else if (commandArray[1] === "checkout") {
        commandArray.shift();
        commandArray.shift();

        str = commandArray.join(" ");

        if (this.gitCheckout(str)) {
          str = "Current branch: " + this.currentBranch.name;
        } else {
          str = "Branch " + str + " does not exist";
        }
      } else if (commandArray[1] === "status") {
        str = this.gitStatus();
      } else if (commandArray[1] === "revert") {
        str = this.gitRevert();

        if (Boolean(str)) {
          str =
            "[" + this.currentBranch.name + "] " + "Revert " + '"' + str + '"';
        } else {
          str = "No commits to revert on branch " + this.currentBranch.name;
        }
      } else if (commandArray[1] === "log") {
        str = this.gitLog();
      } else {
        str = "Command not found";
      }
    } else {
      str = "Command not found";
    }

    return (
      str +
      "\n\nBranch " +
      this.currentBranch.name +
      " status:\n" +
      this.currentBranch.toString() +
      "\n\n"
    );
  }
}
