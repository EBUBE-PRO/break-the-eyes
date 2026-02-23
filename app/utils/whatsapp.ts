/**
 * Formats a WhatsApp message and returns the URL for redirection
 * @param phone The recipient WhatsApp number (09025837982)
 * @param data Object containing name, email, and message
 */
export const getWhatsAppUrl = (phone: string, data: { name: string, email?: string, message: string }) => {
    const text = `Hello! I'm ${data.name}${data.email ? ' (' + data.email + ')' : ''}. \n\nI'm reaching out regarding: \n${data.message}`;
    const encodedText = encodeURIComponent(text);
    return `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodedText}`;
};
