import React, { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { ptBR } from "@mui/x-date-pickers/locales";
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');

const DateInput = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (newDate) => {
    if (newDate) {
      const formattedDate = newDate.toISOString().split('T')[0];
      setSelectedDate(newDate);
      onDateChange(formattedDate);
    }
  };

  return (
    <LocalizationProvider 
      dateAdapter={AdapterDayjs}
      adapterLocale="ptBR"
      localeText={
        ptBR.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
      <DatePicker
        label={'DD/MM/AAAA'}
        format={'DD/MM/YYYY'}
        value={selectedDate}
        onChange={handleDateChange}
        disablePast={true}
        showDaysOutsideCurrentMonth={false}
        className="datepicker"
      />
    </LocalizationProvider>
  );
};

export default DateInput;