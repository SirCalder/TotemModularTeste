const app = document.getElementById('app');

// Enum para telas
const Screen = {
    WELCOME: 'WELCOME',
    IDENTIFICATION: 'IDENTIFICATION',
    CONFIRMATION: 'CONFIRMATION',
    PAYMENT: 'PAYMENT',
    COMPLETION: 'COMPLETION',
    REASON: 'REASON',
    SCHEDULING: 'SCHEDULING',
    PROFILE: 'PROFILE',
    SPECIALISTS: 'SPECIALISTS',
    FAQ: 'FAQ',
};

// Estado da aplicação
let state = {
    currentScreen: Screen.WELCOME,
    previousScreen: Screen.WELCOME,
    userData: null,
    newAppointment: {},
    isLoading: false,
    error: null,
};

// Mock de dados do usuário
const mockUserData = {
    id: '123.456.789-00',
    name: 'João da Silva',
    appointment: {
        doctor: 'Dra. Helena Costa',
        time: '14:30',
        type: 'Consulta de Rotina',
    },
};

// --- Funções de Navegação e Renderização ---

function changeScreen(newScreen) {
    app.classList.add('fading');
    setTimeout(() => {
        state.previousScreen = state.currentScreen;
        state.currentScreen = newScreen;
        render();
        // Remove a classe fading após um pequeno delay para permitir que as animações de entrada comecem
        setTimeout(() => {
            app.classList.remove('fading');
        }, 50);
    }, 400);
}

function render() {
    // O conteúdo da tela é atualizado aqui, após o fade-out
    let screenContent = '';

    switch (state.currentScreen) {
        case Screen.WELCOME:
            screenContent = renderWelcomeScreen();
            break;
        case Screen.IDENTIFICATION:
            screenContent = renderIdentificationScreen();
            break;
        case Screen.CONFIRMATION:
            screenContent = renderConfirmationScreen();
            break;
        case Screen.PAYMENT:
            screenContent = renderPaymentScreen();
            break;
        case Screen.COMPLETION:
            screenContent = renderCompletionScreen();
            break;
        case Screen.REASON:
            screenContent = renderReasonScreen();
            break;
        case Screen.SCHEDULING:
            screenContent = renderSchedulingScreen();
            break;
        case Screen.PROFILE:
            screenContent = renderProfileScreen();
            break;
        case Screen.SPECIALISTS:
            screenContent = renderSpecialistsScreen();
            break;
        case Screen.FAQ:
            screenContent = renderFaqScreen();
            break;
    }
    
    app.innerHTML = screenContent;
    addEventListeners();
}

// --- Funções de Renderização de Tela (geram HTML) ---

function renderWelcomeScreen() {
    return `
        <div class="screen" role="main" aria-labelledby="welcome-title">
            <div class="animate-fade-in-stagger-1">
                <svg class="welcome-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6v6l4 2" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 22a10 10 0 110-20 10 10 0 010 20z" />
                </svg>
            </div>
            <h1 id="welcome-title" class="animate-fade-in-stagger-2">Bem-vindo(a)</h1>
            <p class="animate-fade-in-stagger-3">Selecione uma opção para começar sua jornada.</p>
            <p class="subtitle animate-fade-in-stagger-3">Seu bem-estar é nossa prioridade</p>
            <div class="button-group animate-fade-in-stagger-4" role="group" aria-label="Opções principais">
                <button class="primary-button" id="start-journey" aria-describedby="checkin-desc">
                    ✓ Realizar Check-in
                </button>
                <span id="checkin-desc" class="sr-only">Faça check-in para sua consulta já agendada</span>
                <button class="secondary-button" id="start-scheduling" aria-describedby="schedule-desc">
                    📅 Planejar seu Cuidado
                </button>
                <span id="schedule-desc" class="sr-only">Agende uma nova consulta</span>
            </div>
        </div>
    `;
}

function renderIdentificationScreen() {
    return `
        <div class="screen" role="main" aria-labelledby="identification-title">
            <h2 id="identification-title" class="animate-fade-in-stagger-1">🔐 Identificação</h2>
            <p class="animate-fade-in-stagger-2">Por favor, insira seu CPF para continuar.</p>
            <p class="subtitle animate-fade-in-stagger-2">Seus dados estão seguros conosco</p>
            <div class="input-container animate-fade-in-stagger-3">
                <label for="cpf-input" class="sr-only">Digite seu CPF</label>
                <input 
                    type="text" 
                    id="cpf-input" 
                    class="input-field" 
                    placeholder="000.000.000-00" 
                    maxlength="14"
                    aria-describedby="cpf-help"
                    aria-required="true"
                    autocomplete="off"
                    inputmode="numeric"
                >
                <div class="input-aura"></div>
                <p id="cpf-help" class="sr-only">Digite os 11 dígitos do seu CPF. A formatação será aplicada automaticamente.</p>
            </div>
            <div class="button-group animate-fade-in-stagger-4" role="group">
                <button class="action-button" id="submit-id" aria-describedby="submit-help">
                    ✓ Confirmar
                </button>
                <span id="submit-help" class="sr-only">Confirmar CPF e prosseguir para verificação</span>
                <button class="back-button" id="back-to-welcome">
                    ← Voltar
                </button>
            </div>
        </div>
    `;
}

function renderConfirmationScreen() {
    const { appointment, id, name } = state.userData;
    const isNewAppointment = id === 'Novo Agendamento';
    const patientName = isNewAppointment ? 'Novo Paciente' : name;
    
    return `
        <div class="screen" role="main" aria-labelledby="confirmation-title">
            <h2 id="confirmation-title" class="animate-fade-in-stagger-1">
                ✨ ${isNewAppointment ? 'Confirme seu Agendamento' : `Olá, ${patientName.split(' ')[0]}!`}
            </h2>
            <p class="subtitle animate-fade-in-stagger-1">
                ${isNewAppointment ? 'Revise os dados do seu novo agendamento' : 'Confirme os dados da sua consulta'}
            </p>
            <div class="confirmation-details animate-fade-in-stagger-2" role="region" aria-labelledby="appointment-details">
                <h3 id="appointment-details" class="sr-only">Detalhes do agendamento</h3>
                <p><strong>👤 Paciente:</strong> ${patientName}</p>
                <p><strong>🩺 Tipo:</strong> ${appointment.type}</p>
                <p><strong>👨‍⚕️ Profissional:</strong> ${appointment.doctor}</p>
                <p><strong>🕐 Horário:</strong> ${appointment.time}</p>
                ${!isNewAppointment ? `<p><strong>📍 Sala:</strong> ${Math.floor(Math.random() * 10) + 1}</p>` : ''}
            </div>
            <div class="button-group animate-fade-in-stagger-3" role="group">
                <button class="action-button" id="confirm-appointment">
                    💳 Confirmar e Pagar
                </button>
                <button class="back-button" id="back-from-confirmation">
                    ← Voltar
                </button>
            </div>
             <button class="secondary-button animate-fade-in-stagger-4" id="view-profile">
                 👨‍⚕️ Ver Perfil do Profissional
             </button>
        </div>
    `;
}

function renderPaymentScreen() {
    return `
        <div class="screen">
            <h2 class="animate-fade-in-stagger-1">Pagamento Seguro</h2>
            <p class="animate-fade-in-stagger-2">Aproxime seu cartão para efetuar o pagamento.</p>
            <div class="animate-fade-in-stagger-3">
                <svg class="payment-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            </div>
            <p class="price-highlight animate-fade-in-stagger-4">R$ 150,00</p>
            <p class="subtitle animate-fade-in-stagger-4">Pagamento único • Sem taxas adicionais</p>
            <div class="button-group animate-fade-in-stagger-5">
                 <button class="action-button" id="simulate-payment">💳 Confirmar Pagamento</button>
                 <button class="back-button" id="back-to-confirmation">Voltar</button>
            </div>
        </div>
    `;
}

function renderCompletionScreen() {
    const patientName = state.userData?.name?.split(' ')[0] || 'paciente';
    const isNewAppointment = state.userData?.id === 'Novo Agendamento';
    
    return `
        <div class="screen" role="main" aria-labelledby="completion-title">
            <div class="completion-icon" role="img" aria-label="Check-in concluído com sucesso">
                <svg viewBox="0 0 100 100">
                    <circle class="circle" cx="50" cy="50" r="45"/>
                    <path class="check" d="M30 50 l20 20 l30 -40"/>
                </svg>
            </div>
            <h2 id="completion-title" class="animate-fade-in-stagger-1">
                ✨ Tudo pronto, ${patientName}!
            </h2>
            <p class="animate-fade-in-stagger-2">
                ${isNewAppointment ? 'Sua consulta foi agendada com sucesso.' : 'Seu check-in foi realizado com sucesso.'}
            </p>
            <p class="subtitle animate-fade-in-stagger-3">
                ${isNewAppointment ? 'Você receberá uma confirmação por SMS' : 'Dirija-se à sala de espera • Aguarde ser chamado'}
            </p>
            <p class="animate-fade-in-stagger-3">
                Desejamos uma experiência tranquila e acolhedora! 🌿
            </p>
            <div class="button-group animate-fade-in-stagger-4">
                <button class="primary-button" id="finish-session" aria-describedby="finish-help">
                    🏠 Finalizar Sessão
                </button>
                <span id="finish-help" class="sr-only">Retornar à tela inicial para outro atendimento</span>
            </div>
        </div>
    `;
}

function renderReasonScreen() {
    return `
        <div class="screen">
            <h2 class="animate-fade-in-stagger-1">🗓️ Novo Agendamento</h2>
            <p class="animate-fade-in-stagger-2">Qual o motivo da sua consulta?</p>
            <p class="subtitle animate-fade-in-stagger-2">Selecione a especialidade desejada</p>
            <div class="reason-grid animate-fade-in-stagger-3">
                <div class="reason-card" data-reason="Consulta de Rotina">
                    <h3>🩺 Consulta de Rotina</h3>
                    <p>Acompanhamento periódico de saúde e bem-estar.</p>
                </div>
                <div class="reason-card" data-reason="Terapia">
                    <h3>🧠 Terapia</h3>
                    <p>Sessões de psicoterapia e apoio emocional.</p>
                </div>
                <div class="reason-card" data-reason="Acupuntura">
                    <h3>🎯 Acupuntura</h3>
                    <p>Tratamento natural para alívio de dores.</p>
                </div>
                 <div class="reason-card" data-reason="Nutrição">
                    <h3>🥗 Nutrição</h3>
                    <p>Orientação nutricional personalizada.</p>
                </div>
            </div>
             <div class="button-group animate-fade-in-stagger-4">
                <button class="back-button" id="back-to-welcome">← Voltar</button>
             </div>
        </div>
    `;
}

function renderSchedulingScreen() {
     return `
        <div class="screen">
            <h2 class="animate-fade-in-stagger-1">Escolha o Horário</h2>
            <p class="animate-fade-in-stagger-2">Selecione o profissional e o horário desejado.</p>
            <div class="confirmation-details animate-fade-in-stagger-3">
                 <label for="doctor-select">Profissional:</label>
                 <select id="doctor-select" class="input-field">
                    <option value="Dr. Carlos Pereira">Dr. Carlos Pereira (Psicólogo)</option>
                    <option value="Dra. Ana Souza">Dra. Ana Souza (Nutricionista)</option>
                 </select>
                 <label for="date-input">Data:</label>
                 <input type="date" id="date-input" class="input-field">
                 <label for="time-input">Hora:</label>
                 <input type="time" id="time-input" class="input-field">
            </div>
            <div class="button-group animate-fade-in-stagger-4">
                <button class="action-button" id="schedule-confirm">Agendar</button>
                <button class="back-button" id="back-to-reason">Voltar</button>
            </div>
            <button class="secondary-button animate-fade-in-stagger-5" id="view-specialists">Ver Especialistas</button>
        </div>
    `;
}

function renderProfileScreen() {
    return `
        <div class="screen">
            <h2 class="animate-fade-in-stagger-1">Perfil do Profissional</h2>
            <div class="profile-details animate-fade-in-stagger-2">
                 <p><strong>Nome:</strong> Dra. Helena Costa</p>
                 <p><strong>Especialidade:</strong> Psicologia Clínica</p>
                 <p><strong>Formação:</strong> USP</p>
                 <p>Abordagem focada em terapia cognitivo-comportamental, com 10 anos de experiência.</p>
            </div>
            <div class="button-group animate-fade-in-stagger-3">
                <button class="back-button" id="back-from-profile">Voltar</button>
            </div>
        </div>
    `;
}

function renderSpecialistsScreen() {
     return `
        <div class="screen">
            <h2 class="animate-fade-in-stagger-1">👨‍⚕️ Nossos Especialistas</h2>
            <p class="subtitle animate-fade-in-stagger-1">Profissionais qualificados para seu cuidado</p>
            <div class="specialists-list animate-fade-in-stagger-2">
                <div class="specialist-item">
                    <div class="specialist-name">Dr. Carlos Pereira</div>
                    <div class="specialist-info">🧠 Psicólogo • Especialista em Terapia Cognitivo-Comportamental</div>
                    <div class="specialist-info">CRP 12345 • 8 anos de experiência</div>
                </div>
                <div class="specialist-item">
                    <div class="specialist-name">Dra. Ana Souza</div>
                    <div class="specialist-info">🥗 Nutricionista • Foco em reeducação alimentar</div>
                    <div class="specialist-info">CRN 67890 • 6 anos de experiência</div>
                </div>
                <div class="specialist-item">
                    <div class="specialist-name">Dr. Marcos Lima</div>
                    <div class="specialist-info">🎯 Acupunturista • Especialista em dor crônica</div>
                    <div class="specialist-info">COFFITO 11223 • 10 anos de experiência</div>
                </div>
            </div>
            <div class="button-group animate-fade-in-stagger-3">
                <button class="back-button" id="back-from-specialists">← Voltar</button>
            </div>
        </div>
    `;
}

function renderFaqScreen() {
    return `
        <div class="screen">
            <h2 class="animate-fade-in-stagger-1">Perguntas Frequentes</h2>
            <div class="specialists-list animate-fade-in-stagger-2">
                <p><strong>Como funciona o pagamento?</strong> Aceitamos cartão de crédito e débito por aproximação.</p>
                <p><strong>Posso cancelar um agendamento?</strong> Sim, pelo nosso app ou telefone com 24h de antecedência.</p>
                 <p><strong>Quais convênios são aceitos?</strong> No momento não aceitamos convênios.</p>
            </div>
            <div class="button-group animate-fade-in-stagger-3">
                <button class="back-button" id="back-from-faq">Voltar</button>
            </div>
        </div>
    `;
}


// --- Handlers de Eventos ---

function addEventListeners() {
    // Welcome Screen
    document.getElementById('start-journey')?.addEventListener('click', () => changeScreen(Screen.IDENTIFICATION));
    document.getElementById('start-scheduling')?.addEventListener('click', () => changeScreen(Screen.REASON));
    document.getElementById('faq-button')?.addEventListener('click', () => changeScreen(Screen.FAQ));

    // Identification Screen
    document.getElementById('submit-id')?.addEventListener('click', async () => {
        const input = document.getElementById('cpf-input');
        const id = input.value;
        const errorDiv = document.getElementById('cpf-error');
        
        // Limpa erros anteriores
        if (errorDiv) errorDiv.remove();
        
        if (!isValidCPF(id)) {
            showError(input, 'Por favor, insira um CPF válido');
            input.style.animation = 'none';
            input.offsetHeight; // Trigger reflow
            input.style.animation = 'shake 0.5s ease-in-out';
            return;
        }
        
        // Simula busca no servidor
        await simulateApiCall(async () => {
            // Simula delay de API
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Simula 90% de sucesso
            if (Math.random() > 0.1) {
                state.userData = { 
                    ...mockUserData, 
                    id,
                    name: getRandomPatientName() // Nome personalizado
                };
                changeScreen(Screen.CONFIRMATION);
            } else {
                throw new Error('CPF não encontrado em nossa base de dados');
            }
        }, 'Verificando seus dados...');
    });
    
    document.getElementById('back-to-welcome')?.addEventListener('click', () => changeScreen(Screen.WELCOME));
    
    // Adiciona máscara para CPF
    const cpfInput = document.getElementById('cpf-input');
    if (cpfInput) {
        cpfInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            e.target.value = value;
        });
        
        // Enter para submit
        cpfInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                document.getElementById('submit-id').click();
            }
        });
    }

    // Confirmation Screen
    document.getElementById('confirm-appointment')?.addEventListener('click', () => changeScreen(Screen.PAYMENT));
    document.getElementById('back-from-confirmation')?.addEventListener('click', () => {
        const backScreen = state.userData?.id === 'Novo Agendamento' ? Screen.SCHEDULING : Screen.IDENTIFICATION;
        changeScreen(backScreen);
    });
    document.getElementById('view-profile')?.addEventListener('click', () => changeScreen(Screen.PROFILE));

    // Payment Screen
    document.getElementById('simulate-payment')?.addEventListener('click', () => changeScreen(Screen.COMPLETION));
    document.getElementById('back-to-confirmation')?.addEventListener('click', () => changeScreen(Screen.CONFIRMATION));

    // Completion Screen
    document.getElementById('finish-session')?.addEventListener('click', () => {
        state.userData = null;
        state.newAppointment = {};
        changeScreen(Screen.WELCOME);
    });
    
    // Reason Screen
    document.querySelectorAll('.reason-card').forEach((card, index) => {
        // Torna os cards focusáveis
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-describedby', `reason-desc-${index}`);
        
        const handleSelect = () => {
            state.newAppointment.type = card.dataset.reason;
            changeScreen(Screen.SCHEDULING);
        };
        
        card.addEventListener('click', handleSelect);
        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleSelect();
            }
        });
    });

    // Scheduling Screen
    document.getElementById('schedule-confirm')?.addEventListener('click', () => {
        const doctor = document.getElementById('doctor-select').value;
        const date = document.getElementById('date-input').value;
        const time = document.getElementById('time-input').value;
        if (doctor && date && time) {
            state.userData = {
                id: 'Novo Agendamento',
                appointment: {
                    doctor,
                    time,
                    type: state.newAppointment.type || 'Não definido',
                },
            };
            changeScreen(Screen.CONFIRMATION);
        }
    });
    document.getElementById('back-to-reason')?.addEventListener('click', () => changeScreen(Screen.REASON));
    document.getElementById('view-specialists')?.addEventListener('click', () => changeScreen(Screen.SPECIALISTS));

    // Profile, Specialists, FAQ Screens
    document.getElementById('back-from-profile')?.addEventListener('click', () => changeScreen(state.previousScreen));
    document.getElementById('back-from-specialists')?.addEventListener('click', () => changeScreen(state.previousScreen));
    document.getElementById('back-from-faq')?.addEventListener('click', () => changeScreen(state.previousScreen));
}


// --- Funções Auxiliares ---

function isValidCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf[i]) * (10 - i);
    }
    let digit1 = (sum * 10) % 11;
    if (digit1 === 10) digit1 = 0;
    
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf[i]) * (11 - i);
    }
    let digit2 = (sum * 10) % 11;
    if (digit2 === 10) digit2 = 0;
    
    return digit1 === parseInt(cpf[9]) && digit2 === parseInt(cpf[10]);
}

function getRandomPatientName() {
    const names = [
        'Maria Silva', 'João Santos', 'Ana Costa', 'Carlos Oliveira',
        'Lucia Pereira', 'Pedro Souza', 'Carmen Lima', 'José Almeida',
        'Rosa Ferreira', 'Antonio Ribeiro'
    ];
    return names[Math.floor(Math.random() * names.length)];
}

function showError(inputElement, message) {
    const errorDiv = document.createElement('div');
    errorDiv.id = 'cpf-error';
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.setAttribute('role', 'alert');
    errorDiv.setAttribute('aria-live', 'polite');
    
    inputElement.parentNode.insertBefore(errorDiv, inputElement.nextSibling);
    
    // Remove o erro após 5 segundos
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }, 5000);
}

function showLoadingIndicator(message = 'Carregando...') {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading-indicator';
    loadingDiv.className = 'loading-spinner';
    loadingDiv.innerHTML = `
        <div class="spinner" aria-hidden="true"></div>
        <p>${message}</p>
    `;
    loadingDiv.setAttribute('aria-live', 'polite');
    
    app.appendChild(loadingDiv);
    return loadingDiv;
}

function hideLoadingIndicator() {
    const loading = document.getElementById('loading-indicator');
    if (loading) {
        loading.remove();
    }
}

async function simulateApiCall(apiFunction, loadingMessage) {
    state.isLoading = true;
    const loadingIndicator = showLoadingIndicator(loadingMessage);
    
    try {
        await apiFunction();
    } catch (error) {
        console.error('API Error:', error);
        // Exibe erro para o usuário
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message global-error';
        errorDiv.textContent = error.message;
        errorDiv.setAttribute('role', 'alert');
        
        app.insertBefore(errorDiv, app.firstChild);
        
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 5000);
    } finally {
        state.isLoading = false;
        hideLoadingIndicator();
    }
}

// Adiciona navegação por teclado global
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // ESC sempre volta para tela anterior
        if (state.currentScreen !== Screen.WELCOME) {
            changeScreen(state.previousScreen);
        }
    }
});

// Inicia a aplicação
render();
