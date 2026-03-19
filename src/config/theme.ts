

// =============================================
// 1. CYBER / NEON COLORS (alta saturação, brilho máximo)
// =============================================
export const CYBER_COLORS = [
  { name: 'Matrix Green',      value: '#00FF41', rgb: '0, 255, 65' },
  { name: 'Toxic Lime',        value: '#ADFF02', rgb: '173, 255, 2' },
  { name: 'Acid Green',        value: '#BFFF00', rgb: '191, 255, 0' },
  { name: 'Radioactive',       value: '#8DFF33', rgb: '141, 255, 51' },
  { name: 'Cyber Yellow',      value: '#FAFF00', rgb: '250, 255, 0' },
  { name: 'Laser Lemon',       value: '#FEF250', rgb: '254, 242, 80' },
  { name: 'High-Vis Orange',   value: '#FF7B00', rgb: '255, 123, 0' },
  { name: 'Neon Red',          value: '#FF2A2A', rgb: '255, 42, 42' },
  { name: 'Crimson',           value: '#FF0055', rgb: '255, 0, 85' },
  { name: 'Hot Pink',          value: '#FF007F', rgb: '255, 0, 127' },
  { name: 'Magenta',           value: '#FF00FF', rgb: '255, 0, 255' },
  { name: 'Electric Purple',   value: '#BD00FF', rgb: '189, 0, 255' },
  { name: 'Deep Indigo',       value: '#5D00FF', rgb: '93, 0, 255' },
  { name: 'Plasma Blue',       value: '#0088FF', rgb: '0, 136, 255' },
  { name: 'Electric Cyan',     value: '#00E5FF', rgb: '0, 229, 255' },
  { name: 'Flux Teal',         value: '#00FFD5', rgb: '0, 255, 213' },
  { name: 'Pure Gold',         value: '#FFD700', rgb: '255, 215, 0' },
  { name: 'White Phosphorus',  value: '#FFFFFF', rgb: '255, 255, 255' },
  { name: 'Holo White',        value: '#E0FFFF', rgb: '224, 255, 255' },
];

// =============================================
// 2. FASHION / EARTH & SOFT TONES
// =============================================
export const FASHION_COLORS = [
  { name: 'Olive Green',       value: '#808000', rgb: '128, 128, 0' },
  { name: 'Sage Green',        value: '#B2AC88', rgb: '178, 172, 136' },
  { name: 'Beige',             value: '#F5F5DC', rgb: '245, 245, 220' },
  { name: 'Mustard Yellow',    value: '#FFDB58', rgb: '255, 219, 88' },
  { name: 'Burnt Orange',      value: '#CC5500', rgb: '204, 85, 0' },
  { name: 'Terracotta',        value: '#E2725B', rgb: '226, 114, 91' },
  { name: 'Sunset Orange',     value: '#FD5E53', rgb: '253, 94, 83' },
  { name: 'Coral',             value: '#FF7F50', rgb: '255, 127, 80' },
  { name: 'Dusty Rose',        value: '#DCAE96', rgb: '220, 174, 150' },
  { name: 'Burgundy',          value: '#800020', rgb: '128, 0, 32' },
  { name: 'Lavender',          value: '#E6E6FA', rgb: '230, 230, 250' },
  { name: 'Mauve',             value: '#E0B0FF', rgb: '224, 176, 255' },
  { name: 'Teal',              value: '#008080', rgb: '0, 128, 128' },
  { name: 'Classic Blue',      value: '#0F4C81', rgb: '15, 76, 129' },
  { name: 'Midnight Blue',     value: '#191970', rgb: '25, 25, 112' },
];

// =============================================
// 3. RETRO FUTURE / VAPORWAVE / SYNTHWAVE
// =============================================
export const RETRO_COLORS = [
  { name: 'Vice Blue',         value: '#1FBED6', rgb: '31, 190, 214' },
  { name: 'Miami Pink',        value: '#FF69B4', rgb: '255, 105, 180' },
  { name: 'Sunset Magenta',    value: '#D9459C', rgb: '217, 69, 156' },
  { name: 'Palm Purple',       value: '#9B59B6', rgb: '155, 89, 182' },
  { name: 'Neon Coral',        value: '#FF6B6B', rgb: '255, 107, 107' },
  { name: 'Electric Flamingo', value: '#FC427B', rgb: '252, 66, 123' },
  { name: 'Aqua Dream',        value: '#12CBC4', rgb: '18, 203, 196' },
  { name: 'Retro Teal',        value: '#1287A5', rgb: '18, 135, 165' },
  { name: 'Synthwave Purple',  value: '#833AB4', rgb: '131, 58, 180' },
  { name: 'Fuchsia Shock',     value: '#F56040', rgb: '245, 96, 64' },
  { name: 'Grid White',        value: '#F5F5F5', rgb: '245, 245, 245' },
  { name: 'Chrome Silver',     value: '#BDC3C7', rgb: '189, 195, 199' },
];

export const PRIMARY_COLORS = [...CYBER_COLORS, ...FASHION_COLORS, ...RETRO_COLORS];

// =============================================
// CARD BACKGROUND COLORS – Versão aprimorada e profissional
// =============================================
export const CARD_BACKGROUND_COLORS = [
  // PADRÃO (mantido 100% como você pediu)
  { name: 'Default',     light: '0, 0, 0',         dark: '0, 0, 0'},
  { name: 'Chos',     light: '250, 250, 250',   dark: '26, 26, 26' },


  // Escala de cinzas clássica e suave
  { name: 'Frost',       light: '248, 250, 252',   dark: '15, 23, 35' },     // quase branco / azul-escuro frio
  { name: 'Porcelain',   light: '252, 252, 250',   dark: '23, 28, 36' },
  { name: 'Mist',        light: '245, 245, 245',   dark: '30, 30, 30' },
  { name: 'Slate',       light: '241, 243, 247',   dark: '36, 42, 54' },
  { name: 'Gunmetal',    light: '229, 231, 235',   dark: '40, 48, 62' },
  { name: 'Carbon',      light: '217, 220, 225',   dark: '20, 24, 32' },
  { name: 'Obsidian',    light: '200, 200, 200',   dark: '12, 12, 16' },
  { name: 'Void',        light: '180, 180, 180',   dark: '5, 5, 8' },

  // Tons levemente coloridos (perfeitos com neon/cyber)
  { name: 'Arctic',      light: '240, 249, 255',   dark: '8, 18, 36' },      // fundo azul-bem-claro / azul-cosmo escuro
  { name: 'Violet Haze', light: '248, 244, 255',   dark: '25, 15, 40' },
  { name: 'Neon Dust',   light: '245, 240, 255',   dark: '35, 15, 55' },
  { name: 'Cyber Blue',  light: '240, 248, 255',   dark: '10, 25, 49' },     // ótimo com Electric Cyan
  { name: 'Matrix Glow', light: '240, 255, 245',   dark: '8, 35, 20' },      // combina com Matrix Green

  // Contraste puro e especiais
  { name: 'Paper',       light: '255, 255, 255',   dark: '0, 0, 0' },        // branco puro / preto puro
  { name: 'Ghost',       light: '255, 255, 255',   dark: '255, 255, 255' },  // sempre branco (para overlays)
  { name: 'Abyss',       light: '0, 0, 0',         dark: '0, 0, 0' },        // sempre preto (para cards sobre imagens)
];

// Background Patterns
export const BACKGROUND_PATTERNS = [
    { 
        name: 'Grid',
        css: {
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            opacity: '0.4'
        }
    },
    {
        name: 'Cubes',
        css: {
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
            backgroundSize: '10px 10px',
            opacity: '0.4'
        }
    },
    {
        name: 'Hexagons',
        css: {
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='56' height='100' viewBox='0 0 56 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100' fill='none' stroke='%23ffffff' stroke-width='1.2' stroke-opacity='0.08'/%3E%3C/svg%3E")`,
            // A altura deve ser aprox. 1.78x a largura para manter a geometria do hexágono
            backgroundSize: '40px 71.43px', 
            opacity: '0.4'
        }
    },
    {
        name: 'Hexagons Subtle',
        css: {
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='36' height='42' viewBox='0 0 36 42' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='0.8' stroke-opacity='0.06'%3E%3Cpath d='M18 .8L33.18 10v20L18 39.2L2.82 30V10L18 .8z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '36px 42px',
            opacity: '0.4'
        }
    },
    {
        name: 'Hexagons Grid',
        css: {
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='56' height='49' viewBox='0 0 56 49' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='1' stroke-opacity='0.08'%3E%3Cpath d='M21 8.5L34 1v15l13 7.5v15l-13 7.5L21 41V26l-13-7.5V3.5L21 8.5z'/%3E%3Cpath d='M8 18.5L21 26l13-7.5'/%3E%3Cpath d='M8 33.5L21 41l13-7.5'/%3E%3Cpath d='M34 18.5L47 26l-13 7.5'/%3E%3Cpath d='M34 33.5L47 41l-13 7.5'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '26px 19px',
            opacity: '0.4'
        }
    },
    {
        name: 'Dots',
        css: {
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '15px 15px',
            opacity: '0.4'
        }
    },
    {
        name: 'Circuits',
        css: {
            // Novo SVG com um padrão de rastreamento (traces) e nós de circuito (dots) que se conectam
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg stroke='%23ffffff' stroke-width='1' stroke-opacity='0.08' fill='none'%3E%3Cpath d='M0 50h50M50 0v50M50 50h50M50 50v50'/%3E%3Ccircle cx='50' cy='50' r='2' fill='%23ffffff' fill-opacity='0.08' /%3E%3Ccircle cx='0' cy='50' r='2' fill='%23ffffff' fill-opacity='0.08' /%3E%3Ccircle cx='100' cy='50' r='2' fill='%23ffffff' fill-opacity='0.08' /%3E%3Ccircle cx='50' cy='0' r='2' fill='%23ffffff' fill-opacity='0.08' /%3E%3Ccircle cx='50' cy='100' r='2' fill='%23ffffff' fill-opacity='0.08' /%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px',
            opacity: '0.4'
        }
    },
    {
        name: 'Microchip',
        css: {
            // Novo SVG com um desenho de "chip" central e "pinos" laterais, repetindo como uma grade de ICs
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.06' fill-rule='evenodd'%3E%3Crect x='15' y='15' width='30' height='30' rx='3' /%3E%3Crect x='5' y='20' width='10' height='3' /%3E%3Crect x='5' y='35' width='10' height='3' /%3E%3Crect x='45' y='20' width='10' height='3' /%3E%3Crect x='45' y='35' width='10' height='3' /%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
            opacity: '0.4'
        }
    },
    {
        name: 'Isometric',
        css: {
            // Novo SVG: Padrão de linhas em V e ^ que se conectam perfeitamente
            // O viewBox e o path garantem a proporção correta para a grade isométrica
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='69.282' viewBox='0 0 80 69.282'%3E%3Cpath d='M0 69.282L40 46.188l40 23.094M0 0l40 23.094L80 0' fill='none' stroke='%23ffffff' stroke-width='1.2' stroke-opacity='0.08'/%3E%3C/svg%3E")`,
            
            // backgroundSize deve respeitar a proporção de 80:69.282 para isométrico 
            // Aqui, escalamos para 60px de largura.
            backgroundSize: '60px 51.96px', 
            opacity: '0.4'
        }
    },
    {
        name: 'Cross',
        css: {
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'%3E%3Cpath d='M10 0v20M0 10h20' stroke-width='1' stroke='%23ffffff' stroke-opacity='0.05'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '20px 20px',
            opacity: '0.4'
        }
    },
    {
        name: 'Topographic Grid',
        css: {
            backgroundColor: 'transparent',
            
            // Duas camadas: 1. Ondas Ciano (Opacidade 0.08) e 2. Linhas Horizontais Ciano (Opacidade 0.03)
            backgroundImage: `
                url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q50 25 100 10 T200 10 M0 30 Q50 45 100 30 T200 30 M0 50 Q50 65 100 50 T200 50 M0 70 Q50 85 100 70 T200 70 M0 90 Q50 105 100 90 T200 90 M0 110 Q50 125 100 110 T200 110 M0 130 Q50 145 100 130 T200 130 M0 150 Q50 165 100 150 T200 150 M0 170 Q50 185 100 170 T200 170 M0 190 Q50 205 100 190 T200 190' fill='none' stroke='%2300FFFF' stroke-width='1' stroke-opacity='0.08'/%3E%3C/svg%3E"),
                
                linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px)
            `,
            
            // Apenas dois valores de tamanho: 200px para o SVG e 40px para a linha horizontal.
            backgroundSize: '200px 200px, 40px 40px',
            backgroundRepeat: 'repeat'
        }
    },
    {
        name: 'Topography',
        css: {
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px',
            opacity: '0.4'
        }
    },
    {
        name: 'Waves',
        css: {
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2v2c-2.5 0-2.5-2-5-2s-2.5 2-5 2-2.5-2-5-2-2.5 2-5 2V10z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '20px 20px',
            opacity: '0.4'
        }
    },
    {
        name: 'Diagonal',
        css: {
            backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,0.05), rgba(255,255,255,0.05) 10px, transparent 10px, transparent 20px)`,
            backgroundSize: 'auto',
            opacity: '0.4'
        }
    },
    {
        name: 'None',
        css: {
            backgroundImage: 'none',
            backgroundSize: 'auto',
            opacity: '1'
        }
    }
];