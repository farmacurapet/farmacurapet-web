# Tela de Login e Cadastro - DoaFarmaPet

## Elementos Visuais (Interface Moderna)
1. [Logo do App] -> Centralizada no topo (fundo esmeralda ou branco).
2. [Campo E-mail] -> Borda arredondada, ícone de carta cinza discreto.
3. [Campo Senha] -> Ocultar caracteres por padrão, ícone de "olho" para mostrar a senha.
4. [Link "Esqueci a Senha"] -> Alinhado à direita, cor roxo suave.
5. [Botão Entrar] -> Cor verde esmeralda vibrante, cantos bem arredondados.

## Seção de Cadastro (Com ViaCEP)
- Botão "Criar Conta" abre o formulário:
  - Nome Completo
  - WhatsApp (com máscara: (81) 9XXXX-XXXX)
  - Campo CEP -> Gatilho automático: aciona a API do ViaCEP ao digitar o 8º número.
  - Campos Automáticos (Rua, Bairro, Cidade) -> Bloqueados para edição ou preenchidos automaticamente.
  - Número e Complemento -> Livres para digitação.
