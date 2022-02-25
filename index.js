// Instancias
const submitButton = document.getElementById("submit-button");
const quantityField = document.getElementById("quantity")
const flagField = document.getElementById("cardFlag");
const cpfField = document.getElementById("CPF");
const cvvField = document.getElementById("cardCVV");
const newsletterOption = document.getElementById("newsletter");


// Eventos
this.onload = () => {
  const price = document.getElementById("item-price").textContent;
  document.getElementById("total-price").value = price;
}

submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  this.validateFields();
});

quantityField.addEventListener("input", () => {
  if (quantityField.value <= 0) {
    quantityField.value = 1;
    return alert("A quantidade de produtos deve ser pelo menos 1");
  }

  if (quantityField.value > 99) {
    quantityField.value = 99;
    return alert("A quantidade máxima permitida é 99");
  }

  const totalPrice = this.calculateTotal(quantityField.value);
  document.getElementById("total-price").value = totalPrice.toLocaleString("pt-br", { style: "currency" , currency: "BRL"});
});

cpfField.addEventListener("keydown", (event) => {
  if(event.key === "Backspace") {
    return;
  }
  
  const regExpNumbers = /[0-9]/;
  if (!regExpNumbers.test(event.key)) {
    event.preventDefault();
  }

  if (cpfField.value.length === 3 || cpfField.value.length === 7 ) {
    cpfField.value = cpfField.value.toString() + ".";
  }

  if (cpfField.value.length === 11) {
    cpfField.value = cpfField.value.toString() + "-";
  }
});

cvvField.addEventListener("keydown", (event) => {
  if(event.key === "Backspace") {
    return;
  }
  
  const regExpNumbers = /[0-9]/;
  if (!regExpNumbers.test(event.key)) {
    event.preventDefault();
  }
});


//Funções
function validateFields() {
  this.validateName();
  this.validateEmail();
  this.validateCPF();
  this.validateCVV();
  this.validateCardFlag();
  this.validateCardShelfLife();
}

function validateName() {
  const fullName = document.getElementById("fullName").value;

  if (!fullName || !fullName.trim()) {
    document.getElementById("fullName").classList.add("invalid-field");
    return alert("Por favor, informe seu nome completo");
  }

  if (fullName.length < 3) {
    document.getElementById("fullName").classList.add("invalid-field");
    return alert("O nome deve ter pelo menos 3 caracteres");
  }

  document.getElementById("fullName").classList.remove("invalid-field");
}

function validateEmail() {
  const email = document.getElementById("email").value.toLowerCase();

  if (!email || !email.trim()) {
    document.getElementById("email").classList.add("invalid-field");
    return alert("Por favor, informe seu e-mail");
  }

  const regExpEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if(!regExpEmail.test(email)) {
    document.getElementById("email").classList.add("invalid-field");
    return alert("Padrão inválido para o e-mail. O e-mail deve ter o formato como o seguinte exemplo: email@exemplo.com");
  }

  document.getElementById("email").classList.remove("invalid-field");
}

function validateCPF() {
  const cpf = document.getElementById("CPF").value;

  if (!cpf || !cpf.trim()) {
    document.getElementById("CPF").classList.add("invalid-field");
    return alert("Por favor, informe seu CPF");
  }

  const regExpCPF = /[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}/

  if(!regExpCPF.test(cpf)) {
    document.getElementById("CPF").classList.add("invalid-field");
    return alert("Padrão inválido para o CPF. O CPF deve ter o formato como o seguinte exemplo: 000.000.000-00");
  }

  document.getElementById("CPF").classList.remove("invalid-field");
}

function validateCVV() {
  const cvv = document.getElementById("cardCVV").value;

  if (!cvv || !cvv.trim()) {
    document.getElementById("cardCVV").classList.add("invalid-field");
    return alert("Por favor, informe o CVV do seu cartão de crédito");
  }

  const regExpCVV = /[0-9]{3}/

  if(!regExpCVV.test(cvv)) {
    document.getElementById("cardCVV").classList.add("invalid-field");
    return alert("Padrão inválido para o CVV. O CVV deve conter 3 números como o seguinte exemplo: 000");
  }

  document.getElementById("cardCVV").classList.remove("invalid-field");
}

function validateCardFlag() {
  const cardFlag = document.getElementById("cardFlag").value;

  if(!cardFlag) {
    document.getElementById("cardFlag").classList.add("invalid-field");
    return alert("Por favor, selecione a bandeira do seu cartão de crédito");
  }

  document.getElementById("cardFlag").classList.remove("invalid-field");
}

function validateCardShelfLife() {
  const cardShelfLife = document.getElementById("cardShelfLife").value;

  if(!cardShelfLife) {
    document.getElementById("cardShelfLife").classList.add("invalid-field");
    return alert("Por favor, informe a data de validade do seu cartão de crédito");
  }

  document.getElementById("cardShelfLife").classList.remove("invalid-field");
}

function calculateTotal(quantity) {
  const price = document.getElementById("item-price").textContent;
  const stringPrice = price.split(" ")[1].replace(",", ".");
  const numberPrice = Number(stringPrice);

  const totalPrice = numberPrice * quantity;
  return totalPrice;
}