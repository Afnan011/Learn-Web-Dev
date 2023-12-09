// const URL = 'https://api.chucknorris.io/jokes/random'
const URL = 'https://node-crud-ex1.onrender.com/user'
const section = document.querySelector('section')
fetch(URL)
    .then((res) => res.json())
    .then((data) => {

        console.log(data);

        data.forEach(user => {
            setData(user)
            
        });
        

    })
    .catch((err) => console.log(err.message));



    const setData = async(user) => {
        const {rollNo, name, whichClass, id} = await user

        const div = document.createElement('div')
        div.setAttribute('class', 'box')

        const nameText = document.createElement('h3')
        const rollNoText = document.createElement('h3')
        const whichClassText = document.createElement('h3')
        
        rollNoText.innerText = rollNo
        nameText.innerText = name
        whichClassText.innerText = whichClass

        div.append(rollNoText)
        div.append(nameText)
        div.append(whichClassText)
        div.append(id)

        section.append(div)
    }