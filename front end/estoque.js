
let estoque = [];
let caixa = 0;

// Carregar os dados salvos ao iniciar
window.onload = function() {
  const dadosSalvos = localStorage.getItem('estoqueCaixa');
  if (dadosSalvos) {
    const { estoqueSalvo, caixaSalvo } = JSON.parse(dadosSalvos);
    estoque = estoqueSalvo || [];
    caixa = caixaSalvo || 0;
    atualizarEstoque();
    atualizarCaixa();
  }
};

function salvarDados() {
  const dados = {
    estoqueSalvo: estoque,
    caixaSalvo: caixa
  };
  localStorage.setItem('estoqueCaixa', JSON.stringify(dados));
}
/*function adicionarProduto() {
  const nome = document.getElementById('produto').value.trim();
  const quantidade = parseInt(document.getElementById('quantidade').value);
  const preco = parseFloat(document.getElementById('preco').value);

  if (nome && quantidade > 0 && preco > 0) {
    fetch('http://localhost:3000/adicionar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, quantidade, preco })
    })
      .then(response => response.text())
      .then(data => alert(data))
      .catch(err => alert("Erro ao adicionar produto."));
  } else {
    alert('Preencha todos os campos corretamente com valores válidos!');
  }
}*/

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
    salvarDados();
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
        salvarDados();
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

/*function atualizarEstoque() {
  fetch('http://localhost:3000/estoque')
    .then(response => response.json())
    .then(data => {
      const lista = document.getElementById('estoque-lista');
      lista.innerHTML = '';
      data.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nome}: ${item.quantidade} unidade(s) - R$ ${item.preco.toFixed(2)}`;
        lista.appendChild(li);
      });
    })
    .catch(err => alert("Erro ao obter estoque."));
}*/

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
  document.getElementById('preco').value = '';
}

const sqlite3 = require('sqlite3').verbose();

// Conectar ao banco de dados
const db = new sqlite3.Database('./database.db');

// Criar tabelas
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      quantidade INTEGER NOT NULL,
      preco REAL NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS caixa (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      total REAL NOT NULL
    )
  `);

  // Inicializa o caixa com valor zero, se necessário
  db.run(`
    INSERT INTO caixa (total) SELECT 0 WHERE NOT EXISTS (SELECT * FROM caixa)
  `);
});

module.exports = db;

