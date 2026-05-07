import { supabase } from './api/supabase.js';

// Função para verificar se o usuário está logado
async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();
    
    // Se não estiver logado e não estiver na página de login, expulsa
    if (!user && !window.location.href.includes('login.html')) {
        window.location.href = '../auth/login.html';
    }
}

checkUser();
