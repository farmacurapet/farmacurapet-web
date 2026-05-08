// 1. Definição das chaves (Certifique-se de que estão entre aspas simples)
const SUPABASE_URL = 'https://tkupfowbgykjjdkwfiyr.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrdXBmb3diZ3lrampka3dmaXlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzNjY1OTgsImV4cCI6MjA5MTk0MjU5OH0.yXCbccFrPB9qyVamthjAUdyrK0bqWfbRCG3LR4VAjBY';

let supabase;

// 2. Inicialização protegida
try {
    if (window.supabase) {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        console.log("Supabase conectado com sucesso!");
    } else {
        console.error("Erro: A biblioteca do Supabase não foi carregada no HTML.");
    }
} catch (err) {
    console.error("Erro ao inicializar o cliente Supabase:", err);
}

// 3. Exemplo de como deve ser a função de um botão (Ex: Login)
async function handleAuth() {
    // Verificação de segurança: se o supabase não iniciou, avisa o usuário
    if (!supabase) {
        Swal.fire('Erro Crítico', 'O sistema de banco de dados não carregou. Verifique sua internet.', 'error');
        return;
    }

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Se os campos estiverem vazios, o botão "para" aqui e avisa
    if (!email || !password) {
        Swal.fire('Atenção', 'Preencha o e-mail e a senha.', 'warning');
        return;
    }

    try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        
        if (error) throw error;
        
        Swal.fire('Sucesso', 'Login realizado!', 'success');
    } catch (error) {
        Swal.fire('Erro no Login', error.message, 'error');
    }
}

// 4. Função do Olhinho (Puramente JavaScript, não depende do Supabase)
function toggleSenha() {
    const input = document.getElementById('password');
    const icon = document.getElementById('eye-icon');
    
    if (!input || !icon) return; // Segurança caso o ID esteja errado

    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}
