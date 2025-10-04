import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

interface BasicDatePickerProps {
    onDateChange: (date: string | null) => void; // Callback function to send the date to the parent
}

export default function BasicDatePicker({ onDateChange }: BasicDatePickerProps) {
    const handleDateChange = (date: Dayjs | null) => {
        // Convert the date to a string or keep it null
        const formattedDate = date ? date.format('YYYY-MM-DD') : null;
        onDateChange(formattedDate);
    };

    // Function to disable dates after today
    const disableFutureDates = (date: Dayjs) => {
        return date.isAfter(dayjs(), 'day'); // Disable dates after today
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
                <DatePicker
                    label="Date"
                    sx={{ width: '100%'  }}
                    onChange={handleDateChange} // Pass the selected date to the parent
                    shouldDisableDate={disableFutureDates} // Restrict selection to today or the past
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}
