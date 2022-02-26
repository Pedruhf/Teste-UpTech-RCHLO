// Definições
const ADD_INVALID_CLASS = 1;
const REMOVE_INVALID_CLASS = 0;


// Instancias
const quantityField = document.getElementById("quantity")
const cpfField = document.getElementById("CPF");
const cvvField = document.getElementById("cardCVV");


// Eventos
this.onload = () => {
  const price = document.getElementById("item-price").textContent;
  document.getElementById("total-price").value = price;
}

function handleSubmitForm(event) {
  event.preventDefault();
  if(!this.validateFields()) {
    return;
  }
  
  this.showInsertedData();
}

function handleTotalPrice(event) {
  if (event.target.value <= 0) {
    quantityField.value = 1;
    return alert("A quantidade de produtos deve ser pelo menos 1");
  }

  if (event.target.value > 99) {
    quantityField.value = 99;
    return alert("A quantidade máxima permitida é 99");
  }

  const totalPrice = this.calculateTotal();
  document.getElementById("total-price").value = totalPrice.toLocaleString("pt-br", { style: "currency" , currency: "BRL"});
};

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
  return this.validateName() &&
    this.validateEmail() &&
    this.validateCPF() &&
    this.validateCVV() &&
    this.validateCardFlag() &&
    this.validateCardShelfLife();
}

function validateName() {
  const fullName = document.getElementById("fullName").value;

  if (!fullName || !fullName.trim()) {
    this.handleClassOfInvalidInputs("fullName", ADD_INVALID_CLASS);
    alert("Por favor, informe seu nome completo");
    return false;
  }

  if (fullName.length < 3) {
    this.handleClassOfInvalidInputs("fullName", ADD_INVALID_CLASS);
    alert("O nome deve ter pelo menos 3 caracteres");
    return false;
  }

  this.handleClassOfInvalidInputs("fullName", REMOVE_INVALID_CLASS);
  return true;
}

function validateEmail() {
  const email = document.getElementById("email").value.toLowerCase();

  if (!email || !email.trim()) {
    this.handleClassOfInvalidInputs("email", ADD_INVALID_CLASS);
    alert("Por favor, informe seu e-mail");
    return false;
  }

  const regExpEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if(!regExpEmail.test(email)) {
    this.handleClassOfInvalidInputs("email", ADD_INVALID_CLASS);
    alert("Padrão inválido para o e-mail. O e-mail deve ter o formato como o seguinte exemplo: email@exemplo.com");
    return false;
  }

  this.handleClassOfInvalidInputs("email", REMOVE_INVALID_CLASS);
  return true;
}

function validateCPF() {
  const cpf = document.getElementById("CPF").value;

  if (!cpf || !cpf.trim()) {
    this.handleClassOfInvalidInputs("CPF", ADD_INVALID_CLASS);
    alert("Por favor, informe seu CPF");
    return false;
  }

  const regExpCPF = /[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}/

  if(!regExpCPF.test(cpf)) {
    this.handleClassOfInvalidInputs("CPF", ADD_INVALID_CLASS);
    alert("Padrão inválido para o CPF. O CPF deve ter o formato como o seguinte exemplo: 000.000.000-00");
    return false;
  }

  this.handleClassOfInvalidInputs("CPF", REMOVE_INVALID_CLASS);
  return true;
}

function validateCVV() {
  const cvv = document.getElementById("cardCVV").value;

  if (!cvv || !cvv.trim()) {
    this.handleClassOfInvalidInputs("cardCVV", ADD_INVALID_CLASS);
    alert("Por favor, informe o CVV do seu cartão de crédito");
    return false;
  }

  const regExpCVV = /[0-9]{3}/

  if(!regExpCVV.test(cvv)) {
    this.handleClassOfInvalidInputs("cardCVV", ADD_INVALID_CLASS);
    alert("Padrão inválido para o CVV. O CVV deve conter 3 números como o seguinte exemplo: 000");
    return false;
  }

  this.handleClassOfInvalidInputs("cardCVV", REMOVE_INVALID_CLASS);
  return true;
}

function validateCardFlag() {
  const cardFlag = document.getElementById("cardFlag").value;

  if(!cardFlag) {
    this.handleClassOfInvalidInputs("cardFlag", ADD_INVALID_CLASS);
    alert("Por favor, selecione a bandeira do seu cartão de crédito");
    return false;
  }

  this.handleClassOfInvalidInputs("cardFlag", REMOVE_INVALID_CLASS);
  return true;
}

function validateCardShelfLife() {
  const cardShelfLife = document.getElementById("cardShelfLife").value;

  if(!cardShelfLife) {
    this.handleClassOfInvalidInputs("cardShelfLife", ADD_INVALID_CLASS);
    alert("Por favor, informe a data de validade do seu cartão de crédito");
    return false;
  }

  this.handleClassOfInvalidInputs("cardShelfLife", REMOVE_INVALID_CLASS);
  return true;
}

function calculateTotal() {
  const quantity = quantityField.value;
  const price = document.getElementById("item-price").textContent;
  const stringPrice = price.split(" ")[1].replace(",", ".");
  const numberPrice = Number(stringPrice);

  const totalPrice = numberPrice * quantity;
  return totalPrice;
}

function calculateCardShelfLife() {
  const cardShelLife = document.getElementById("cardShelfLife").value;
  const date = new Date(cardShelLife);
  const formattedDate = `${date.getUTCMonth() + 1}`.padStart(2, "0") + `/${date.getUTCFullYear()}`
  return formattedDate;
}

function handleClassOfInvalidInputs(inputId, option) {
  option === 1
    ? document.getElementById(inputId).classList.add("invalid-field")
    : document.getElementById(inputId).classList.remove("invalid-field");
}

function getFlagName(flagParam) {
  const options = {
    mastercard: "Mastercard",
    visa: "Visa",
    americanExpress: "American Express"
  }

  return options[flagParam];
}

function showInsertedData() {
  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const cpf = document.getElementById("CPF").value;
  const newsletterOption = document.getElementById("newsletter").checked;
  const cvv = document.getElementById("cardCVV").value;
  const cardFlag = this.getFlagName(document.getElementById("cardFlag").value);
  const cardShelfLife = this.calculateCardShelfLife();
  const total = this.calculateTotal().toLocaleString("pt-br", { style: "currency" , currency: "BRL"});


  alert(
    `
      Confirme seus dados

      Nome: ${fullName}
      E-mail: ${email}
      CPF: ${cpf}
      CVV: ${cvv}
      Bandeira do cartão de crédito: ${cardFlag}
      Validate do cartão de crédito: ${cardShelfLife}

      ${newsletterOption ? "Aceita receber a newsletter da RCHLO" : "Não quer receber a newsletter da RCHLO"}

      Total: ${total}
    `
  );
}