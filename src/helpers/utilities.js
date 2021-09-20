export const convertMinsToHours = (min) => {
    const hours = Math.floor(min / 60);  
    const minutes = min % 60;
    return hours === 0 ? `${minutes}m` : `${hours}h ${minutes}m`;
}