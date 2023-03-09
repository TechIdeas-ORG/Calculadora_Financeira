var ranking = []; //Inicializar lista de lojas

function addAmbiente(element) {
    modal.style.display = 'flex';
    element.id = 'temp';
}

function addInfos() {
    const nomeAmbiente = inp_nomeAmbiente.value;
    const lucroAmbiente = $('#inp_lucroAmbiente').maskMoney('unmasked')[0];

    if (nomeAmbiente && lucroAmbiente > 0) {
        bt_simular.style.visibility = 'visible';
        temp.className = 'box-active';
        temp.innerHTML = `${nomeAmbiente}<br>${inp_lucroAmbiente.value}`;
        temp.dataset.nomeAmbiente = nomeAmbiente;
        temp.dataset.lucroAmbiente = lucroAmbiente;
        inp_lucroAmbiente.value = '';
        inp_nomeAmbiente.value = '';
        closeModal();
    }
}

function closeModal() {
    temp.removeAttribute('id');
    modal.style.display = 'none';
}

function startSimulation() {
    ranking = [];
    const box_containers = document.getElementsByClassName('container-box');
    const cores = [
        "#FF0000", // vermelho
        "#FFA500", // laranja
        "#008080", // turquesa
        "#1E90FF"  // azul royal
    ];

    for (const container of box_containers) {
        const boxs = container.children;

        for (let i = boxs.length - 1; i >= 0; i--) {
            const box = boxs[i];
            if (box.classList.contains('box-active')) {
                const lucroAmbiente = Number(box.dataset.lucroAmbiente);
                const nw_lucro = lucroAmbiente + (lucroAmbiente * (0.7 / (boxs.length - i)));
                box.innerHTML = `${box.dataset.nomeAmbiente}
                    <div>
                    <span>R$${nw_lucro.toFixed(2)}</span>
                    <span class="material-symbols-outlined">trending_up</span>
                    </div>
                    <div class="ball" style="background-color:${cores[boxs.length - i - 1]};"></div>
                `;
                ranking.push([box.dataset.nomeAmbiente, nw_lucro, (0.7 / (boxs.length - i)) /*Multiplicador */]);

            }
        }
    }
    addItemIntoRanking();
}

function addItemIntoRanking(){
    div_ranking.style.display = 'block';
    rankingList.innerHTML = '';
    ranking.sort((a,b) => {
        if (a[1] > b[1]) return -1;
        if (a[1] < b[1]) return 1;
        return 0;
    });

    for (let i in ranking){
        i = Number(i);
        let item = document.createElement('li');
        item.innerHTML = `Loja: ${ranking[i][0]} <br> <div><span style="color: black">Lucro: </span><span>R$${ranking[i][1].toFixed(2)}</span>
                            <span>${(ranking[i][2] * 100).toFixed(2)}%</span><span class="material-symbols-outlined">trending_up</span>
                            </div>
                        `;
                        
        rankingList.appendChild(item);
    }
}