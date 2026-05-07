import { supabase } from './api/supabase.js';

// 1. Proteção de Rota: Se não estiver logado, volta pro login
async function checkSession() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        window.location.href = '../auth/login.html';
    }
}

// 2. Função para buscar e exibir os itens do banco
async function carregarFeed() {
    const feed = document.getElementById('feedConteudo');
    
    const { data: posts, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Erro ao buscar dados:', error);
        feed.innerHTML = '<p>Erro ao carregar doações. Verifique sua conexão.</p>';
        return;
    }

    if (posts.length === 0) {
        feed.innerHTML = '<p>Nenhuma doação ou pedido encontrado no momento.</p>';
        return;
    }

    // Limpa o "Carregando..." e monta os cards
    feed.innerHTML = '';
    posts.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = \
            <div style="display: flex; justify-content: space-between;">
                <span style="background: #e8f5e9; color: #2e7d32; padding: 2px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold;">
                    \
                </span>
                <small style="color: #999;">\</small>
            </div>
            <h3 style="margin-top: 10px;">\</h3>
            <p style="color: #666; margin: 10px 0;">\</p>
            <button style="background: #25d366; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; font-weight: bold;">
                Chamar no WhatsApp
            </button>
        \;
        feed.appendChild(card);
    });
}

// Inicializa a página
checkSession();
carregarFeed();
// Lógica do Modal
const modal = document.getElementById('modalCadastro');
const btnNovo = document.querySelector('button'); // O botão verde de "+ Nova Doação"
const btnFechar = document.getElementById('fecharModal');
const formPublicar = document.getElementById('formPublicar');

if(btnNovo) btnNovo.onclick = () => modal.style.display = 'flex';
if(btnFechar) btnFechar.onclick = () => modal.style.display = 'none';

// Função para Salvar no Banco
if(formPublicar) {
    formPublicar.onsubmit = async (e) => {
        e.preventDefault();
        
        const { data: { user } } = await supabase.auth.getUser();
        
        const novoPost = {
            user_id: user.id,
            tipo: document.getElementById('tipo').value,
            titulo: document.getElementById('titulo').value,
            descricao: document.getElementById('descricao').value,
        };

        const { error } = await supabase.from('posts').insert([novoPost]);

        if (error) {
            alert('Erro ao publicar: ' + error.message);
        } else {
            alert('Publicado com sucesso! A Lara ficaria orgulhosa.');
            modal.style.display = 'none';
            formPublicar.reset();
            location.reload(); // Recarrega para mostrar o novo item
        }
    };
}
async function uploadFoto(arquivo) {
    const nomeArquivo = \\-\\;
    const { data, error } = await supabase.storage
        .from('fotos_lara')
        .upload(nomeArquivo, arquivo);

    if (error) throw error;

    // Pega a URL pública da foto
    const { data: { publicUrl } } = supabase.storage
        .from('fotos_lara')
        .getPublicUrl(nomeArquivo);

    return publicUrl;
}

// Atualize sua função formPublicar.onsubmit para incluir:
// const fotoFile = document.getElementById('fotoInput').files[0];
// if (fotoFile) novoPost.foto_url = await uploadFoto(fotoFile);
