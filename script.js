// :hospital: Ejercicio Práctico: Sistema de Turnos para una Clínica
// :dardo: Objetivo
// Practicar el uso de la estructura de datos cola (queue) implementando un sistema de turnos para una clínica, con una pequeña interfaz web que permita interactuar con la cola como lo haría una empresa real en su monitor de turnos.
// :portapapeles: Parte 1: Lógica en JavaScript
// Crea una clase Queue que contenga:
// enqueue(paciente)
// dequeue()
// peek() → para ver al siguiente en turno
// isEmpty()
// printQueue() (puede retornar un array o string de los pacientes en espera)
// Cada paciente debe tener:
// Nombre
// Edad
// Síntoma principal
// :ordenador_de_sobremesa: Parte 2: Interfaz con HTML + JavaScript
// Crea una pequeña página que permita:
// Registrar paciente
// Formulario con campos: nombre, edad y síntoma.
// Botón para agregarlo a la cola.
// Atender paciente
// Botón que atienda (elimine de la cola) al paciente con más tiempo esperando.
// Muestra en pantalla quién fue atendido.
// Ver cola actual
// Lista visual de los pacientes en espera, en orden.
// Ver siguiente turno
// Mostrar en grande (como en un televisor) el nombre del paciente que será atendido a continuación.
// :bombilla: Recomendaciones para el diseño
// Usa HTML simple, sin frameworks ni librerías externas.
// Puedes usar Bootstrap 5 si quieres que lo practiquen.
// Muestra el "turno actual" como si fuera una pantalla de televisor:
// Bonus: Agrega sonido o una alerta visual cuando cambie el turno.

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
let arrayPacientes = [];

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
    decir(`Turno de ${arrayPacientes[0].nombre}`)
    contentCurrent.innerHTML = `${arrayPacientes[0].edad} años - ${arrayPacientes[0].sintomaP}`;
    arrayPacientes.shift();
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
