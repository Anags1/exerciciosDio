class Despesa {

    constructor(ano, mes, dia, tipo, descricao, valor) {

        this.ano = ano,
        this.mes = mes,
        this.dia = dia,
        this.tipo = tipo,
        this.descricao = descricao,
        this.valor = valor
    }

    validarDados() {

        for (let i in this) {
            if (this[i] == undefined || this[i] == '' || this[i] == null) {
                return false;
            }
        }
        return true;
    }
};

class Bd {

    constructor() {

        let id = localStorage.getItem('id');

        if (id == null){
            localStorage.setItem('id', 0);
        }
    }

    getProximoId() {

        let proximoId = localStorage.getItem('id');
		return parseInt(proximoId) + 1;
    }

    gravar(despesa) {

        let id = this.getProximoId();
        let despesas = []; 
        
        if (localStorage.getItem('despesas') != null) {
            despesas = JSON.parse(localStorage.getItem('despesas'));
        }

        console.log(despesas);
        despesas[id] = despesa;

        localStorage.setItem('despesas', JSON.stringify(despesas));

		localStorage.setItem('id', id)
	}

    recuperarTodosRegistros() {
        //array de despesas
		let despesasString = localStorage.getItem('despesas');

		let despesas = JSON.parse(despesasString);

		return despesas;
    }

    pesquisar(despesa) {
            
        let despesasFiltradas = [];

        despesasFiltradas = this.recuperarTodosRegistros();

        console.log(despesasFiltradas);
        console.log(despesa);
            
        if(despesa.ano != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }

        if(despesa.mes != '') {
             despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
        }
        if(despesa.dia != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }

        if(despesa.tipo != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }

        if(despesa.descricao != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }
        if(despesa.valor != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
        }
        return despesasFiltradas;
    };

    remover(id) {
        localStorage.removeItem(id)
    };

};

let bd = new Bd();

function cadastrarDespesa() {

    let ano = document.getElementById('ano');
    let mes = document.getElementById('mes');
    let dia = document.getElementById('dia');
    let tipo = document.getElementById('tipo');
    let descricao = document.getElementById('descricao');
    let valor = document.getElementById('valor');

    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value, 
        tipo.value, 
        descricao.value, 
        valor.value
    );
    
    console.log(despesa);

    if (despesa.validarDados()) {
        bd.gravar(despesa);
        document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso';
        document.getElementById('modal_titulo_div').className = 'modal-header text-success';
        document.getElementById('modal_conteudo').innerHTML = 'Despesa foi cadastrada com sucesso';
        document.getElementById('modal_btn').innerHTML = 'Voltar';
        document.getElementById('modal_btn').classHame = 'btn btn-success';
        //dialog de sucesso
        $('#modalRegistraDespesa').modal('show');

        ano.value = '';
        mes.value = '';
        dia.value = '';
        tipo.value= '';
        descricao.value = '';
        valor.value = '';
    } else {
        document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro';
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger';
        document.getElementById('modal_conteudo').innerHTML = 'Erro na gravação, verifique se todos os campos foram preenchidos corretamente';
        document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir';
        document.getElementById('modal_btn').classHame = 'btn btn-danger';
        //dialog de erro
        $('#modalRegistraDespesa').modal('show');
    }
};

function carregaListaDespesas(despesas = Array(), filtro = false) {

    if(despesas.length == 0 && filtro == false) {
         despesas = bd.recuperarTodosRegistros() 
    }
    //selecionando o tbody de consulta
    let listaDespesas = document.getElementById('listaDespesas');
    listaDespesas.innerHTML = '';
 
    for (let i in despesas) {
        let linha = listaDespesas.insertRow();

        //para criar as colunas no Consulta
        linha.insertCell(0).innerHTML = `${despesas[i].dia}/${despesas[i].mes}/${despesas[i].ano}`;

         //ajustar o tipo
        switch(despesas[i].tipo) {
            case '1': despesas[i].tipo = 'Alimentação'
                break
            case '2': despesas[i].tipo = 'Educação'
                break
            case '3': despesas[i].tipo = 'Lazer'
                break
            case '4': despesas[i].tipo = 'Saúde'
                break
            case '5': despesas[i].tipo = 'Transporte'
                break
        };

        linha.insertCell(1).innerHTML = despesas[i].tipo;
        linha.insertCell(2).innerHTML = despesas[i].descricao;
        linha.insertCell(3).innerHTML = despesas[i].valor;

        //botão de exclusão
        let btn = document.createElement('button');
        btn.className = 'btn btn-danger';
        btn.innerHTML = '<i class="fas fa-times"></i>';
        btn.id = `id_despesa_${despesas[i].id}`;
        
        btn.onclick = function() {
            //remover a despesas[i]
            let id = this.id.replace('id_despesa_', '');

            bd.remover(id);
            location.reload();
        }

        linha.insertCell(4).append(btn);
        console.log(despesas[i]);
    }
};

function pesquisarDespesa() {
    
    let ano = document.getElementById('ano').value;
    let mes = document.getElementById('mes').value;
    let dia = document.getElementById('dia').value;
    let tipo = document.getElementById('tipo').value;
    let descricao = document.getElementById('descricao').value;
    let valor = document.getElementById('valor').value;

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor);
    
    let despesas = bd.pesquisar(despesa);

    this.carregaListaDespesas(despesas, true);
};
