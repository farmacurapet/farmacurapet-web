import { supabase } from './api/supabase.js';

console.log("Monitorando botões da Dashboard...");

document.addEventListener('DOMContentLoaded', () => {
    // Procura por qualquer botão que diga "Publicar" ou similar
    const btn = document.querySelector('button'); 

    if (btn) {
        console.log("Botão encontrado! Pronto para capturar cliques.");
        
        btn.onclick = async (e) => {
            e.preventDefault();
            
            // Pega os valores pelos IDs dos campos
            const titulo = document.getElementById('titulo')?.value;
            const descricao = document.getElementById('descricao')?.value;
            const tipo = document.getElementById('tipo')?.value;
            const fotoInput = document.getElementById('fotoInput');

            if (!titulo || !descricao) {
                alert("Por favor, preencha o título e a descrição.");
                return;
            }

            btn.disabled = true;
            btn.innerText = "Enviando...";

            try {
                const { data: { user } } = await supabase.auth.getUser();
                let urlFinal = '';

                // Lógica da Foto
                if (fotoInput && fotoInput.files[0]) {
                    const arquivo = fotoInput.files[0];
                    const nomeArquivo = `${Date.now()}-${arquivo.name}`;
                    
                    const { error: uploadError } = await supabase.storage
                        .from('fotos')
                        .upload(nomeArquivo, arquivo);

                    if (uploadError) throw uploadError;

                    const { data: publicData } = supabase.storage
                        .from('fotos')
                        .getPublicUrl(nomeArquivo);
                    
                    urlFinal = publicData.publicUrl;
                }

                // Salvar no Banco
                const { error: dbError } = await supabase.from('posts').insert([{
                    user_id: user.id,
                    titulo: titulo,
                    descricao: descricao,
                    tipo: tipo || 'Geral',
                    foto_url: urlFinal
                }]);

                if (dbError) throw dbError;

                alert('Postagem realizada com sucesso!');
                location.reload();

            } catch (err) {
                console.error(err);
                alert('Erro ao publicar: ' + err.message);
                btn.disabled = false;
                btn.innerText = "Publicar Agora";
            }
        };
    } else {
        console.error("Nenhum botão foi encontrado na página!");
    }
});
