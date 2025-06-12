let Nombre = document.querySelector("#inputNombre");
let Edad = document.querySelector("#inputEdad");
let SintomaP = document.querySelector("#inputSintomaP");
let btnSend = document.querySelector("#btnSend");
let btnNext = document.querySelector("#btnNext");
let tableBody = document.querySelector("#tableBody");
let table = document.querySelector("#table");
let nada = document.querySelector("#nada");
let nombreTurno = document.querySelector("#nombreTurno");
let nameCurrent = document.querySelector("#nameCurrent");
let contentCurrent = document.querySelector("#contentCurrent");
let audio = document.querySelector("#audio");
let error = document.querySelector("#error");
let Next = document.querySelector("#Next");
let arrayPacientes = JSON.parse(localStorage.getItem("pacientes")) || [];

addEventListener("DOMContentLoaded", () => {
    arrayPacientes.forEach((item, index) => {
    tableBody.innerHTML += newNode.printQueue(item, index + 1);
  });
});
class Node {
  constructor(nombre, edad, sintomaP) {
    this.nombre = nombre;
    this.edad = edad;
    this.sintomaP = sintomaP;
    this.next = null;
  }
}

const decir = (texto) => {
  const voz = new SpeechSynthesisUtterance(texto);
  voz.lang = "es-ES"; // puedes cambiar a "en-US" u otros
  window.speechSynthesis.speak(voz);
};
//BTN SEND

btnSend.addEventListener("click", () => {
  Nombre.value == "" || Edad.value == "" || SintomaP.value == ""
    ? alert("Ingrese todos los campos")
    : newNode.enqueue(Nombre.value, Edad.value, SintomaP.value);
  Nombre.value = "";
  Edad.value = "";
  SintomaP.value = "";
});

btnNext.addEventListener("click", () => {
  Next.hidden = false;
  newNode.peek();
  newNode.dequeue();
});

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.length = 0;
  }

  peek() {
    arrayPacientes[1] == null
      ? (Next.hidden = true)
      : (nombreTurno.textContent = arrayPacientes[1].nombre);
  }
  enqueue(nombre, edad, sintomaP) {
    const newNode = new Node(nombre, edad, sintomaP);
    if (this.length === 0) {
      this.first = newNode;
      this.last = newNode;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }
    this.length++;
    arrayPacientes.push(this.last);
    localStorage.setItem("pacientes", JSON.stringify(arrayPacientes));
    tableBody.innerHTML += this.printQueue(
      arrayPacientes[this.length - 1],
      this.length
    );

    console.log(this);
    return this;
  }
  dequeue() {
    if (this.length <= 1) {
      this.isEmpty();
    }
    if (!this.last) {
      error.play();
      return null;
    }
    if (this.first === this.last) {
      this.last = null;
    }
    this.first = this.first.next;
    tableBody.innerHTML = "";
    nameCurrent.innerHTML = arrayPacientes[0].nombre;
    decir(`Turno de ${arrayPacientes[0].nombre}`);
    contentCurrent.innerHTML = `${arrayPacientes[0].edad} años - ${arrayPacientes[0].sintomaP}`;
    arrayPacientes.shift();
    localStorage.setItem("pacientes", JSON.stringify(arrayPacientes));
    arrayPacientes.forEach((item, index) => {
      tableBody.innerHTML += this.printQueue(item, index + 1);
    });

    this.length--;
    return this;
  }
  isEmpty() {
    table.hidden = true;
    nada.hidden = false;
    nameCurrent.innerHTML = "-----------";
    contentCurrent.innerHTML = "";
  }
  printQueue(e, i) {
    nada.hidden = true;
    table.hidden = false;
    const date = new Date();
    return `
      <tr style=" --bs-table-bg: #ffffff;">
          <th scope="row">${i}</th>
          <td>${e.nombre}</td>
          <td>${e.edad} años</td>
          <td>${e.sintomaP}</td>
          <td>${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()} </td>
      </tr>  
      `;
  }
}
const newNode = new Queue();
