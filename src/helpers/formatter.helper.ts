export const formatDateIndonesian = (date: Date) => {
  // Define an array of Indonesian month names
  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  // Extract date components
  const day = date.getDate();
  const month = date.getMonth(); // getMonth() returns 0-11
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Format hours and minutes to always be two digits
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');

  // Construct the formatted date string
  const formattedDate = `${day} ${months[month]} ${year} Pukul ${formattedHours}:${formattedMinutes}`;

  return formattedDate;
};

// Example usage
const now = new Date();
console.log(formatDateIndonesian(now)); // Output: "13 Agustus 2024 Pukul 15:30" (for example)
