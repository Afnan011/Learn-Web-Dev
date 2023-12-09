const red = document.querySelector('.red')
const orange = document.querySelector('.orange')
const green = document.querySelector('.green')
const blue = document.querySelector('.blue')
const brown = document.querySelector('.brown')

const resText = document.querySelector('h1 span')
const resContainer = document.querySelector('.res div')


const getBgColor = (selectedElement) => {
    return getComputedStyle(selectedElement).backgroundColor
}

const magicColorChanager = (element, color) => {
    return element.addEventListener('mouseenter', ()=>{
        resText.innerText = color
        resText.style.color = color
        resContainer.style.backgroundColor = color
    })
}

const colorList = [red, orange, green, blue, brown];

for (const color of colorList) {
    magicColorChanager(color, getBgColor(color)) 
}
