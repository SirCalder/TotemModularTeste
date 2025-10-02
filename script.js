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

// Dados dos profissionais
const specialists = [
    {
        id: 1,
        name: 'Dra. Helena Costa',
        gender: 'Feminino',
        specialty: 'Psicologia Clínica',
        description: 'Especialista em terapia cognitivo-comportamental e atendimento de ansiedade',
        photo: '👩‍⚕️',
        price: 180.00,
        availableDays: [1, 2, 3, 4, 5], // Segunda a Sexta
        availableHours: ['08:00', '09:00', '10:00', '14:00', '15:00', '16:00']
    },
    {
        id: 2,
        name: 'Dr. Carlos Mendes',
        gender: 'Masculino',
        specialty: 'Psicologia',
        description: 'Atendimento a adultos e adolescentes, especialista em desenvolvimento pessoal',
        photo: '👨‍⚕️',
        price: 180.00,
        availableDays: [0, 2, 4], // Domingo, Terça, Quinta
        availableHours: ['09:00', '10:00', '11:00', '14:00', '15:00']
    },
    {
        id: 3,
        name: 'Dra. Ana Souza',
        gender: 'Feminino',
        specialty: 'Nutrição',
        description: 'Nutricionista especializada em reeducação alimentar e nutrição esportiva',
        photo: '👩‍⚕️',
        price: 150.00,
        availableDays: [1, 3, 5], // Segunda, Quarta, Sexta
        availableHours: ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00']
    },
    {
        id: 4,
        name: 'Dr. Roberto Silva',
        gender: 'Masculino',
        specialty: 'Acupuntura',
        description: 'Acupunturista com 15 anos de experiência em medicina tradicional chinesa',
        photo: '👨‍⚕️',
        price: 120.00,
        availableDays: [2, 3, 4], // Terça, Quarta, Quinta
        availableHours: ['08:00', '10:00', '14:00', '16:00', '17:00']
    }
];

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
    
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = screenContent;
    const newElement = tempDiv.firstElementChild;
    
    if (currentElement && organicAnimations.isGSAPLoaded) {
        // CRITICAL: Limpa TODAS as telas antigas antes de adicionar nova
        const allScreens = app.querySelectorAll('.screen');
        console.log(`[DEBUG] Telas encontradas antes da limpeza: ${allScreens.length}`);
        
        allScreens.forEach(screen => {
            if (screen !== currentElement) {
                console.log('[DEBUG] Removendo tela fantasma');
                screen.remove(); // Remove telas fantasma
            }
        });
        
        // Posiciona nova tela absolutamente durante transição
        gsap.set(newElement, { 
            position: 'absolute',
            top: 0,
            left: '50%',
            xPercent: -50,
            width: '100%',
            maxWidth: '600px',
            opacity: 0,
            y: 30
        });
        
        app.appendChild(newElement);
        
        // Executa a transição
        organicAnimations.screenTransition(currentElement, newElement)
            .eventCallback("onComplete", () => {
                // Remove tela antiga
                if (currentElement && currentElement.parentNode) {
                    currentElement.remove();
                }
                
                // Reseta posicionamento da nova tela
                gsap.set(newElement, { 
                    clearProps: 'position,top,left,xPercent,width,maxWidth'
                });
                
                addEventListeners();
                applyAdvancedAnimations();
            });
    } else {
        // Primeira renderização ou fallback - limpa tudo
        app.innerHTML = screenContent;
        addEventListeners();
        applyAdvancedAnimations();
    }
}

// Função para aplicar animações suaves após renderização
function applyAdvancedAnimations() {
    requestAnimationFrame(() => {
        if (!organicAnimations.isGSAPLoaded) return;

        // Animação de entrada para os elementos da tela
        const elementsToAnimate = document.querySelectorAll('h1, h2, p, .button-group, .reason-grid, .specialists-selection, .calendar-container, .identification-form');
        organicAnimations.cascadeIn(Array.from(elementsToAnimate), 0.1);

        // Animação de respiração para a ilustração principal
        const heroIllustration = document.querySelector('.hero-illustration');
        if (heroIllustration) {
            organicAnimations.organicBreathe(heroIllustration);
        }
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
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                </svg>
                Bem-vindo! Vamos começar
            </h2>
            <p class="animate-fade-in-stagger-2">Para cuidar melhor de você, precisamos te conhecer</p>
            <p class="subtitle animate-fade-in-stagger-2">Suas informações estão seguras conosco</p>
            
            <div class="demo-hint animate-fade-in-stagger-2">
                <p>
                    <svg class="feather-icon feather-icon-small" viewBox="0 0 24 24" stroke="currentColor" fill="none" aria-hidden="true">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M9,12l2,2 4,-4"/>
                    </svg>
                    <strong>Para demonstração, use nome "João Silva" e data 01/01/1990</strong>
                </p>
            </div>
            
            <div class="identification-form animate-fade-in-stagger-3">
                <div class="input-container">
                    <label for="name-input" class="input-label">SEU NOME COMPLETO</label>
                    <input 
                        type="text" 
                        id="name-input" 
                        class="input-field" 
                        placeholder="DIGITE SEU NOME" 
                        aria-required="true"
                        autocomplete="name"
                    >
                    <div class="input-aura"></div>
                </div>
                
                <div class="input-container">
                    <label for="birth-date-input" class="input-label">DATA DE NASCIMENTO</label>
                    <input 
                        type="text" 
                        id="birth-date-input" 
                        class="input-field" 
                        placeholder="DD/MM/AAAA"
                        maxlength="10"
                        aria-required="true"
                        autocomplete="bday"
                        inputmode="numeric"
                    >
                    <div class="input-aura"></div>
                </div>
                
                <div class="input-container">
                    <label for="cpf-input" class="input-label">CPF (PARA VALIDAÇÃO)</label>
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
                    <p id="cpf-help" class="input-hint">USAMOS SEU CPF APENAS PARA CONFIRMAR SUA IDENTIDADE</p>
                </div>
            </div>
            
            <div class="button-group animate-fade-in-stagger-4" role="group">
                <button class="action-button" id="submit-id" aria-describedby="submit-help">
                    ✓ CONTINUAR
                </button>
                <span id="submit-help" class="sr-only">Confirmar dados e prosseguir</span>
                <button class="back-button" id="back-to-welcome">
                    ← VOLTAR
                </button>
            </div>
        </div>
    `;
}

function renderConfirmationScreen() {
    const { appointment, id, name } = state.userData;
    const isNewAppointment = id === 'Novo Agendamento';
    const patientName = isNewAppointment ? (name || 'NOVO PACIENTE') : name;
    const appointmentPrice = appointment.price || 150.00;
    
    return `
        <div class="screen" role="main" aria-labelledby="confirmation-title">
            <h2 id="confirmation-title" class="animate-fade-in-stagger-1">
                ✨ ${isNewAppointment ? 'CONFIRME SEU AGENDAMENTO' : `OLÁ, ${patientName.split(' ')[0].toUpperCase()}!`}
            </h2>
            <p class="subtitle animate-fade-in-stagger-1">
                ${isNewAppointment ? 'REVISE OS DADOS DO SEU NOVO AGENDAMENTO' : 'CONFIRME OS DADOS DA SUA CONSULTA'}
            </p>
            <div class="confirmation-details animate-fade-in-stagger-2" role="region" aria-labelledby="appointment-details">
                <h3 id="appointment-details" class="sr-only">DETALHES DO AGENDAMENTO</h3>
                <p><strong>👤 PACIENTE:</strong> ${patientName.toUpperCase()}</p>
                <p><strong>🩺 TIPO:</strong> ${appointment.type.toUpperCase()}</p>
                <p><strong>👨‍⚕️ PROFISSIONAL:</strong> ${appointment.doctor.toUpperCase()}</p>
                ${appointment.date ? `<p><strong>📅 DATA:</strong> ${appointment.date.toUpperCase()}</p>` : ''}
                <p><strong>🕐 HORÁRIO:</strong> ${appointment.time}</p>
                ${!isNewAppointment ? `<p><strong>📍 SALA:</strong> ${Math.floor(Math.random() * 10) + 1}</p>` : ''}
                <p class="price-highlight"><strong>💰 VALOR:</strong> R$ ${appointmentPrice.toFixed(2)}</p>
            </div>
            <div class="button-group animate-fade-in-stagger-3" role="group">
                <button class="action-button" id="confirm-appointment">
                    💳 CONFIRMAR E PAGAR
                </button>
                <button class="back-button" id="back-from-confirmation">
                    ← VOLTAR
                </button>
            </div>
             <button class="secondary-button animate-fade-in-stagger-4" id="view-profile">
                 👨‍⚕️ VER PERFIL DO PROFISSIONAL
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
                    <h3>CONSULTA DE ROTINA</h3>
                    <p>ACOMPANHAMENTO PERIÓDICO DE SAÚDE E BEM-ESTAR.</p>
                    <p class="reason-price">A PARTIR DE R$ 150,00</p>
                </div>
                <div class="reason-card" data-reason="Terapia">
                    <svg class="feather-icon feather-icon-medium" viewBox="0 0 24 24" stroke="currentColor" fill="none" aria-hidden="true">
                        <path d="M9 12l2 2 4-4"/>
                        <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                        <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                        <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3"/>
                        <path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3"/>
                    </svg>
                    <h3>TERAPIA</h3>
                    <p>SESSÕES DE PSICOTERAPIA E APOIO EMOCIONAL.</p>
                    <p class="reason-price">A PARTIR DE R$ 180,00</p>
                </div>
                <div class="reason-card" data-reason="Acupuntura">
                    <svg class="feather-icon feather-icon-medium" viewBox="0 0 24 24" stroke="currentColor" fill="none" aria-hidden="true">
                        <circle cx="12" cy="12" r="10"/>
                        <circle cx="12" cy="12" r="6"/>
                        <circle cx="12" cy="12" r="2"/>
                    </svg>
                    <h3>ACUPUNTURA</h3>
                    <p>TRATAMENTO NATURAL PARA ALÍVIO DE DORES.</p>
                    <p class="reason-price">A PARTIR DE R$ 120,00</p>
                </div>
                 <div class="reason-card" data-reason="Nutrição">
                    <svg class="feather-icon feather-icon-medium" viewBox="0 0 24 24" stroke="currentColor" fill="none" aria-hidden="true">
                        <circle cx="12" cy="8" r="7"/>
                        <polyline points="8.21,13.89 7,23 17,23 15.79,13.88"/>
                    </svg>
                    <h3>NUTRIÇÃO</h3>
                    <p>ORIENTAÇÃO NUTRICIONAL PERSONALIZADA.</p>
                    <p class="reason-price">A PARTIR DE R$ 150,00</p>
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
    const selectedSpecialty = state.newAppointment.type || 'Psicologia';
    const filteredSpecialists = specialists.filter(s => 
        s.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase())
    );
    
    const availableSpecialists = filteredSpecialists.length > 0 ? filteredSpecialists : specialists;
    
    return `
        <div class="screen">
            <h2 class="animate-fade-in-stagger-1">ESCOLHA SEU PROFISSIONAL</h2>
            <p class="animate-fade-in-stagger-2">SELECIONE O PROFISSIONAL E VEJA OS HORÁRIOS DISPONÍVEIS</p>
            
            <div class="specialists-selection animate-fade-in-stagger-3">
                ${availableSpecialists.map(specialist => `
                    <div class="specialist-card" data-specialist-id="${specialist.id}" tabindex="0" role="button">
                        <div class="specialist-photo">${specialist.photo}</div>
                        <div class="specialist-info">
                            <h3>${specialist.name}</h3>
                            <p class="specialist-specialty">${specialist.specialty}</p>
                            <p class="specialist-gender">GÊNERO: ${specialist.gender.toUpperCase()}</p>
                            <p class="specialist-price">R$ ${specialist.price.toFixed(2)}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div id="calendar-container" class="calendar-container" style="display: none;">
                <!-- O calendário será inserido aqui dinamicamente -->
            </div>
            
            <div class="button-group animate-fade-in-stagger-4">
                <button class="back-button" id="back-to-reason">← VOLTAR</button>
            </div>
            <button class="secondary-button animate-fade-in-stagger-5" id="view-specialists">VER TODOS OS ESPECIALISTAS</button>
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
                NOSSOS ESPECIALISTAS
            </h2>
            <p class="subtitle animate-fade-in-stagger-1">PROFISSIONAIS QUALIFICADOS PARA SEU CUIDADO</p>
            <div class="specialists-grid animate-fade-in-stagger-2">
                ${specialists.map(specialist => `
                    <div class="specialist-detail-card">
                        <div class="specialist-photo-large">${specialist.photo}</div>
                        <div class="specialist-details">
                            <h3>${specialist.name.toUpperCase()}</h3>
                            <p class="specialist-specialty">${specialist.specialty.toUpperCase()}</p>
                            <p class="specialist-gender">
                                <strong>GÊNERO:</strong> ${specialist.gender.toUpperCase()}
                            </p>
                            <p class="specialist-description">${specialist.description.toUpperCase()}</p>
                            <p class="specialist-price-large">
                                <strong>VALOR DA CONSULTA:</strong><br>
                                R$ ${specialist.price.toFixed(2)}
                            </p>
                            <p class="specialist-availability">
                                <strong>DIAS DISPONÍVEIS:</strong><br>
                                ${getDayNames(specialist.availableDays).join(', ').toUpperCase()}
                            </p>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="button-group animate-fade-in-stagger-3">
                <button class="back-button" id="back-from-specialists">← VOLTAR</button>
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
        const nameInput = document.getElementById('name-input');
        const birthDateInput = document.getElementById('birth-date-input');
        const cpfInput = document.getElementById('cpf-input');
        
        const name = nameInput?.value.trim();
        const birthDate = birthDateInput?.value;
        const cpf = cpfInput?.value;
        
        // Limpa erros anteriores
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        
        // Validação de campos
        if (!name || name.length < 3) {
            showError(nameInput, 'POR FAVOR, DIGITE SEU NOME COMPLETO');
            nameInput.focus();
            return;
        }
        
        if (!isValidBirthDate(birthDate)) {
            showError(birthDateInput, 'DATA INVÁLIDA. USE O FORMATO DD/MM/AAAA');
            birthDateInput.style.animation = 'shake 0.5s ease-in-out';
            birthDateInput.focus();
            return;
        }
        
        if (!isValidCPF(cpf)) {
            showError(cpfInput, 'POR FAVOR, INSIRA UM CPF VÁLIDO');
            cpfInput.style.animation = 'shake 0.5s ease-in-out';
            cpfInput.focus();
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
                    id: cpf,
                    name: name, // Usa o nome inserido
                    birthDate: birthDate
                };
                changeScreen(Screen.CONFIRMATION);
            } else {
                throw new Error('NÃO CONSEGUIMOS VALIDAR SEUS DADOS. TENTE NOVAMENTE.');
            }
        }, 'VERIFICANDO SEUS DADOS...');
    });
    
    document.getElementById('back-to-welcome')?.addEventListener('click', () => changeScreen(Screen.WELCOME));
    
    // Adiciona máscaras para os campos
    const nameInput = document.getElementById('name-input');
    if (nameInput) {
        nameInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.toUpperCase();
        });
    }
    
    const birthDateInput = document.getElementById('birth-date-input');
    if (birthDateInput) {
        birthDateInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2);
            }
            if (value.length >= 5) {
                value = value.substring(0, 5) + '/' + value.substring(5, 9);
            }
            e.target.value = value;
        });
    }
    
    const cpfInput = document.getElementById('cpf-input');
    if (cpfInput) {
        cpfInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            e.target.value = value;
        });
        
        // Enter para submit em qualquer campo
        [nameInput, birthDateInput, cpfInput].forEach(input => {
            input?.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    document.getElementById('submit-id')?.click();
                }
            });
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

    // Scheduling Screen - Seleção de especialistas
    document.querySelectorAll('.specialist-card').forEach(card => {
        const handleSpecialistSelect = () => {
            const specialistId = parseInt(card.dataset.specialistId);
            state.newAppointment.specialistId = specialistId;
            
            // Remove seleção anterior
            document.querySelectorAll('.specialist-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            
            // Mostra o calendário
            const calendarContainer = document.getElementById('calendar-container');
            calendarContainer.innerHTML = generateCalendar(specialistId);
            calendarContainer.style.display = 'block';
            
            // Adiciona listeners para os dias do calendário
            setTimeout(() => addCalendarListeners(specialistId), 100);
        };
        
        card.addEventListener('click', handleSpecialistSelect);
        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleSpecialistSelect();
            }
        });
    });
    
    document.getElementById('back-to-reason')?.addEventListener('click', () => changeScreen(Screen.REASON));
    document.getElementById('view-specialists')?.addEventListener('click', () => changeScreen(Screen.SPECIALISTS));

    // Profile, Specialists, FAQ Screens
    document.getElementById('back-from-profile')?.addEventListener('click', () => changeScreen(state.previousScreen));
    document.getElementById('back-from-specialists')?.addEventListener('click', () => changeScreen(state.previousScreen));
    document.getElementById('back-from-faq')?.addEventListener('click', () => changeScreen(state.previousScreen));
}

function addCalendarListeners(specialistId) {
    // Listeners para os dias do calendário
    document.querySelectorAll('.calendar-day.available').forEach(dayElement => {
        const handleDaySelect = () => {
            const selectedDate = dayElement.dataset.date;
            state.newAppointment.date = selectedDate;
            
            // Remove seleção anterior
            document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
            dayElement.classList.add('selected');
            
            // Mostra os horários disponíveis
            const timeSlotsContainer = document.getElementById('time-slots-container');
            timeSlotsContainer.innerHTML = generateTimeSlots(specialistId, selectedDate);
            timeSlotsContainer.style.display = 'block';
            
            // Adiciona listeners para os horários
            setTimeout(() => addTimeSlotListeners(specialistId), 100);
        };
        
        dayElement.addEventListener('click', handleDaySelect);
        dayElement.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleDaySelect();
            }
        });
    });
}

function addTimeSlotListeners(specialistId) {
    // Listeners para os slots de horário
    document.querySelectorAll('.time-slot').forEach(slot => {
        const handleTimeSelect = () => {
            const selectedTime = slot.dataset.time;
            state.newAppointment.time = selectedTime;
            
            // Remove seleção anterior
            document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
            slot.classList.add('selected');
        };
        
        slot.addEventListener('click', handleTimeSelect);
        slot.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleTimeSelect();
            }
        });
    });
    
    // Listener para o botão de confirmação
    document.getElementById('confirm-schedule-button')?.addEventListener('click', () => {
        if (!state.newAppointment.date || !state.newAppointment.time) {
            alert('POR FAVOR, SELECIONE UMA DATA E HORÁRIO');
            return;
        }
        
        const specialist = specialists.find(s => s.id === specialistId);
        const date = new Date(state.newAppointment.date);
        
        state.userData = {
            id: 'Novo Agendamento',
            name: state.userData?.name || 'Novo Paciente',
            appointment: {
                doctor: specialist.name,
                time: state.newAppointment.time,
                date: date.toLocaleDateString('pt-BR'),
                type: state.newAppointment.type || 'Consulta',
                price: specialist.price
            },
        };
        changeScreen(Screen.CONFIRMATION);
    });
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

function isValidBirthDate(dateStr) {
    if (!dateStr || dateStr.length !== 10) return false;
    
    const parts = dateStr.split('/');
    if (parts.length !== 3) return false;
    
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);
    
    // Validação básica
    if (day < 1 || day > 31) return false;
    if (month < 1 || month > 12) return false;
    if (year < 1900 || year > new Date().getFullYear()) return false;
    
    // Cria data e valida
    const date = new Date(year, month - 1, day);
    if (date.getDate() !== day || date.getMonth() !== month - 1 || date.getFullYear() !== year) {
        return false;
    }
    
    // Verifica se não é futura
    if (date > new Date()) return false;
    
    return true;
}

function getDayNames(dayNumbers) {
    const days = ['DOMINGO', 'SEGUNDA', 'TERÇA', 'QUARTA', 'QUINTA', 'SEXTA', 'SÁBADO'];
    return dayNumbers.map(num => days[num]);
}

function generateCalendar(specialistId) {
    const specialist = specialists.find(s => s.id === specialistId);
    if (!specialist) return '';
    
    const today = new Date();
    const calendar = [];
    
    // Gera os próximos 14 dias
    for (let i = 0; i < 14; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        
        const dayOfWeek = date.getDay();
        const isAvailable = specialist.availableDays.includes(dayOfWeek);
        
        calendar.push({
            date: date,
            dayOfWeek: dayOfWeek,
            isAvailable: isAvailable,
            dateString: date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
            dayName: getDayNames([dayOfWeek])[0].substring(0, 3)
        });
    }
    
    return `
        <div class="calendar-header">
            <h3>ESCOLHA O DIA DA CONSULTA</h3>
            <p class="selected-specialist-name">${specialist.name.toUpperCase()}</p>
            <p class="selected-specialist-price">VALOR: R$ ${specialist.price.toFixed(2)}</p>
        </div>
        <div class="calendar-days">
            ${calendar.map(day => `
                <div class="calendar-day ${day.isAvailable ? 'available' : 'unavailable'}" 
                     data-date="${day.date.toISOString()}"
                     ${day.isAvailable ? 'tabindex="0" role="button"' : ''}>
                    <div class="day-name">${day.dayName}</div>
                    <div class="day-date">${day.dateString}</div>
                </div>
            `).join('')}
        </div>
        <div id="time-slots-container" class="time-slots-container" style="display: none;">
            <!-- Os horários serão inseridos aqui -->
        </div>
    `;
}

function generateTimeSlots(specialistId, selectedDate) {
    const specialist = specialists.find(s => s.id === specialistId);
    if (!specialist) return '';
    
    return `
        <div class="time-slots-header">
            <h3>ESCOLHA O HORÁRIO</h3>
        </div>
        <div class="time-slots">
            ${specialist.availableHours.map(hour => `
                <div class="time-slot" data-time="${hour}" tabindex="0" role="button">
                    ${hour}
                </div>
            `).join('')}
        </div>
        <button class="action-button" id="confirm-schedule-button" style="margin-top: 20px;">
            ✓ CONFIRMAR AGENDAMENTO
        </button>
    `;
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
// SISTEMA DE ANIMAÇÕES REFINADO - GSAP
// ========================================

class OrganicAnimations {
    constructor() {
        this.isGSAPLoaded = typeof gsap !== 'undefined';
        
        if (this.isGSAPLoaded) {
            gsap.defaults({ 
                ease: "power2.out", 
                duration: 0.6 
            });
        }
    }

    /**
     * Transição de tela suave e elegante, focada em fluidez.
     * A tela antiga desliza para cima e desaparece, a nova desliza de baixo e aparece.
     */
    screenTransition(exitElement, enterElement) {
        if (!this.isGSAPLoaded) return this.fallbackTransition(exitElement, enterElement);

        const tl = gsap.timeline();

        // Animação de saída - valores absolutos
        tl.to(exitElement, {
            opacity: 0,
            y: -30,
            duration: 0.4,
            ease: "power2.in",
            onComplete: () => {
                // Remove IMEDIATAMENTE ao terminar animação de saída
                if (exitElement && exitElement.parentNode) {
                    exitElement.remove();
                }
            }
        });

        // Animação de entrada - valores absolutos para evitar acúmulo
        tl.fromTo(enterElement, 
            {
                opacity: 0,
                y: 30
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out",
                clearProps: "transform" // Limpa transform ao finalizar
            }, 
            "-=0.2" // Começa 0.2s antes da animação de saída terminar
        );

        return tl;
    }

    /**
     * Animação de entrada em cascata para múltiplos elementos (como cards).
     */
    cascadeIn(elements, delay = 0) {
        if (!this.isGSAPLoaded || !elements.length) return;

        gsap.from(elements, {
            opacity: 0,
            y: 20,
            duration: 0.5,
            stagger: 0.1, // Atraso entre cada elemento
            delay: delay,
        });
    }

    /**
     * Animação de "respiração" orgânica para elementos de destaque.
     */
    organicBreathe(element) {
        if (!this.isGSAPLoaded || !element) return;

        gsap.to(element, {
            scale: 1.03,
            duration: 4, // Ciclo longo e calmo
            ease: "sine.inOut",
            yoyo: true, // Vai e volta
            repeat: -1 // Infinitamente
        });
    }

    // Fallback simples se o GSAP não carregar
    fallbackTransition(exitElement, enterElement) {
        if (exitElement) exitElement.style.display = 'none';
        if (enterElement) enterElement.style.display = 'flex';
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
