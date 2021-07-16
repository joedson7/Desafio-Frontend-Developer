function fazGet(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}

function criaColuna(usuario) {
    div = document.createElement("div");
    coluna = document.createElement("td");
    tdImage = document.createElement("td");
    tdNome = document.createElement("h2");
    imageuser = document.createElement("img");
    imageuser.setAttribute("src", `https:${ usuario.image}`);
    tdDescription = document.createElement("p");
    tdOldPrice = document.createElement("span");
    tdPrice = document.createElement("h2");
    tdInstallments = document.createElement("span");
    tdNome.innerHTML = usuario.name
    tdOldPrice.innerHTML = `de: R$${usuario.oldPrice},00`
    tdPrice.innerHTML = ` Por: R$${usuario.price},00`
    tdDescription.innerHTML = usuario.description
    tdInstallments.innerHTML = `ou ${usuario.installments.count}x de: R$${usuario.installments.value}`
    div.appendChild(tdImage);
    div.appendChild(tdNome);
    tdImage.appendChild(imageuser);
    div.appendChild(tdDescription);
    div.appendChild(tdOldPrice);
    div.appendChild(tdPrice);
    div.appendChild(tdInstallments);
    coluna.appendChild(div);



    return coluna;
}

function main() {
    let data = fazGet("https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1");
    let usuarios = JSON.parse(data);
    let tabela = document.getElementById("tabela");


    usuarios.products.forEach(element => {
        let linha = criaColuna(element);

        tabela.appendChild(linha);

    });

}

main()