tailwind.config = {
    theme: {
        extend: {
            colors: {
                'gold-light': '#e4cd85',
                'gold-dark': '#c08a2d',
                'deep-blue': '#163384',
                'void-deep': '#0d0b16',
                'void-medium': '#232a3d',
                'light-birth': '#f9f4e3',
            },
            fontFamily: {
                'playfair': ['Playfair Display', 'serif'],
                'inter': ['Inter', 'sans-serif'],
                'space': ['Space Grotesk', 'sans-serif'],
            },
            animation: {
                'fade-in-up': 'fadeInUp 1s ease-out forwards',
                'twinkle': 'twinkle 3s infinite ease-in-out',
                'float': 'float 6s ease-in-out infinite',
                'glow-pulse': 'glowPulse 2s ease-in-out infinite alternate',
                'liquid-flow': 'liquidFlow 20s linear infinite',
                'particle-drift': 'particleDrift 15s linear infinite',
            },
            backdropBlur: {
                'xs': '2px',
            }
        }
    }
}