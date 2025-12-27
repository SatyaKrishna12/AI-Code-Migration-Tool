/**
 * Exports code to a downloadable file
 * @param {string} code - The code to export
 * @param {string} target - Target language ("ES6" or "TypeScript")
 */
export const exportCodeToFile = (code, target) => {
  const extension = target === 'TypeScript' ? 'ts' : 'js';
  const filename = `migrated-code.${extension}`;
  
  const blob = new Blob([code], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Formats timestamp to readable date
 * @param {string} timestamp - ISO timestamp
 * @returns {string} - Formatted date string
 */
export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
