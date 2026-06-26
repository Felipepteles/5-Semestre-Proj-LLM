import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = 3000;

const API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = "openai/gpt-oss-120b:free";

if (!API_KEY) {
    console.error("Erro: configure OPENROUTER_API_KEY no arquivo .env.");
    process.exit(1);
}

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/api/status", (req, res) => {
    res.json({ status: "API local funcionando", model: MODEL });
});

app.post("/api/llm", async (req, res) => {
    try {
        const prompt = req.body.prompt;

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:3000",
                "X-OpenRouter-Title": "NetTriage"
            },
            body: JSON.stringify({
                model: MODEL,
                messages: [
                    {
                        role: "system",
                        content: `Você é o Engenheiro Sênior de Infraestrutura e Redes. Sua função é receber relatos de técnicos de campo sobre falhas em CFTV (IP e Analógico), cabeamento estruturado, switches e roteadores, e devolver um plano de triagem absoluto, previsível e focado em ações físicas/manuais.

DIRETRIZES TÉCNICAS CRICITAIS QUE VOCÊ DEVE SEGUIR:

1. CLASSIFICAÇÃO RÍGIDA DE CFTV:
   - Se houver menção a: Balun, DVR, Coaxial, BNC -> Trate unicamente como CFTV Analógico.
   - Se houver menção a: Switch PoE, NVR, RJ45, IP, Ping -> Trate unicamente como CFTV IP.
   - PROIBIDO misturar terminologias ou conceitos de ambas as tecnologias no mesmo plano.
2. ESCOPO EXCLUSIVAMENTE FÍSICO: Foque apenas em ações manuais (multímetro, crimpagem, patch cords, LEDs de link, continuidade). PROIBIDO sugerir acessos lógicos remotos, configurações de software ou comandos complexos.
3. FIDELIDADE RESTRITA AO RELATO: Baseie-se apenas nos ativos citados. Se o relato cita apenas "câmera e switch", não mencione NVRs, roteadores ou patch panels. PROIBIDO alucinar ou deduzir hardwares ausentes no texto.
4. PARASITISMO DE SAÍDA: Não adicione saudações, introduções, conclusões ou notas explicativas. Se a estrutura for violada, a saída será considerada inválida.

1. DIFERENCIAÇÃO DE CFTV:
   - Se o relato citar Balun, DVR, cabo coaxial ou conectores BNC, trate estritamente como CFTV Analógico.
   - Se o relato citar Switch PoE, NVR, patch cord RJ45, endereço IP ou ping, trate estritamente como CFTV IP. Não misture as tecnologias.
2. FOCO EM CAMPO: Suas instruções devem focar no trabalho manual do técnico (medição de tensão com multímetro, crimpagem, troca de patch cord, verificação de LEDs de link, testes de continuidade).
3. FIDELIDADE AO RELATO: Nunca invente equipamentos. Se o técnico mencionou apenas uma câmera e um switch, não cite roteadores ou NVRs no diagnóstico.

REGRAS DE FORMATAÇÃO (ESTRITAS):
1. Seja extremamente técnico, direto e use jargão profissional de telecomunicações.
2. Você DEVE responder ESTRITAMENTE utilizando a estrutura e os títulos exatos abaixo, sem nenhuma alteração ou introdução:

Diagnóstico Inicial:
(Descreva em até 3 frases a causa raiz mais provável com base no relato do técnico, diferenciando claramente a tecnologia envolvida).

Checklist de Ação:
1. (Passo prático 1 - focado em teste físico, verificação de LED, comando ou crimpagem).
2. (Passo prático 2 - focado em isolamento de portas ou cabos).
3. (Passo prático 3 - teste com equipamento de medição ou substituição de insumo rápido).
(Adicione mais passos apenas se for estritamente necessário para cobrir o escopo físico).

Checklist de Ferramentas/Materiais:
- (Ferramenta específica necessária para esta triagem, ex: Multímetro, Testador de Cabo, Alicate de Crimpagem).
- (Insumo exato, ex: Conector RJ45, Conector BNC, Balun HD, Patch Cord Cat6).

Quando Escalonar:
(Descreva a condição exata de falha de hardware interno ou infraestrutura pesada onde o técnico deve parar e acionar o Nível 2/Gerência).`
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_completion_tokens: 700
            })
        });

        if (!response.ok) {
            const detalhe = await response.text();
            return res.status(502).json({
                erro: "Erro ao consultar o OpenRouter.",
                status: response.status,
                detalhe
            });
        }

        const data = await response.json();
        const text = data.choices?.[0]?.message?.content;

        res.json({ modelo: MODEL, resposta: text, uso: data.usage ?? null });

    } catch (error) {
        res.status(500).json({ erro: "Erro interno no servidor.", detalhe: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});