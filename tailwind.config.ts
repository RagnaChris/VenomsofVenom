import { type Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial-to-br': 'radial-gradient(90% 115% at 0% 0%, var(--tw-gradient-stops))',
        'gradient-radial-to-tl': 'radial-gradient(115% 90% at 100% 100%, var(--tw-gradient-stops))',
        'gradient-radial-tl-and-br': 'radial-gradient(90% 115% at 0% 0%, var(--tw-gradient-stops)),\
                                      radial-gradient(115% 90% at 100% 100%, var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
} satisfies Config;
