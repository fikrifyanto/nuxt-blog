/** @type {import('tailwindcss').Config} */
export default {
  content: [
    `components/**/*.{vue,js,ts}`,
    `layouts/**/*.vue`,
    `pages/*.vue`,
    `pages/**/*.vue`,
    `composables/**/*.{js,ts}`,
    `plugins/**/*.{js,ts}`,
    `utils/**/*.{js,ts}`,
    `App.{js,ts,vue}`,
    `app.{js,ts,vue}`,
    `Error.{js,ts,vue}`,
    `error.{js,ts,vue}`,
    `app.config.{js,ts}`
  ],
  theme: {
    fontFamily: {
      'raleway': ['Raleway', 'ui-serif'],
      'ibm-plex-sans': ['IBM Plex Sans', 'ui-sans'],
    },
    extend: {},
  },
  plugins: [],
}

