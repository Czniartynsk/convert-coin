const USD = 5.54
const EUR = 6.07
const GBP = 7.25

const form= document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.querySelector("#description")
const result = document.getElementById("result")

// Manipulando o input amount para receber somente números
amount.addEventListener("input", () => {
  const hasCharacterRegex = /\D+/g
  amount.value = amount.value.replace(hasCharacterRegex, "")
})

// Captando o evento de submit (enviar) do formulário
form.onsubmit = (event) => {
  event.preventDefault()

  switch (currency.value) {
    case "USD":
      convertCurrency(amount.value, USD, "US$")
      break
    case "EUR":
      convertCurrency(amount.value, EUR, "€")
      break
     case "GBP":
      convertCurrency(amount.value, GBP, "£")
      break 
  }
}

// Função para converter a moeda.
function convertCurrency(amount, price, symbol){
  console.log(amount, price, symbol)
  try {
    // Exibindo a cotação da moeda selecionada.
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`

    // Calcula o total.
    let total = amount * price

    // Verifica se o resultado não é um número
    if (isNaN(total)) {
      return alert("Por favor, digite o valor corretamente para converter.")
    }

    // Formata o valor total
    total = formatCurrencyBRL(total).replace("R$", "").trim()

    // Exibe o resultado total.
    result.textContent = `${total} Reais`

    // Aplica a classe que exibe o footer para mostrar o resultado.
    footer.classList.add("show-result")

  } catch (error) {    
    // Remove a classe do footer ocultande ele da tela.
    footer.classList.remove("show-result")

    console.log(error)
    alert("Não foi possível converter. Tente novamente mais tarde.")
  }

}

// Formata a moeda em Real Brasileiro.
function formatCurrencyBRL(value) {
  /* 
  Como o "value" não tem tipagem definida, ele não aparece a função for escrito value. 
  Então convert para Number(value) que ele entende que é um número e libera a função
  
  Dessa forma também funciona, mas o vsCode não ajuda com a sugestão da funcão
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  })
  */

  // Converte para número para utilizar o toLocaleString para formatar no padrão BRL (R$ 00,00).
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  })
}