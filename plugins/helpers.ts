export default defineNuxtPlugin(() => {
  return {
    provide: {
      capitalizeFirstLetter(string: String): String {
        return string.charAt(0).toUpperCase() + string.slice(1)
      },

      excerpt(text: string): string | null | undefined {
        const sentences = text.match(/[^.!?]+[.!?]+/g)
        const threeSentences = sentences?.slice(0, 4)
        return threeSentences?.join("")
      },
    },
  }
})
