const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Rota: Adicionar produto
app.post('/adicionar', (req, res) => {
  const { nome, quantidade, preco } = req.body;
  db.run(
    `INSERT INTO produtos (nome, quantidade, preco) VALUES (?, ?, ?)`,
    [nome, quantidade, preco],
    function (err) {
      if (err) {
        res.status(500).send("Erro ao adicionar produto.");
      } else {
        res.send("Produto adicionado com sucesso!");
      }
    }
  );
});

// Rota: Registrar venda
app.post('/vender', (req, res) => {
  const { nome, quantidade } = req.body;

  db.get(
    `SELECT * FROM produtos WHERE nome = ?`,
    [nome],
    (err, produto) => {
      if (err || !produto) {
        res.status(404).send("Produto não encontrado.");
      } else if (produto.quantidade < quantidade) {
        res.status(400).send("Estoque insuficiente.");
      } else {
        // Atualiza a quantidade no estoque
        db.run(
          `UPDATE produtos SET quantidade = quantidade - ? WHERE nome = ?`,
          [quantidade, nome]
        );

        // Atualiza o total no caixa
        const totalVenda = produto.preco * quantidade;
        db.run(`UPDATE caixa SET total = total + ?`, [totalVenda]);

        res.send(`Venda realizada! Total: R$ ${totalVenda.toFixed(2)}`);
      }
    }
  );
});

// Rota: Exibir estoque
app.get('/estoque', (req, res) => {
  db.all(`SELECT * FROM produtos`, [], (err, rows) => {
    if (err) {
      res.status(500).send("Erro ao obter estoque.");
    } else {
      res.json(rows);
    }
  });
});

// Rota: Exibir caixa
app.get('/caixa', (req, res) => {
  db.get(`SELECT total FROM caixa`, [], (err, row) => {
    if (err) {
      res.status(500).send("Erro ao obter o total do caixa.");
    } else {
      res.json(row);
    }
  });
});

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
