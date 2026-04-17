 <!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FarmacuraPet - Cadastro Integrado</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; color: #333; background-color: #f4f9ff; }
        header { background-color: #2D9CDB; color: white; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        .container { max-width: 550px; margin: 40px auto; background: white; padding: 30px; border-radius: 15px; box-shadow: 0 5px 20px rgba(0,0,0,0.08); }
        .tabs { display: flex; margin-bottom: 25px; background: #eee; border-radius: 30px; padding: 5px; }
        .tab-btn { flex: 1; border: none; padding: 12px; cursor: pointer; border-radius: 25px; font-weight: bold; background: none; color: #666; transition: 0.3s; }
        .tab-btn.active { background: #2D9CDB; color: white; }
        .tab-btn.active.doar { background: #27AE60; }
        h2 { text-align: center; color: #2D9CDB; margin-top: 0; }
        .form-group { margin-bottom: 15px; }
        label { display: block; margin-bottom: 5px; font-weight: bold; color: #555; font-size: 0.9rem; }
        input { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px; box-sizing: border-box; font-size: 1rem; }
        input:focus { border-color: #2D9CDB; outline: none; }
        .btn-submit { width: 100%; padding: 15px; border: none; border-radius: 25px; font-weight: bold; font-size: 1.1rem; cursor: pointer; transition: 0.3s; margin-top: 15px; color: white; }
        .bg-azul { background-color: #2D9CDB; }
        .bg-verde { background-color: #27AE60; }
        .hidden { display: none; }
    </style>
</head>
<body>

<header>
    <div class="logo"><strong>FarmacuraPet</strong></div>
    <nav>Início | Sobre | Login</nav>
</header>

<div class="container">
    <div class="tabs">
        <button id="btnTabDoar" class="tab-btn active doar" onclick="mudarTipo('DOADOR')">Quero Doar</button>
        <button id="btnTabReceber" class="tab-btn" onclick="mudarTipo('RECEBEDOR')">Preciso de Ajuda</button>
    </div>

    <h2 id="titulo">Cadastro de Doação</h2>

    <form id="formUnico">
        <div class="form-group">
            <label for="nome">Nome Completo</label>
            <input type="text" id="nome" placeholder="Seu nome" required>
        </div>

        <div class="form-group">
            <label for="contato">Telefone / WhatsApp</label>
            <input type="tel" id="contato" placeholder="(81) 90000-0000" required>
        </div>

        <div class="form-group">
            <label for="medicamento">Medicamento</label>
            <input type="text" id="medicamento" placeholder="Nome do remédio" required>
        </div>

        <div class="form-group">
            <label for="quantidade">Quantidade (Unidades)</label>
            <input type="number" id="quantidade" placeholder="Ex: 20" required>
        </div>

        <div class="form-group" id="areaDinamica">
            <label id="labelDinamico" for="dataDinamica">Validade do Medicamento</label>
            <input type="date" id="dataDinamica" required>
        </div>

        <button type="button" id="btnAcao" class="btn-submit bg-verde" onclick="processarCadastro()">Finalizar Cadastro</button>
    </form>
</div>

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<script>
    // 2. CONFIGURAÇÃO DE CONEXÃO
    const SB_URL = "https://tkupfowbgykjjdkwfiyr.supabase.co";
    const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrdXBmb3diZ3lrampka3dmaXlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzNjY1OTgsImV4cCI6MjA5MTk0MjU5OH0.yXCbccFrPB9qyVamthjAUdyrK0bqWfbRCG3LR4VAjBY";
    const supabaseClient = supabase.createClient(SB_URL, SB_KEY);

    let tipoAtual = 'DOADOR';

    // 3. FUNÇÃO PARA MUDAR AS CORES (ESSENCIAL PARA O VISUAL)
    function mudarTipo(tipo) {
        tipoAtual = tipo;
        const btnD = document.getElementById('btnTabDoar');
        const btnR = document.getElementById('btnTabReceber');
        const titulo = document.getElementById('titulo');
        const label = document.getElementById('labelDinamico');
        const btnAcao = document.getElementById('btnAcao');

        btnD.classList.remove('active', 'doar');
        btnR.classList.remove('active', 'doar');

        if (tipo === 'DOADOR') {
            btnD.classList.add('active', 'doar');
            titulo.innerText = "Cadastro de Doação";
            label.innerText = "Validade do Medicamento";
            btnAcao.className = "btn-submit bg-verde";
            titulo.style.color = "#27AE60";
        } else {
            btnR.classList.add('active');
            titulo.innerText = "Solicitar Medicamento";
            label.innerText = "Validade da Receita";
            btnAcao.className = "btn-submit bg-azul";
            titulo.style.color = "#2D9CDB";
        }
    }

    // 4. FUNÇÃO PARA SALVAR NO BANCO
    async function processarCadastro() {
        const nomeUsuario = document.getElementById('nome').value;
        const zap = document.getElementById('contato').value;
        const remedio = document.getElementById('medicamento').value;
        const qtd = document.getElementById('quantidade').value;
        const dataVal = document.getElementById('dataDinamica').value;

        if (!nomeUsuario || !remedio || !dataVal) {
            alert("Por favor, preencha os campos obrigatórios.");
            return;
        }

        const btnAcao = document.getElementById('btnAcao');
        btnAcao.innerText = "Enviando...";
        btnAcao.disabled = true;

        try {
            const { error } = await supabaseClient
                .from('registros')
                .insert([{
                    perfil: tipoAtual,
                    nome: nomeUsuario,
                    whatsapp: zap,
                    medicamento: remedio,
                    quantidade: parseInt(qtd),
                    validade_data: dataVal
                }]);

            if (error) throw error;

            alert("✅ Sucesso! O FarmacuraPet salvou seu registro na nuvem.");
            document.getElementById('formUnico').reset();
            
        } catch (error) {
            alert("Erro ao conectar: " + error.message);
        } finally {
            btnAcao.innerText = "Finalizar Cadastro";
            btnAcao.disabled = false;
        }
    }
</script>
</body>
</html>
