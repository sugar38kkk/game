let weight = {
    cart_left: 0,
    cart_right: 0
}
let item = null

function drag(event, p) {
    document.querySelectorAll(`.${p}`).forEach(el => {
        el.classList.add('drag')
    })
    let newData = {
        img: event.target.src,
        value: Number(event.target.alt)
    }
    item = {...newData}
}

function drop(event, p) {
    weight[p] += item.value
    let start_weight = weight[p]
    if (weight[p] / 1000 >= 1) {
        document.getElementById(p).innerHTML = ''
        const bags = Math.floor(Number(weight[p] / 1000))
        console.log('bags', bags)

        start_weight = weight[p] - (1000 * bags)
        for (let i = 0; i < bags; i++) {
            const img_bag = document.createElement('img')
            img_bag.src = 'images/bag.png'
            img_bag.className = 'bag'
            document.getElementById(p).appendChild(img_bag)
        }
        console.log('d', start_weight)
        if (start_weight / 400 >= 1) {
            const apples = Math.floor(Number(start_weight / 400))
            start_weight -= apples * 400
            for (let i = 0; i < apples; i++) {
                const img_bag = document.createElement('img')
                img_bag.src = 'images/apple.png'
                img_bag.className = 'apple'
                document.getElementById(p).appendChild(img_bag)
            }
        }
        console.log('s', start_weight)
        if (start_weight / 200 >= 1) {
            const half = Math.floor(Number(start_weight / 200))
            start_weight -= half * 200
            for (let i = 0; i < half; i++) {
                const img_half = document.createElement('img')
                img_half.src = 'images/half.png'
                img_half.className = 'apple'
                document.getElementById(p).appendChild(img_half)
            }
        }
        if (start_weight / 50 >= 1) {
            const slice = Math.floor(Number(start_weight / 50))
            start_weight -= slice * 50
            for (let i = 0; i < slice; i++) {
                const img_slice = document.createElement('img')
                img_slice.src = 'images/slice.png'
                img_slice.className = 'apple'
                document.getElementById(p).appendChild(img_slice)
            }
        }
        document.querySelectorAll('.graphic').forEach(el => {
            el.classList.remove('drag')
        })
    } else {
        const img = document.createElement('img')
        img.src = item.img
        img.className = 'apple'
        document.getElementById(p).appendChild(img)
        document.querySelectorAll('.graphic').forEach(el => {
            el.classList.remove('drag')
        })
    }

    const container = document.getElementById('main')
    const balance = document.getElementById('balance')

    document.getElementById('scrore_left').textContent = `Cân trái: ${weight.cart_left}g`
    document.getElementById('score_right').textContent = `Cân phải: ${weight.cart_right}g`
    console.log(weight)
    if (weight.cart_left > weight.cart_right) {
        container.className = 'container lonhon'
        balance.src = 'images/khongbang.png'
        return;
    }
    if (weight.cart_left < weight.cart_right) {
        container.className = 'container behon'
        balance.src = 'images/khongbang.png'
        return
    }
    if (weight.cart_left === weight.cart_right) {
        container.className = 'container'
        balance.src = 'images/bang.png'
        return;
    }
}

function allowDrop(event) {
    event.preventDefault()
}

document.getElementById('btn_refresh').addEventListener('click', (e) => {
    weight = {
        cart_left: 0,
        cart_right: 0
    }
    document.getElementById('cart_right').innerHTML = ''
    document.getElementById('cart_left').innerHTML = ''
    document.getElementById('scrore_left').textContent = `Cân trái: ${weight.cart_left}g`
    document.getElementById('score_right').textContent = `Cân phải: ${weight.cart_right}g`
    const container = document.getElementById('main')
    const balance = document.getElementById('balance')
    container.className = 'container'
    balance.src = 'images/bang.png'
})