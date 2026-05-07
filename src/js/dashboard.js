import { supabase } from './api/supabase.js';

console.log("Arquivo dashboard.js carregado com sucesso!");

document.addEventListener('DOMContentLoaded', () => {
    const formPublicar = document.getElementById('formPublicar');
    
    if (formPublicar) {
        console.log("Formulário de publicação encontrado!");
        formPublicar.onsubmit = async (e) => {
            e.preventDefault();
            console.log("Botão clicado, iniciando processo...");
            
            const btn = e.target.querySelector('button');
            btn.disabled = true;
            btn.innerText = "Enviando...";

            try {
                const { data: { user } } = await supabase.auth.getUser();
                const arquivo = document.getElementById('fotoInput').files[0];
                let urlFinal = '';

                if (arquivo) {
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

                const { error: dbError } = await supabase.from('posts').insert([{
                    user_id: user.id,
                    titulo: document.getElementById('titulo').value,
                    description: document.getElementById('descricao').value,
                    tipo: document.getElementById('tipo').value,
                    foto_url: urlFinal
                }]);

                if (dbError) throw dbError;

                alert('Publicado com sucesso!');
                location.reload();

            } catch (err) {
                alert('Erro: ' + err.message);
                btn.disabled = false;
                btn.innerText = "Publicar Agora";
            }
        };
    } else {
        console.error("ERRO: O formulário com ID 'formPublicar' não existe nesta página.");
    }
});
