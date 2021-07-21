import Task from "./task.js";
import view from "./view.js";
import memory from "./memory.js";

(async function init() {
  await memory.loadDB();
  const tasks = await memory.retrieveTasks();
  console.log(tasks);
  view.render(tasks);
})();

// firebase
//   .firestore()
//   .collection("library")
//   .get()
//   .then((querySnapshot) => {
//     const documents = querySnapshot.docs.map((doc) => doc.data());
//     console.log(documents);
//   });

// let docRef = firebase.firestore().collection("library").doc("test2");

// docRef
//   .get()
//   .then((doc) => {
//     if (doc.exists) {
//       console.log("Document data:", doc.data());
//     } else {
//       // doc.data() will be undefined in this case
//       console.log("No such document!");
//     }
//   })
//   .catch((error) => {
//     console.log("Error getting document:", error);
//   });
