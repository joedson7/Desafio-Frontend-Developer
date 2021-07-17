const urlApi = page =>
    `https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=${page}`;

async function getData(page) {
    const { products } = await (await fetch(urlApi(page))).json();
    return products;

}

function createProductPaginationApi() {
    let currentPage = 1

    return ({
        current: async() => {
            return await getData(currentPage)
        },
        next: async() => {
            currentPage++
            return await getData(currentPage)
        }
    })

}

function createLine() {
    return document.createElement("tr");
}

function createProductColumn(product) {
    const column = document.createElement("td");

    const imgProduct = document.createElement("img");
    imgProduct.setAttribute("src", `https:${ product.image}`);

    const nameProduct = document.createElement("h2");
    nameProduct.innerHTML = product.name

    const descriptionProduct = document.createElement("p");
    descriptionProduct.innerHTML = product.description

    const oldPriceProduct = document.createElement("span");
    oldPriceProduct.innerHTML = `de: R$${product.oldPrice},00`

    const priceProduct = document.createElement("h2");
    priceProduct.innerHTML = ` Por: R$${product.price},00`

    const installmentsProduct = document.createElement("div");
    installmentsProduct.innerHTML = `ou ${product.installments.count}x de: R$${product.installments.value}`

    const bayProduct = document.createElement("button");


    column.appendChild(imgProduct);
    column.appendChild(nameProduct);
    column.appendChild(descriptionProduct);
    column.appendChild(oldPriceProduct);
    column.appendChild(priceProduct);
    column.appendChild(installmentsProduct);

    bayProduct.classList.add("buttonx")
    bayProduct.innerHTML = "Comprar"

    column.appendChild(bayProduct);

    return column;

}


function insertProductInTable(tableRef, productsData) {
    const maxColumns = 2;
    let counter = 0

    for (let linha = 0; linha < 1; linha++) {
        const lineRef = createLine()

        for (let column = 0; column < maxColumns; column++) {
            const columnRef = createProductColumn(productsData[counter++])
            lineRef.appendChild(columnRef)
        }
        tableRef.appendChild(lineRef)
    }
}


function createButtonNextPageOfProducts() {
    const buttonNextProducts = document.createElement('button')
    buttonNextProducts.innerHTML = 'Next Products'

    return buttonNextProducts
}

async function run() {
    const productsData = await apiPaginationProducts.current();
    const tableRef = document.getElementById("products");
    tableRef.innerHTML = ''

    insertProductInTable(tableRef, productsData)
}
const apiPaginationProducts = createProductPaginationApi()
const bodyRef = document.querySelector('body')
const buttonNextProduct = createButtonNextPageOfProducts()

function reRenderTable() {
    apiPaginationProducts.next()
    run()
}
run()