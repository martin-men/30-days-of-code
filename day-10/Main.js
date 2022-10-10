import { GitSimulator } from "./GitSimulator.js";

let flag = true,
  gitCommand = "",
  gitSimulator = new GitSimulator();

while (flag) {
  gitCommand = prompt("Enter a GIT command or: \n" + "0 - Exit\n");
  if (gitCommand === "0") {
    flag = false;
  } else {
    console.log(gitSimulator.recognizeCommand(gitCommand));
  }
}
