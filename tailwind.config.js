/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        glitch: 'glitch 4s infinite',
        glitchBlock: 'glitchBlock 3s infinite',
        float: 'float 6s ease-in-out infinite',
        quantum: 'quantum 5s infinite',
        wave: 'wave 8s infinite',
        codeScroll: 'codeScroll 20s linear infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translateX(0)', opacity: '0.8' },
          '25%': { transform: 'translateX(-5px)', opacity: '0.4' },
          '50%': { transform: 'translateX(5px)', opacity: '1' },
          '75%': { transform: 'translateX(-3px)', opacity: '0.6' },
        },
        glitchBlock: {
          '0%, 90%, 100%': { opacity: '0', transform: 'translateX(0) scaleX(1)' },
          '92%': { opacity: '0.8', transform: 'translateX(-10px) scaleX(1.2)' },
          '94%': { opacity: '0.6', transform: 'translateX(10px) scaleX(0.8)' },
          '96%': { opacity: '0.4', transform: 'translateX(-5px) scaleX(1.1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-20px) rotate(5deg)' },
          '50%': { transform: 'translateY(-10px) rotate(-5deg)' },
          '75%': { transform: 'translateY(-15px) rotate(3deg)' },
        },
        quantum: {
          '0%': { transform: 'translate(0, 0) scale(1)', opacity: '0' },
          '25%': { opacity: '0.6' },
          '50%': { transform: 'translate(50px, -30px) scale(1.5)', opacity: '1' },
          '75%': { opacity: '0.6' },
          '100%': { transform: 'translate(100px, 50px) scale(0.5)', opacity: '0' },
        },
        wave: {
          '0%': { transform: 'scale(0.5)', opacity: '0.8' },
          '50%': { transform: 'scale(1.5)', opacity: '0.2' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
        codeScroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};