# NetTriage - Assistente de Diagnóstico de Infraestrutura e CFTV 

> **Projeto - 5º Semestre** > Solução de Triagem Inteligente para Equipes de Campo.

---

## 📋 Sobre o Projeto e Objetivo de Negócio

O **NetTriage** é uma ferramenta de suporte operacional desenvolvida especificamente para otimizar o dia a dia das equipes técnicas de campo da **Actec**. O maior desafio enfrentado por novos técnicos em campo é o tempo gasto no isolamento de falhas e a diferenciação correta entre tecnologias (como CFTV IP vs. Analógico), o que muitas vezes gera escalonamentos desnecessários para a gerência.

A aplicação atua como um **Engenheiro de Redes Sênior Virtual**, padronizando o *troubleshooting* inicial. Ela garante que novos técnicos sigam um checklist lógico, seguro e focado em ações físicas antes de dar um chamado como "sem solução".

### Como Funciona:
1. **Entrada:** O técnico digita o sintoma visual ou alerta do equipamento (Ex: *"Câmera 04 sem imagem, LED do Switch PoE piscando em laranja"*).
2. **Processamento:** O back-end encapsula o relato em um *System Prompt* especialista altamente restritivo e consome a API do modelo via **OpenRouter**.
3. **Saída:** O sistema renderiza na tela um plano de ação previsível, dividido em Diagnóstico, Checklist Físico, Ferramentas Necessárias e Critério de Escalonamento.

---

## 🛠️ Tecnologias Utilizadas

* **Front-end:** HTML5, CSS3 (Interface Responsiva com variáveis nativas).
* **Back-end:** Node.js com Express.
* **Inteligência Artificial:** Integração com LLMs via API do [OpenRouter](https://openrouter.ai/).

---

## 🚀 Como Executar o Projeto Localmente

Siga os passos abaixo para clonar, configurar e rodar a aplicação na sua máquina.

### 1. Pré-requisitos
Certifique-se de ter instalado em sua máquina:
* [Node.js](https://nodejs.org/) (Versão 18 ou superior)
* Um gerenciador de pacotes (`npm` já vem com o Node)

### 2. Clonar o Repositório
bash
git clone [https://github.com/SEU-USUARIO/5-Semestre-Proj-LLM.git](https://github.com/SEU-USUARIO/5-Semestre-Proj-LLM.git)
cd 5-Semestre-Proj-LLM

### 3. Dependencias
npm i

### 4. .env
Crie um arquivo .env na raiz do projeto
Insira a key da API após OPENROUTER_API_KEY="insira a key aqui"

### 5. Rodando o projeto
npm run dev

### 6. Utilizando
Descreve um problema que um técnico de redes poderia encontrar em atendimento: "Todos os pcs do almoxarifado estão perdendo pacotes, porém os pcs do financeiro não"


