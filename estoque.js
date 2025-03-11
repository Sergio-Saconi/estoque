let estoque = [];
let caixa = 0;

function adicionarProduto() {
  const nome = document.getElementById('produto').value.trim();
  const quantidade = parseInt(document.getElementById('quantidade').value);
  const preco = parseFloat(document.getElementById('preco').value);

  if (nome && quantidade > 0 && preco > 0) {
    const produtoExistente = estoque.find(item => item.nome === nome);
    if (produtoExistente) {
      produtoExistente.quantidade += quantidade;
      produtoExistente.preco = preco; // Atualiza o preço caso necessário
    } else {
      estoque.push({ nome, quantidade, preco });
    }
    atualizarEstoque();
    alert(`Produto "${nome}" adicionado com sucesso!`);
  } else {
    alert('Preencha todos os campos corretamente com valores válidos!');
  }
  limparCampos();
}

function registrarVenda() {
  const nome = document.getElementById('produto').value.trim();
  const quantidade = parseInt(document.getElementById('quantidade').value);

  if (nome && quantidade > 0) {
    const produto = estoque.find(item => item.nome === nome);
    if (produto) {
      if (produto.quantidade >= quantidade) {
        produto.quantidade -= quantidade;
        const totalVenda = produto.preco * quantidade;
        caixa += totalVenda; // Atualiza o total do caixa
        atualizarEstoque();
        atualizarCaixa();
        alert(`Venda de ${quantidade} unidade(s) de "${nome}" realizada! Total: R$ ${totalVenda.toFixed(2)}`);
      } else {
        alert(`Estoque insuficiente para o produto "${nome}".`);
      }
    } else {
      alert(`Produto "${nome}" não encontrado!`);
    }
  } else {
    alert('Preencha os campos corretamente com valores válidos!');
  }
  limparCampos();
}

function atualizarEstoque() {
  const lista = document.getElementById('estoque-lista');
  lista.innerHTML = ''; // Limpa a lista antes de atualizar
  estoque.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.nome}: ${item.quantidade} unidade(s) - R$ ${item.preco.toFixed(2)}`;
    lista.appendChild(li);
  });
}

function atualizarCaixa() {
  const caixaTotal = document.getElementById('caixa-total');
  caixaTotal.textContent = caixa.toFixed(2);
}

function limparCampos() {
  document.getElementById('produto').value = '';
  document.getElementById('quantidade').value = '';
  document.getElementById('preco').value
}




/*let estoque = [];
let caixa = 0;

function adicionarProduto() {
  const nome = document.getElementById('produto').value;
  const quantidade = parseInt(document.getElementById('quantidade').value);
  const preco = parseFloat(document.getElementById('preco').value);

  if (nome && quantidade > 0 && preco > 0) {
    const produtoExistente = estoque.find(item => item.nome === nome);
    if (produtoExistente) {
      produtoExistente.quantidade += quantidade;
      produtoExistente.preco = preco; // Atualiza o preço caso seja diferente
    } else {
      estoque.push({ nome, quantidade, preco });
    }
    atualizarEstoque();
    alert(`Produto "${nome}" adicionado com sucesso!`);
  } else {
    alert('Preencha todos os campos corretamente!');
  }
  limparCampos();
}

function registrarVenda() {
  const nome = document.getElementById('produto').value;
  const quantidade = parseInt(document.getElementById('quantidade').value);

  if (nome && quantidade > 0) {
    const produto = estoque.find(item => item.nome === nome);
    if (produto) {
      if (produto.quantidade >= quantidade) {
        produto.quantidade -= quantidade;
        const totalVenda = produto.preco * quantidade;
        caixa += totalVenda;
        atualizarEstoque();
        atualizarCaixa();
        alert(`Venda de ${quantidade} unidade(s) de "${nome}" realizada! Total: R$ ${totalVenda.toFixed(2)}`);
      } else {
        alert('Estoque insuficiente!');
      }
    } else {
      alert('Produto não encontrado!');
    }
  } else {
    alert('Preencha todos os campos corretamente!');
  }
  limparCampos();
}

function atualizarEstoque() {
  const lista = document.getElementById('estoque-lista');
  lista.innerHTML = '';
  estoque.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.nome}: ${item.quantidade} unidade(s) - R$ ${item.preco.toFixed(2)}`;
    lista.appendChild(li);
  });
}

function atualizarCaixa() {
  document.getElementById('caixa-total').textContent = caixa.toFixed(2);
}

function limparCampos() {
  document.getElementById('produto').value = '';
  document.getElementById('quantidade').value = '';
  document.getElementById('preco').value = '';
}*/






/*let estoque = [];

function adicionarProduto() {
    const nome = document.getElementById("nomeProduto").value;
    const quantidade = parseInt(document.getElementById("quantidadeProduto").value);

    if (nome && quantidade > 0) {
        estoque.push({ nome, quantidade });
        console.log("Produto adicionado:", { nome, quantidade });
        console.log("Produto atualizado:", estoque);
        atualizarListaEstoque();
        limparFormulario();
    } else {
        exibirAlerta("Por favor, insira um nome e quantidade válidos.");
    }
}

function atualizarListaEstoque(filtro = "") {
    console.log("Atualizando lista...");
console.log("Produtos no estoque:", estoque);

    const listaEstoque = document.getElementById("listaEstoque");
    listaEstoque.innerHTML = ""; // Limpa a lista antes de recriar
    
    estoque
        .filter(produto => produto.nome.toLowerCase().includes(filtro.toLowerCase()))
        .forEach((produto, index) => {
            const li = document.createElement("li");
            li.textContent = `${produto.nome} - Quantidade: ${produto.quantidade}`;
            
            const botaoRemover = document.createElement("button");
            botaoRemover.textContent = "Remover";
            botaoRemover.onclick = () => removerProduto(index);
            
            li.appendChild(botaoRemover);
            listaEstoque.appendChild(li);
        });
        console.log("Atualizando lista...");
console.log("Produtos no estoque:", estoque);

}

function removerProduto(index) {
    estoque.splice(index, 1);
    atualizarListaEstoque();
}

function buscarProduto() {
    const filtro = document.getElementById("buscaProduto").value;
    atualizarListaEstoque(filtro);
}

function exibirAlerta(mensagem) {
    const alerta = document.getElementById("alerta");
    alerta.textContent = mensagem;
    alerta.style.color = "red";
    setTimeout(() => (alerta.textContent = ""), 3000);
}

function limparFormulario() {
    document.getElementById("nomeProduto").value = "";
    document.getElementById("quantidadeProduto").value = "";
}*/
