// Seleção de elementos
const generatePasswordButton = document.querySelector("#generate-password")
const generatePasswordElement = document.querySelector("#generated-password")

// Novas funcionalidades
const openCloseGeneratorButton = document.querySelector("#open-generate-password")
const generatePasswordContainer = document.querySelector("#generate-options")
const lengthInput = document.querySelector("#length")
const lettersupperInput = document.querySelector("#lettersupper")
const letterslowerInput = document.querySelector("#letterslower")
const numbersInput = document.querySelector("#numbers")
const symbolsInput = document.querySelector("#symbols")
const copyPasswordButton = document.querySelector("#copy-password")

// Funções 
const getLetterLowerCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

const getLetterUpperCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

const getNumber = () => {
    return Math.floor(Math.random() * 10).toString()
}

const getSymbol = () => {
    const symbols = "(){}[]=!@.,/$%&"
    return symbols[Math.floor(Math.random() * symbols.length)]
}

const generatePassword = (getLetterLowerCase, getLetterUpperCase, getNumber, getSymbol) => {
    
    let password = "";

// Segunda versão
    const passwordLength = +lengthInput.value

    const generators = [];

    if(letterslowerInput.checked) {
        generators.push(getLetterLowerCase)
    }

    if(lettersupperInput.checked) {
        generators.push(getLetterUpperCase)
    }

    if(numbersInput.checked) {
        generators.push(getNumber)
    }
     
    if(symbolsInput.checked) {
        generators.push(getSymbol)
    }

    console.log(generators.length)
    
    if(generators.length === 0) {
        return
    }
    
    for(i = 0; i < passwordLength; i = i + generators.length) {
        generators.forEach(() => {

            const randomValue = generators[Math.floor(Math.random() * generators.length)]()

            password += randomValue
        })
    }
//Cortando a senha para ter apenas 10 caracteres:
    password = password.slice(0, passwordLength)

    generatePasswordElement.style.display = "block"
    generatePasswordElement.querySelector("h4").innerText = password
}


// Eventos
generatePasswordButton.addEventListener("click", () => {
    generatePassword(
        getLetterLowerCase,
        getLetterUpperCase,
        getNumber,
        getSymbol
    )
})

openCloseGeneratorButton.addEventListener("click", () => {
    generatePasswordContainer.classList.toggle("hide")
})

// copiando a senha
copyPasswordButton.addEventListener("click", (e) => {
    e.preventDefault()

    const password = generatePasswordElement.querySelector("h4").innerText

    navigator.clipboard.writeText(password).then(() => {
        copyPasswordButton.innerText = "Senha copiada com sucesso!"

        setTimeout(() => {
            copyPasswordButton.innerText = "Copiar"

        }, 1000)
    })
})