import { supabase } from './api/supabase.js';

const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            alert('Erro ao acessar: ' + error.message);
        } else {
            // Sucesso! Redireciona para a área logada (Dashboard)
            window.location.href = '../dashboard/index.html';
        }
    });
}
