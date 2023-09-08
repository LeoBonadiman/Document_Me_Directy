/**
 * Módulo principal para o backend do jogo Roll the Dice.
 * Este módulo configura um servidor Express para lidar com solicitações relacionadas ao jogo de dados.
 *
 * @module roll_the_dice_back/index
 */

/**
 * @constant {Object} bodyParser - Middleware body-parser utilizado para analisar as solicitações.
 */
const bodyParser = require("body-parser");

/**
 * @constant {Object} express - O framework Express.js utilizado para configurar o servidor.
 */
const express = require("express");

/**
 * @constant {Object} app - Instância do servidor Express.
 */
const app = express();

/**
 * @constant {number} PORT - A porta em que o servidor estará ouvindo.
 * @default 3001
 */
const PORT = process.env.PORT || 3001;

/**
 * Configuração do middleware body-parser para analisar solicitações com tipo "application/json".
 */
app.use(
    bodyParser.urlencoded({
        extended: true,
        type: "application/json",
    })
);

/**
 * Middleware para configurar cabeçalhos de resposta permitindo o acesso de qualquer origem.
 */
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

/**
 * Rota para lançar um dado com um número específico de lados e retornar o resultado.
 *
 * @name GET /dado/:lados
 * @function
 * @memberof module:roll_the_dice_back/index
 * @param {Object} req - O objeto de solicitação HTTP.
 * @param {Object} res - O objeto de resposta HTTP.
 */
app.get("/dado/:lados", (req, res) => {
    try {
        let lados = req.params.lados;
        let ladosInt = Number(lados);

        if (Number.isNaN(ladosInt)) {
            res.status(404).send("Não foi enviado um número");
            return;
        }

        let rolar = Math.floor(Math.random() * ladosInt) + 1;

        let resultado = { resultado: rolar, lados: ladosInt };

        console.log(resultado);
        res.send(resultado);
    } catch (erro) {
        console.log("Ocorreu um erro:", erro);
        res.status(500).send("Ocorreu um erro");
    }
});

/**
 * Inicializa o servidor na porta especificada.
 *
 * @function
 * @memberof module:roll_the_dice_back/index
 * @param {number} PORT - A porta em que o servidor estará ouvindo.
 */
function startServer(PORT) {
    app.listen(PORT, () => {
        console.log("Servidor Roll the Dice Backend está rodando na porta: " + PORT);
    });
}

// Inicializa o servidor
startServer(PORT);
