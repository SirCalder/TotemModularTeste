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
    const currentElement = app.querySelector('.screen');
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
    
    // Se há uma tela atual e GSAP está disponível, fazer transição animada
    if (currentElement && organicAnimations.isGSAPLoaded) {
        // Cria elemento temporário para a nova tela
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = screenContent;
        const newElement = tempDiv.firstElementChild;
        
        // Adiciona a nova tela (invisível) ao DOM
        app.appendChild(newElement);
        
        // Executa a transição
        organicAnimations.screenTransition(currentElement, newElement)
            .eventCallback("onComplete", () => {
                // Remove a tela antiga após a animação
                if (currentElement.parentNode) {
                    currentElement.remove();
                }
                addEventListeners();
                applyAdvancedAnimations();
            });
    } else {
        // Renderização simples (primeira vez ou fallback)
        app.innerHTML = screenContent;
        addEventListeners();
        applyAdvancedAnimations();
    }
}

// Função para aplicar animações suaves após renderização
function applyAdvancedAnimations() {
    // Aguarda um momento para garantir que o DOM está pronto
    requestAnimationFrame(() => {
        // Só aplica animações se GSAP estiver carregado
        if (!organicAnimations.isGSAPLoaded) return;

        // Animação sutil de título apenas na tela de boas-vindas
        const mainTitle = document.querySelector('h1');
        if (mainTitle && state.currentScreen === Screen.WELCOME) {
            organicAnimations.revealText(mainTitle, 0.2);
        }

        // Feedback interativo apenas em botões principais
        const primaryButtons = document.querySelectorAll('.primary-button, .secondary-button');
        primaryButtons.forEach(button => {
            organicAnimations.interactiveFeedback(button);
        });

        // Entrada suave para cards (sem cascata excessiva)
        const cards = document.querySelectorAll('.reason-card, .feature-card');
        if (cards.length > 0 && cards.length <= 4) {
            organicAnimations.cascadeIn(Array.from(cards), 0.1);
        }

        // Respiração muito sutil apenas para elementos centrais
        const centralIllustrations = document.querySelectorAll('.hero-illustration svg circle');
        centralIllustrations.forEach((element, index) => {
            if (index === 0) { // Apenas o primeiro elemento
                organicAnimations.organicBreathe(element);
            }
        });
    });
}

// --- Funções de Renderização de Tela (geram HTML) ---

function renderWelcomeScreen() {
    return `
        <div class="screen" role="main" aria-labelledby="welcome-title">
            <!-- Ilustração de boas-vindas com elementos orgânicos -->
            <div class="animate-fade-in-stagger-1">
                <svg class="hero-illustration" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <defs>
                        <linearGradient id="welcomeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#E9EFFF;stop-opacity:0.8" />
                            <stop offset="100%" style="stop-color:#F8F4F2;stop-opacity:0.8" />
                        </linearGradient>
                        <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#80BBA2;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#5C5B7C;stop-opacity:0.8" />
                        </linearGradient>
                    </defs>
                    <!-- Formas orgânicas de fundo -->
                    <ellipse cx="200" cy="150" rx="120" ry="80" fill="url(#welcomeGradient)"/>
                    <path d="M80 200 Q200 160 320 200 Q340 220 320 240 Q200 280 80 240 Q60 220 80 200" fill="#5C5B7C" opacity="0.08"/>
                    <!-- Sol estilizado -->
                    <circle cx="200" cy="120" r="25" fill="url(#sunGradient)" class="icon-breathe"/>
                    <g stroke="#80BBA2" stroke-width="2" opacity="0.6">
                        <line x1="200" y1="80" x2="200" y2="70"/>
                        <line x1="200" y1="170" x2="200" y2="160"/>
                        <line x1="240" y1="120" x2="250" y2="120"/>
                        <line x1="150" y1="120" x2="160" y2="120"/>
                        <line x1="228" y1="92" x2="235" y2="85"/>
                        <line x1="165" y1="148" x2="172" y2="155"/>
                        <line x1="228" y1="148" x2="235" y2="155"/>
                        <line x1="165" y1="92" x2="172" y2="85"/>
                    </g>
                </svg>
            </div>
            
            <h1 id="welcome-title" class="animate-fade-in-stagger-2" data-splitting>
                <svg class="feather-icon feather-icon-medium" viewBox="0 0 24 24" stroke="currentColor" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="5"/>
                    <line x1="12" y1="1" x2="12" y2="3"/>
                    <line x1="12" y1="21" x2="12" y2="23"/>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                    <line x1="1" y1="12" x2="3" y2="12"/>
                    <line x1="21" y1="12" x2="23" y2="12"/>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
                Bem-vindo ao Amanhecer
            </h1>
            <p class="animate-fade-in-stagger-3">Selecione uma opção para começar sua jornada de bem-estar.</p>
            <p class="subtitle animate-fade-in-stagger-3">Seu cuidado integral é nossa prioridade</p>
            
            <div class="button-group animate-fade-in-stagger-4" role="group" aria-label="Opções principais">
                <button class="primary-button" id="start-journey" aria-describedby="checkin-desc">
                    <svg class="feather-icon feather-icon-small" viewBox="0 0 24 24" stroke="currentColor" fill="none" aria-hidden="true">
                        <polyline points="20,6 9,17 4,12"/>
                    </svg>
                    Realizar Check-in
                </button>
                <span id="checkin-desc" class="sr-only">Faça check-in para sua consulta já agendada</span>
                
                <button class="secondary-button" id="start-scheduling" aria-describedby="schedule-desc">
                    <svg class="feather-icon feather-icon-small" viewBox="0 0 24 24" stroke="currentColor" fill="none" aria-hidden="true">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    Planejar seu Cuidado
                </button>
                <span id="schedule-desc" class="sr-only">Agende uma nova consulta</span>
            </div>
        </div>
    `;
}

function renderIdentificationScreen() {
    return `
        <div class="screen" role="main" aria-labelledby="identification-title">
            <h2 id="identification-title" class="animate-fade-in-stagger-1">
                <svg class="feather-icon feather-icon-medium" viewBox="0 0 24 24" stroke="currentColor" fill="none" aria-hidden="true">
                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
                </svg>
                Identificação Segura
            </h2>
            <p class="animate-fade-in-stagger-2">Por favor, insira seu CPF para continuar com segurança.</p>
            <p class="subtitle animate-fade-in-stagger-2">Seus dados estão protegidos conosco</p>
            
            <div class="demo-hint animate-fade-in-stagger-2">
                <p>
                    <svg class="feather-icon feather-icon-small" viewBox="0 0 24 24" stroke="currentColor" fill="none" aria-hidden="true">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M9,12l2,2 4,-4"/>
                    </svg>
                    <strong>Para testar a demonstração, use:</strong>
                </p>
                <p class="demo-cpf">123.456.789-01</p>
            </div>
            
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
            <!-- Ilustração de sucesso com elementos de celebração suave -->
            <div class="animate-fade-in-stagger-1">
                <svg class="completion-illustration" viewBox="0 0 300 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Processo concluído com sucesso">
                    <defs>
                        <linearGradient id="successGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#80BBA2;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#5C5B7C;stop-opacity:0.8" />
                        </linearGradient>
                        <linearGradient id="celebrationGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#E9EFFF;stop-opacity:0.9" />
                            <stop offset="100%" style="stop-color:#F8F4F2;stop-opacity:0.7" />
                        </linearGradient>
                    </defs>
                    
                    <!-- Formas orgânicas de celebração -->
                    <ellipse cx="150" cy="125" rx="100" ry="60" fill="url(#celebrationGradient)" class="icon-breathe"/>
                    <circle cx="80" cy="80" r="8" fill="#80BBA2" opacity="0.6" class="gentle-float"/>
                    <circle cx="220" cy="70" r="6" fill="#80BBA2" opacity="0.4" class="gentle-float" style="animation-delay: 0.5s"/>
                    <circle cx="70" cy="170" r="5" fill="#80BBA2" opacity="0.5" class="gentle-float" style="animation-delay: 1s"/>
                    <circle cx="230" cy="180" r="7" fill="#80BBA2" opacity="0.6" class="gentle-float" style="animation-delay: 1.5s"/>
                    
                    <!-- Ícone principal de sucesso -->
                    <circle cx="150" cy="125" r="35" fill="url(#successGradient)" class="icon-breathe"/>
                    <g stroke="white" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="130,125 145,140 170,110" class="draw-check"/>
                    </g>
                    
                    <!-- Elementos decorativos -->
                    <path d="M120 90 Q150 85 180 90" stroke="#80BBA2" stroke-width="2" fill="none" opacity="0.4"/>
                    <path d="M120 160 Q150 165 180 160" stroke="#80BBA2" stroke-width="2" fill="none" opacity="0.4"/>
                </svg>
            </div>
            
            <h2 id="completion-title" class="animate-fade-in-stagger-2">
                <svg class="feather-icon feather-icon-medium" viewBox="0 0 24 24" stroke="currentColor" fill="none" aria-hidden="true">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Tudo pronto, ${patientName}!
            </h2>
            <p class="animate-fade-in-stagger-3">
                ${isNewAppointment ? 'Sua consulta foi agendada com sucesso.' : 'Seu check-in foi realizado com sucesso.'}
            </p>
            <p class="subtitle animate-fade-in-stagger-3">
                ${isNewAppointment ? 'Você receberá uma confirmação por SMS' : 'Dirija-se à sala de espera • Aguarde ser chamado'}
            </p>
            <p class="animate-fade-in-stagger-4">
                <svg class="feather-icon feather-icon-small" viewBox="0 0 24 24" stroke="currentColor" fill="none" aria-hidden="true">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                </svg>
                Desejamos uma experiência tranquila e acolhedora!
            </p>
            <div class="button-group animate-fade-in-stagger-5">
                <button class="primary-button" id="finish-session" aria-describedby="finish-help">
                    <svg class="feather-icon feather-icon-small" viewBox="0 0 24 24" stroke="currentColor" fill="none" aria-hidden="true">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                        <polyline points="9,22 9,12 15,12 15,22"/>
                    </svg>
                    Finalizar Sessão
                </button>
                <span id="finish-help" class="sr-only">Retornar à tela inicial para outro atendimento</span>
            </div>
        </div>
    `;
}

function renderReasonScreen() {
    return `
        <div class="screen">
            <h2 class="animate-fade-in-stagger-1">
                <svg class="feather-icon feather-icon-medium" viewBox="0 0 24 24" stroke="currentColor" fill="none" aria-hidden="true">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                Novo Agendamento
            </h2>
            <p class="animate-fade-in-stagger-2">Qual o motivo da sua consulta?</p>
            <p class="subtitle animate-fade-in-stagger-2">Selecione a especialidade desejada</p>
            <div class="reason-grid animate-fade-in-stagger-3">
                <div class="reason-card" data-reason="Consulta de Rotina">
                    <svg class="feather-icon feather-icon-medium" viewBox="0 0 24 24" stroke="currentColor" fill="none" aria-hidden="true">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                    </svg>
                    <h3>Consulta de Rotina</h3>
                    <p>Acompanhamento periódico de saúde e bem-estar.</p>
                </div>
                <div class="reason-card" data-reason="Terapia">
                    <svg class="feather-icon feather-icon-medium" viewBox="0 0 24 24" stroke="currentColor" fill="none" aria-hidden="true">
                        <path d="M9 12l2 2 4-4"/>
                        <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                        <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                        <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3"/>
                        <path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3"/>
                    </svg>
                    <h3>Terapia</h3>
                    <p>Sessões de psicoterapia e apoio emocional.</p>
                </div>
                <div class="reason-card" data-reason="Acupuntura">
                    <svg class="feather-icon feather-icon-medium" viewBox="0 0 24 24" stroke="currentColor" fill="none" aria-hidden="true">
                        <circle cx="12" cy="12" r="10"/>
                        <circle cx="12" cy="12" r="6"/>
                        <circle cx="12" cy="12" r="2"/>
                    </svg>
                    <h3>Acupuntura</h3>
                    <p>Tratamento natural para alívio de dores.</p>
                </div>
                 <div class="reason-card" data-reason="Nutrição">
                    <svg class="feather-icon feather-icon-medium" viewBox="0 0 24 24" stroke="currentColor" fill="none" aria-hidden="true">
                        <circle cx="12" cy="8" r="7"/>
                        <polyline points="8.21,13.89 7,23 17,23 15.79,13.88"/>
                    </svg>
                    <h3>Nutrição</h3>
                    <p>Orientação nutricional personalizada.</p>
                </div>
            </div>
             <div class="button-group animate-fade-in-stagger-4">
                <button class="back-button" id="back-to-welcome">
                    <svg class="feather-icon feather-icon-small" viewBox="0 0 24 24" stroke="currentColor" fill="none" aria-hidden="true">
                        <line x1="19" y1="12" x2="5" y2="12"/>
                        <polyline points="12,19 5,12 12,5"/>
                    </svg>
                    Voltar
                </button>
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
            <h2 class="animate-fade-in-stagger-1">
                <svg class="feather-icon feather-icon-medium" viewBox="0 0 24 24" stroke="currentColor" fill="none" aria-hidden="true">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                Nossos Especialistas
            </h2>
            <p class="subtitle animate-fade-in-stagger-1">Profissionais qualificados para seu cuidado</p>
            <div class="specialists-list animate-fade-in-stagger-2">
                <div class="specialist-item">
                    <div class="specialist-name">
                        <svg class="feather-icon feather-icon-small" viewBox="0 0 24 24" stroke="currentColor" fill="none" aria-hidden="true">
                            <path d="M9 12l2 2 4-4"/>
                            <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                            <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                            <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3"/>
                            <path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3"/>
                        </svg>
                        Dr. Carlos Pereira
                    </div>
                    <div class="specialist-info">Psicólogo • Especialista em Terapia Cognitivo-Comportamental</div>
                    <div class="specialist-info">CRP 12345 • 8 anos de experiência</div>
                </div>
                <div class="specialist-item">
                    <div class="specialist-name">
                        <svg class="feather-icon feather-icon-small" viewBox="0 0 24 24" stroke="currentColor" fill="none" aria-hidden="true">
                            <circle cx="12" cy="8" r="7"/>
                            <polyline points="8.21,13.89 7,23 17,23 15.79,13.88"/>
                        </svg>
                        Dra. Ana Souza
                    </div>
                    <div class="specialist-info">Nutricionista • Foco in reeducação alimentar</div>
                    <div class="specialist-info">CRN 67890 • 6 anos de experiência</div>
                </div>
                <div class="specialist-item">
                    <div class="specialist-name">
                        <svg class="feather-icon feather-icon-small" viewBox="0 0 24 24" stroke="currentColor" fill="none" aria-hidden="true">
                            <circle cx="12" cy="12" r="10"/>
                            <circle cx="12" cy="12" r="6"/>
                            <circle cx="12" cy="12" r="2"/>
                        </svg>
                        Dr. Marcos Lima
                    </div>
                    <div class="specialist-info">Acupunturista • Especialista em dor crônica</div>
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
    
    // CPFs de teste válidos para demonstração
    const testCPFs = [
        '12345678901', // CPF de teste simples
        '11111111111', // Para facilitar testes
        '00000000000', // Para demonstração
        '12312312312'  // Outro CPF de teste
    ];
    
    if (testCPFs.includes(cpf)) {
        return true;
    }
    
    // Validação real de CPF
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

// ========================================
// SISTEMA DE ANIMAÇÕES AVANÇADAS - GSAP
// ========================================

class OrganicAnimations {
    constructor() {
        this.isGSAPLoaded = typeof gsap !== 'undefined';
        this.isSplittingLoaded = typeof Splitting !== 'undefined';
        this.currentTimeline = null;
        
        if (this.isGSAPLoaded) {
            // Configurações mais suaves para GSAP
            gsap.config({ 
                nullTargetWarn: false,
                trialWarn: false 
            });
            gsap.defaults({ 
                ease: "power1.out", 
                duration: 0.6 
            });
        }
    }

    // Animação de transição de tela simplificada e suave
    screenTransition(exitElement, enterElement, direction = 'right') {
        if (!this.isGSAPLoaded || !exitElement || !enterElement) {
            return this.fallbackTransition(exitElement, enterElement);
        }

        const tl = gsap.timeline();

        // Saída simples e suave
        tl.to(exitElement, {
            opacity: 0,
            y: -20,
            duration: 0.3,
            ease: "power1.in"
        });

        // Entrada suave e natural
        tl.fromTo(enterElement, 
            {
                opacity: 0,
                y: 20
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: "power1.out"
            }, 
            "-=0.1"
        );

        return tl;
    }

    // Animação de texto mais sutil e natural
    revealText(element, delay = 0) {
        if (!this.isSplittingLoaded || !element) {
            // Fallback simples
            if (this.isGSAPLoaded) {
                gsap.fromTo(element, 
                    { opacity: 0, y: 10 },
                    { opacity: 1, y: 0, duration: 0.6, delay: delay }
                );
            }
            return;
        }

        // Divide o texto em palavras (mais suave que caracteres)
        const results = Splitting({ target: element, by: 'words' });
        
        if (results && results[0]) {
            const words = results[0].words;
            
            if (this.isGSAPLoaded) {
                gsap.fromTo(words, 
                    {
                        opacity: 0,
                        y: 15
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.4,
                        stagger: 0.08,
                        delay: delay,
                        ease: "power1.out"
                    }
                );
            }
        }
    }

    // Feedback interativo mais sutil para botões
    interactiveFeedback(element) {
        if (!this.isGSAPLoaded || !element) return;

        const icon = element.querySelector('.feather-icon');
        
        // Hover simples e elegante
        element.addEventListener('mouseenter', () => {
            gsap.to(element, {
                y: -2,
                scale: 1.01,
                duration: 0.2,
                ease: "power1.out"
            });
            
            if (icon) {
                gsap.to(icon, {
                    scale: 1.1,
                    duration: 0.2,
                    ease: "power1.out"
                });
            }
        });

        element.addEventListener('mouseleave', () => {
            gsap.to(element, {
                y: 0,
                scale: 1,
                duration: 0.2,
                ease: "power1.out"
            });
            
            if (icon) {
                gsap.to(icon, {
                    scale: 1,
                    duration: 0.2,
                    ease: "power1.out"
                });
            }
        });
        
        // Click feedback muito sutil
        element.addEventListener('click', () => {
            gsap.to(element, {
                scale: 0.98,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: "power1.inOut"
            });
        });
    }

    // Animação de entrada em cascata mais suave
    cascadeIn(elements, startDelay = 0) {
        if (!this.isGSAPLoaded || !elements.length) return;

        gsap.fromTo(elements,
            {
                opacity: 0,
                y: 20
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.1,
                delay: startDelay,
                ease: "power1.out"
            }
        );
    }

    // Animação de respiração mais sutil
    organicBreathe(element) {
        if (!this.isGSAPLoaded || !element) return;

        gsap.to(element, {
            scale: 1.02,
            duration: 3,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1
        });
    }

    // Fallback para quando GSAP não está disponível
    fallbackTransition(exitElement, enterElement) {
        if (exitElement) {
            exitElement.style.opacity = '0';
            exitElement.style.transform = 'translateX(-20px)';
        }
        
        if (enterElement) {
            setTimeout(() => {
                enterElement.style.opacity = '1';
                enterElement.style.transform = 'translateX(0)';
            }, 200);
        }
    }
}

// Instância global das animações
const organicAnimations = new OrganicAnimations();

// Função utilitária para criar divisores orgânicos
function createOrganicDivider() {
    return `
        <div class="organic-divider">
            <svg viewBox="0 0 400 40" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="dividerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style="stop-color:#5C5B7C;stop-opacity:0" />
                        <stop offset="20%" style="stop-color:#80BBA2;stop-opacity:0.3" />
                        <stop offset="50%" style="stop-color:#80BBA2;stop-opacity:0.6" />
                        <stop offset="80%" style="stop-color:#80BBA2;stop-opacity:0.3" />
                        <stop offset="100%" style="stop-color:#5C5B7C;stop-opacity:0" />
                    </linearGradient>
                </defs>
                <path d="M0 20 Q100 10 200 20 Q300 30 400 20" stroke="url(#dividerGradient)" stroke-width="2" fill="none"/>
                <path d="M0 25 Q100 15 200 25 Q300 35 400 25" stroke="url(#dividerGradient)" stroke-width="1" fill="none" opacity="0.5"/>
            </svg>
        </div>
    `;
}

// Inicia a aplicação
render();
