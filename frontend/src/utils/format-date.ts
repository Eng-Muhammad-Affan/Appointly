const formatDate = (text: string) => {
    const formattedDate = new Date(text).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',    // 'long' = June, 'short' = Jun
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true      // 12-hour format with AM/PM
    });
    return formattedDate;
}
export default formatDate