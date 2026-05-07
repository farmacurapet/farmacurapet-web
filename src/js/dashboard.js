import { supabase } from './api/supabase.js';

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btnPublicar');

    if (btn) {
        btn.onclick = async (e) => {
            e.preventDefault(); // ISSO impede o redirecionamento!
            e.stopPropagation(); // ISSO impede que outros scripts interfiram
            
            console.log("Iniciando postagem na Farmacura...");
            
            // ... (restante da lógica de upload que já configuramos)
            btn.disabled = true;
            btn.innerText = "Salvando...";
            
            try {
                // Aqui vai a lógica que já enviamos do Supabase
                alert("Postagem salva com sucesso no banco de dados!");
                location.reload();
            } catch (err) {
                alert("Erro: " + err.message);
                btn.disabled = false;
            }
        };
    }
});
