// import { elements } from "./elements";
import "./style.css";
// elements();
import sweet from "sweetalert2";
//MVC
 
 
class ContactModel {
  contacts;
 
  constructor() {
    this.contacts = ["start", 12312412, "stop", 1212412];
  }
 
  addContact(contact) {
    this.contacts.push(contact);
  }
 
  removeContact(index) {
    this.contacts.splice(index, 2);
  }
 
  getContact() {
    return this.contacts;
  }
}
 
class ContactView {
  contactList;
  handleDeleteContact;
  constructor() {
    this.contactList = document.querySelector(".contacts-list");
  }
 
  printContacts(contacts) {
    this.contactList.innerHTML = "";
    for (let i = 0; i < contacts.length; i += 2) {
      const li = document.createElement("li");
      li.textContent = contacts[i] + " | " + contacts[i + 1];
 
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.onclick = () => this.handleDeleteContact(i);
 
      const changeButton = document.createElement("button");
      changeButton.textContent = "Change";
      changeButton.addEventListener("click", () => {
        const inputName = document.createElement("input");
        inputName.setAttribute("placeholder", "name");
        inputName.style.marginRight = "10px";
        const inputNumber = document.createElement("input");
        inputNumber.setAttribute("placeholder", "number");
        li.textContent = "";
        const saveBtn = document.createElement("button");
        saveBtn.textContent = "Save";
        saveBtn.addEventListener("click", () => {
          li.textContent = inputName.value + " | " + inputNumber.value;
          saveBtn.remove();
          li.appendChild(changeButton);
          li.appendChild(deleteButton);
        });
        li.prepend(inputNumber);
        li.prepend(inputName);
        li.appendChild(saveBtn);
        // sweet
        //   .fire({
        //     title: "Enter new contact",
        //     html: `
        //             <input id="input1" class="swal2-input" type="text" placeholder="Enter name">
        //             <input id="input2" class="swal2-input" type="number" placeholder="Enter phone number">
        //         `,
        //     showCancelButton: true,
        //     confirmButtonText: "Submit",
        //     cancelButtonText: "Cancel",
        //     preConfirm: () => {
        //       const input1Value = document.getElementById("input1").value;
        //       const input2Value = document.getElementById("input2").value;
 
        //       return { input1: input1Value, input2: input2Value };
        //     },
        //   })
        //   .then((result) => {
        //     if (result.isConfirmed) {
        //       const { input1, input2 } = result.value;
        //       li.textContent = input1 + " | " + input2;
        //       li.appendChild(changeButton);
        //       li.appendChild(deleteButton);
        //     }
        //   });
      });
 
      li.appendChild(changeButton);
      li.appendChild(deleteButton);
      this.contactList.appendChild(li);
    }
    // contacts.forEach((contact) => {
    //   const li = document.createElement("li");
    //   li.textContent = contact;
 
    //   const deleteButton = document.createElement("button");
    //   deleteButton.textContent = "Delete";
 
    //   deleteButton.onclick = () => this.handleDeleteContact(index);
    //   li.appendChild(deleteButton);
    //   this.contactList.appendChild(li);
    // });
  }
 
  bindDeleteContact(handler) {
    this.handleDeleteContact = handler;
  }
}
 
class ContactsController {
  view;
  model;
 
  constructor(view, model) {
    this.view = view;
    this.model = model;
 
    this.view.bindDeleteContact(this.handleDeleteContact.bind(this));
 
    this.view.printContacts(this.model.getContact());
 
    document.querySelector(".form").addEventListener("submit", (event) => {
      event.preventDefault();
      const contactNameValue = event.target.children["new-contact-name"].value;
      const contactNumberValue =
        event.target.children["new-contact-phone"].value;
      console.log("contact value");
      this.model.addContact(contactNameValue);
      this.model.addContact(contactNumberValue);
      this.view.printContacts(this.model.getContact());
      event.target.children["new-contact"].value = "";
    });
  }
  handleDeleteContact(index) {
    this.model.removeContact(index);
    this.view.printContacts(this.model.getContact());
  }
}
 
document.addEventListener("DOMContentLoaded", () => {
  const model = new ContactModel();
  const view = new ContactView();
 
  new ContactsController(view, model);
});
 
const btn = document.createElement("button");
btn.style.backgroundColor = "black";
btn.style.position = "fixed";
btn.addEventListener("mouseover", () => {
  btn.style.top = `${Math.floor(
    Math.random() * (window.innerHeight - btn.offsetHeight)
  )}px`;
  btn.style.left = `${Math.floor(
    Math.random() * (window.innerWidth - btn.offsetWidth)
  )}px`;
});
document.querySelector("#app").append(btn);