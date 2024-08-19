import moment from 'moment';

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

export const convertHHmmTime = (date: Date) => {
  const timeHHmm = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  return timeHHmm;
};

export const convertStrToDate = (str: string) => {
  const timeString = str;
  const date = moment(timeString, 'HH:mm').toDate();
  return date;
};
