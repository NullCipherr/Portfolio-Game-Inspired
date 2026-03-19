


export type Language = 'en' | 'pt-BR';

export const translations = {
    en: {
        nav: {
            home: "Home",
            about: "About",
            skills: "Skills",
            projects: "Projects",
            resume: "Resume",
            contact: "Contact",
            pinned: "Pinned",
            pin: "Pin Sidebar",
            config: "Configuration",
            switch_language: "Switch Language"
        },
        home: {
            roles: ["Software Engineer", "Game Developer", "AI Enthusiast"],
            initializing: "INITIALIZING PORTFOLIO_V2.0",
            intro: "Architecting immersive digital realities and robust software solutions. Specialized in the convergence of high-performance code and interactive design.",
            btn_contact: "Initialize Contact",
            btn_projects: "Access Projects",
            stats: {
                level: "Level",
                class: "Class",
                exp: "Exp",
                mana: "Mana"
            }
        },
        about: {
            title: "> About Me",
            label: "Profile",
            p1: "My fascination with technology began not in a classroom, but in the vibrant, limitless worlds of video games. This passion for creation led me on a unique path from designing immersive 3D levels to architecting complex software solutions. At 17, I dove headfirst into the professional world at a startup, starting as a 3D game level designer.",
            p2: "This hands-on experience was the perfect prelude to my formal education in Computer Science at the State University of Maringá (UEM). There, I built a strong theoretical foundation, delving into algorithm analysis, artificial intelligence, and cryptography, which complemented and enriched my practical skills.",
            p3: "Currently, I'm channeling my expertise into developing systems that leverage AI and Machine Learning to address challenges in the field of Psychology. It's incredibly rewarding to apply cutting-edge technology to create tools that can genuinely help people."
        },
        skills: {
            title: "> What I do",
            label: "Skills",
            desc: "With a strong foundation in computer science and a passion for creative problem-solving, I specialize in building robust applications and immersive digital experiences."
        },
        projects: {
            title: "> Projects",
            subtitle: "Deployed systems and experimental prototypes.",
            status: {
                live: "Live",
                beta: "Beta",
                prototype: "Prototype"
            },
            view_project: "// VIEW_PROJECT",
            back: "Back to",
            overview: "Project Overview",
            tech_stack: "Technologies",
            links: {
                live: "Live Demo",
                code: "View Code"
            }
        },
        resume: {
            label: "Resume",
            title: "> Career Journey",
            p1: "Find out more about my skills, experience, and education.",
            p2: "Download my resume to learn more about my professional journey and the skills I have developed over the years. In it, I share the experiences that contributed to my growth and the skills that I have been improving with dedication. I hope this information can show you how I can be useful and contribute to the success of your team or project.",
            btn: "Download CV"
        },
        contact: {
            label: "Contact",
            title: "> Get in Touch",
            desc: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of an ambitious team. Feel free to initiate a transmission across the void.",
            social: {
                github: "GitHub Profile",
                linkedin: "LinkedIn Network",
                email: "Direct Email"
            },
            form: {
                header: "Secure Channel Open",
                name_label: "IDENTITY_ID",
                email_label: "RETURN_ADDRESS",
                message_label: "PACOTE_DADOS",
                btn_idle: "Initialize Upload",
                btn_sending: "TRANSMITTING...",
                btn_sent: "Upload Complete"
            }
        },
        footer: {
            tagline: "Architecting immersive digital realities and robust software solutions.",
            rights: "ALL RIGHTS RESERVED.",
            nav_title: "Navigation",
            connect_title: "Connect"
        },
        settings: {
            label: "Config",
            title: "> System Interface",
            desc: "Calibrate your visual and auditory experience.",
            appearance: { title: "Appearance", desc: "Customize the system accent colors.", ecosystem_title: "Color Ecosystem", texture_title: "Environment Texture", component_title: "Component Styling", tint_title: "Component Tint", opacity_title: "Glass Opacity", blur_title: "Blur Intensity", border_title: "Border Aesthetic", border_theme: "TEMA", border_neutral: "NEUTRAL" },
            graphics: { title: "Graphics", desc: "Adjust rendering quality.", particles_title: "Particle System", particles_desc: "Render background particles.", density_title: "Particle Density", density_low: "Low", density_medium: "Medium", density_high: "High" },
            audio: { title: "Audio & Language", desc: "Manage system sounds.", sound_title: "UI Sound Effects", sound_desc: "Play sounds on events.", volume_title: "Master Volume", language_title: "System Language" },
            interface: { title: "Interface", desc: "Input and Navigation controls.", scroll_mode_title: "Scroll Mode", scroll_mode_desc: "Toggle between cinematic snap scroll or native free scroll.", mode_cinematic: "Cinematic", mode_free: "Free Scroll", snap_style_title: "Snap Behavior", snap_style_desc: "Choose a softer snap or a strict section lock.", snap_style_soft: "Soft Snap", snap_style_strict: "Strict Snap" },
            system: { title: "System Info", desc: "Hardware detection.", resolution: "Resolution", cores: "CPU Cores", platform: "Platform", memory: "Memory", userAgent: "USER_AGENT:" }
        },
        saveConfirmation: {
            title: "SYSTEM CALIBRATED",
            message: "User preferences synchronized locally."
        }
    },
    "pt-BR": {
        nav: {
            home: "Início",
            about: "Sobre",
            skills: "Habilidades",
            projects: "Projetos",
            resume: "Currículo",
            contact: "Contato",
            pinned: "Fixado",
            pin: "Fixar Menu",
            config: "Configuração",
            switch_language: "Trocar Idioma"
        },
        home: {
            roles: ["Engenheiro de Software", "Desenvolvedor de Jogos", "Entusiasta de IA"],
            initializing: "INICIALIZANDO PORTFOLIO_V2.0",
            intro: "Arquitetando realidades digitais imersivas e soluções de software robustas. Especializado na convergência de código de alto desempenho e design interativo.",
            btn_contact: "Inicializar Contato",
            btn_projects: "Acessar Projetos",
            stats: {
                level: "Nível",
                class: "Classe",
                exp: "Exp",
                mana: "Mana"
            }
        },
        about: {
            title: "> Sobre Mim",
            label: "Perfil",
            p1: "Meu fascínio pela tecnologia não começou em uma sala de aula, mas nos mundos vibrantes e ilimitados dos videogames. Essa paixão pela criação me levou a um caminho único, desde projetar níveis 3D imersivos até arquitetar soluções de software complexas. Aos 17 anos, mergulhei de cabeça no mundo profissional em uma startup, começando como designer de níveis de jogos 3D.",
            p2: "Essa experiência prática foi o prelúdio perfeito para minha educação formal em Ciência da Computação na Universidade Estadual de Maringá (UEM). Lá, construí uma base teórica sólida, aprofundando-me em análise de algoritmos, inteligência artificial e criptografia, o que complementou e enriqueceu minhas habilidades práticas.",
            p3: "Atualmente, estou canalizando minha experiência para desenvolver sistemas que utilizam IA e Aprendizado de Máquina para enfrentar desafios no campo da Psicologia. É incrivelmente gratificante aplicar tecnologia de ponta para criar ferramentas que podem genuinamente ajudar as pessoas."
        },
        skills: {
            title: "> O que faço",
            label: "Skills",
            desc: "Com uma base sólida em ciência da computação e paixão pela resolução criativa de problemas, especializo-me na construção de aplicações robustas e experiências digitais imersivas."
        },
        projects: {
            title: "> Projetos",
            subtitle: "Sistemas implantados e protótipos experimentais.",
            status: {
                live: "Online",
                beta: "Beta",
                prototype: "Protótipo"
            },
            view_project: "// VER_PROJETO",
            back: "Voltar para",
            overview: "Visão Geral",
            tech_stack: "Tecnologias",
            links: {
                live: "Demo Online",
                code: "Ver Código"
            }
        },
        resume: {
            label: "Currículo",
            title: "> Jornada Profissional",
            p1: "Saiba mais sobre minhas habilidades, experiência e formação.",
            p2: "Baixe meu currículo para saber mais sobre minha jornada profissional e as habilidades que desenvolvi ao longo dos anos. Nele, compartilho as experiências que contribuíram para meu crescimento e as competências que venho aprimorando com dedicação. Espero que essas informações mostrem como posso ser útil e contribuir para o sucesso da sua equipe ou projeto.",
            btn: "Baixar CV"
        },
        contact: {
            label: "Contato",
            title: "> Entre em Contato",
            desc: "Estou sempre aberto a discutir novos projetos, ideias criativas ou oportunidades para fazer parte de uma equipe ambiciosa. Sinta-se à vontade para iniciar uma transmissão através do vazio.",
            social: {
                github: "Perfil GitHub",
                linkedin: "Rede LinkedIn",
                email: "Email Direto"
            },
            form: {
                header: "Canal Seguro Aberto",
                name_label: "ID_IDENTIDADE",
                email_label: "ENDEREÇO_RETORNO",
                message_label: "PACOTE_DADOS",
                btn_idle: "Iniciar Upload",
                btn_sending: "TRANSMITINDO...",
                btn_sent: "Upload Completo"
            }
        },
        footer: {
            tagline: "Arquitetando realidades digitais imersivas e soluções de software robustas.",
            rights: "TODOS OS DIREITOS RESERVADOS.",
            nav_title: "Navegação",
            connect_title: "Conectar"
        },
        settings: {
            label: "Config",
            title: "> Interface do Sistema",
            desc: "Calibre sua experiência visual e auditiva.",
            appearance: { title: "Aparência", desc: "Personalize as cores de destaque do sistema.", ecosystem_title: "Ecossistema de Cores", texture_title: "Textura do Ambiente", component_title: "Estilo dos Componentes", tint_title: "Tonalidade do Componente", opacity_title: "Opacidade do Vidro", blur_title: "Intensidade do Desfoque", border_title: "Estética da Borda", border_theme: "TEMA", border_neutral: "NEUTRO" },
            graphics: { title: "Gráficos", desc: "Ajuste a qualidade da renderização.", particles_title: "Sistema de Partículas", particles_desc: "Renderizar partículas de fundo.", density_title: "Densidade das Partículas", density_low: "Baixa", density_medium: "Média", density_high: "Alta" },
            audio: { title: "Áudio e Idioma", desc: "Gerencie os sons do sistema.", sound_title: "Efeitos Sonoros da UI", sound_desc: "Tocar sons em eventos.", volume_title: "Volume Principal", language_title: "Idioma do Sistema" },
            interface: { title: "Interface", desc: "Controles de entrada e navegação.", scroll_mode_title: "Modo de Rolagem", scroll_mode_desc: "Alterne entre rolagem cinemática ou rolagem livre nativa.", mode_cinematic: "Cinemático", mode_free: "Livre", snap_style_title: "Comportamento do Snap", snap_style_desc: "Escolha entre snap mais suave ou travamento estrito por seção.", snap_style_soft: "Snap Suave", snap_style_strict: "Snap Estrito" },
            system: { title: "Informações do Sistema", desc: "Detecção de hardware.", resolution: "Resolução", cores: "Núcleos da CPU", platform: "Plataforma", memory: "Memória", userAgent: "USER_AGENT:" }
        },
        saveConfirmation: {
            title: "SISTEMA CALIBRADO",
            message: "Preferências sincronizadas localmente."
        }
    }
};
