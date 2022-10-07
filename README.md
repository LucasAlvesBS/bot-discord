# Sobre

Este projeto tem o intuito de criar um bot que popula mensagens do twitter de um determinado
perfil no discord.

# Bibliotecas

- "discord.js": "^14.5.0"
- "dotenv": "^16.0.3"
- "twitter-v2": "^1.1.0"

# Como rodar

Inicialmente, clone o repositório:

```bash
$ git clone https://github.com/LucasAlvesBS/bot-discord.git
```

Agora, é importante gerar as chaves do twitter (https://developer.twitter.com/en) e do
discord (https://discord.com/developers/applications) para serem adicionadas no arquivo ".env".

Para instalar as dependências necessárias, execute:

```bash
$ npm install
```

Em seguida, rode a aplicação na máquina local:

```bash
$ node index.js
```

Para rodar no docker, construa a imagem:

```bash
$ docker build -t <nome-do-app>:<tag> .
```

Ex.: docker build -t bot:1.0 .

Posteriormente, execute o comando:

```bash
$ docker run <nome-do-app>:<tag>
```

# Tecnologias

- Docker
- NodeJS

# Variáveis de Ambiente

Na raiz do projeto, consta um arquivo ".env.example", que exibe todas as variáveis de ambiente necessárias. Para rodar a aplicação, altere o nome do arquivo para ".env" e preencha as variáveis com os seus respectivos valores.

# Links

- [Docker](https://docs.docker.com/)
- [NodeJS](https://nodejs.org/en/docs/)
