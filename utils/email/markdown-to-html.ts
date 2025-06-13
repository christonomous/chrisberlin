export const convertMarkdownToHtml = (markdown: string): string => {
  let html = markdown

  // Convert headers
  html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>')
  html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>')
  html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>')

  // Convert bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/__(.*?)__/g, '<strong>$1</strong>')

  // Convert italic
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')
  html = html.replace(/_(.*?)_/g, '<em>$1</em>')

  // Convert lists
  html = html.replace(/^\s*[-*+]\s+(.*$)/gm, '<li>$1</li>')
  html = html.replace(/^\s*\d+\.\s+(.*$)/gm, '<li>$1</li>')
  
  // Wrap lists in ul/ol tags
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, (match) => {
    if (match.match(/^\s*\d+\./m)) {
      return '<ol>\n' + match + '</ol>\n'
    }
    return '<ul>\n' + match + '</ul>\n'
  })

  // Convert code blocks
  html = html.replace(/```(.*?)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')

  // Convert inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')

  // Convert blockquotes
  html = html.replace(/^\> (.*$)/gm, '<blockquote>$1</blockquote>')

  // Convert paragraphs (must come last)
  html = html.replace(/^(?!<[a-z])(.*$)/gm, '<p>$1</p>')

  // Remove empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, '')

  // Fix multiple consecutive newlines
  html = html.replace(/\n\n+/g, '\n\n')

  return html
}
