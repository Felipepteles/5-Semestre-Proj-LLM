# 5-Semestre-Proj-LLM

# NetTriage - Assistente de Diagnóstico de Infraestrutura e CFTV 🛠️

## Proposta de Uso e Objetivo
O **NetTriage** é uma ferramenta de suporte à operação desenvolvida para otimizar o dia a dia de equipes técnicas de campo (como as da Actec). Ele atua como um engenheiro especialista virtual, auxiliando no diagnóstico rápido de problemas físicos de redes, falhas de conectividade, configuração de switches e perda de sinal em sistemas de CFTV. 

A aplicação visa padronizar o *troubleshooting* inicial, reduzindo o tempo de inatividade dos equipamentos e garantindo que os técnicos sigam um checklist lógico de resolução antes de escalonar o problema.

O projeto atende integralmente à estrutura solicitada:

*   **Entrada:** O técnico de campo informa no front-end o sintoma visual ou alerta apresentado pelo equipamento (Ex: *"Câmera IP 04 sem imagem, LED da porta do switch PoE piscando em laranja"*).
*   **Processamento:** O back-end (Node.js + Express) recebe a entrada e envia um prompt estruturado via API. O system prompt instrui o modelo a atuar como um engenheiro de redes sênior, processando o sintoma relatado.
*   **Saída:** O sistema retorna uma resposta útil para o usuário: um checklist de diagnóstico em passos curtos e objetivos, contendo os testes físicos e comandos necessários para isolar a falha.
