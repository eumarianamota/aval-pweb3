const mobileMenu = document.getElementById("mobile-menu")
const navList = document.getElementById("nav-list")
const activeClass = "active"


const handleClick = () => {
    navList.classList.toggle(activeClass)
    mobileMenu.classList.toggle(activeClass)
}

mobileMenu.addEventListener("click", handleClick) 

const buttons = document.querySelectorAll(".btn-redirect-page")

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const textButton = button.textContent.trim()
        let url = ""

        switch (textButton) {
            case 'Explorar América':
                url = '/html/america.html'
                break
            case 'Explorar África': 
                url = '/html/africa.html'
                break
            case 'Explorar Antártida':
                url = '/html/antartida.html'
                break
            case 'Explorar Ásia':
                url = '/html/asia.html'
                break
            case 'Explorar Europa':
                url = '/html/europa.html'
                break
            case 'Explorar Oceania': 
                url = '/html/oceania.html'
                break
        }

        console.log('Valor final da variável url:', url)

        if(url) {
            console.log('Deu certo')
            window.location.href = url
        }
    })
})