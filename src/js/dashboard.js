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
