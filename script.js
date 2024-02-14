const inputEl = document.querySelector("#password")
const upperCaseCheckEl = document.querySelector("#uppercase-check")
const numberCheckEl = document.querySelector("#number-check")
const simbolCheckEl = document.querySelector("#symbol-check")
const securityIndicatorBarEl = document.querySelector("#security-indicator-bar")
      let passwordLength = 16

      function generatePassword() {
        let chars =
          "abcdefghjkmnpqrstuvwxyz"

          const upperCaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ"
          const numberChars = "123456789"
          const symbolChars = "?!@&*()[]"

          if (upperCaseCheckEl.checked){
            chars += upperCaseChars
          }
          if (numberCheckEl.checked) {
            chars += numberChars
          }
          if (simbolCheckEl.checked) {
            chars += symbolChars
          }
                 

        let password = ""

        for (let i = 0; i < passwordLength; i++) {
          const randomNumber = Math.floor(Math.random() * chars.length)
          password += chars.substring(randomNumber, randomNumber + 1)
        }

        inputEl.value = password
        calculeteQuality()
        calculeteFontSize()
      }

      function calculeteQuality() {


        const percent = Math.round((passwordLength / 64 ) * 25 + 
        (upperCaseCheckEl.checked ? 15 : 0) + 
        (numberCheckEl.checked ? 25 : 0) +  
        (simbolCheckEl.checked ? 35 : 0))

        console.log()

        securityIndicatorBarEl.style.width = `${percent}%`

        if (percent > 69) {
          //safe
          securityIndicatorBarEl.classList.remove('critical')
          securityIndicatorBarEl.classList.remove('warning')
          securityIndicatorBarEl.classList.add('safe')
        }else if (percent > 50) {
          // warning
          securityIndicatorBarEl.classList.remove('critical')
          securityIndicatorBarEl.classList.add('warning')
          securityIndicatorBarEl.classList.remove('safe')
        }else {
          //critical
          securityIndicatorBarEl.classList.add('critical')
          securityIndicatorBarEl.classList.remove('warning')
          securityIndicatorBarEl.classList.remove('safe')
        }

        if (percent >= 100){
          securityIndicatorBarEl.classList.add("completed")
        }else {
          securityIndicatorBarEl.classList.remove("completed")
        }
      }

      function calculeteFontSize() {
        if (passwordLength > 45) {
          inputEl.classList.remove("font-sm")
          inputEl.classList.remove("font-xs")
          inputEl.classList.add("font-xxs")
        }else if (passwordLength > 32){
          inputEl.classList.remove("font-sm")
          inputEl.classList.add("font-xs")
          inputEl.classList.remove("font-xxs")
        }else if (passwordLength > 22){
          inputEl.classList.add("font-sm")
          inputEl.classList.remove("font-xs")
          inputEl.classList.remove("font-xxs")
        }else {
          inputEl.classList.remove("font-sm")
          inputEl.classList.remove("font-xs")
          inputEl.classList.remove("font-xxs")
        }
      }
      function copy() {
        navigator.clipboard.writeText(inputEl.value)
      }

      const passwordLengthEl = document.querySelector("#password-length")
      passwordLengthEl.addEventListener("input", function () {
        passwordLength = passwordLengthEl.value
        document.querySelector('#password-length-text').innerHTML = passwordLength
        generatePassword()
      })
      upperCaseCheckEl.addEventListener("change", generatePassword)
      numberCheckEl.addEventListener("change", generatePassword)
      simbolCheckEl.addEventListener("change", generatePassword)

      document.querySelector("#copy-1").addEventListener("click", copy)
      document.querySelector("#copy-2").addEventListener("click", copy)
      document.querySelector('#renew').addEventListener('click', generatePassword)
      
      generatePassword()