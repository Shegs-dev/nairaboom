/* eslint-disable react/prop-types */
import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { useDatePicker } from "../../utils/dobContext";
// selected, onChange
const CustomDatePicker = ({}) => {
    const selected = new Date();
    const { day, month_, setDay, setMonth_, onChange, setOnChange } =
    useDatePicker();
    const months = [
        { value: 1, label: "January" },
        { value: 2, label: "February" },
        { value: 3, label: "March" },
        { value: 4, label: "April" },
        { value: 5, label: "May" },
        { value: 6, label: "June" },
        { value: 7, label: "July" },
        { value: 8, label: "August" },
        { value: 9, label: "September" },
        { value: 10, label: "October" },
        { value: 11, label: "November" },
        { value: 12, label: "December" },
    ];

    // const daysInMonth = new Date(
    //   selected?.getFullYear(),
    //   selected?.getMonth() + 1,
    //   0
    // ).getDate();
    // const days = Array.from({ length: daysInMonth }, (_, i) => ({
    //   value: i + 1,
    //   label: `${i + 1}`,
    // }));

    const daysInMonth = new Date(
        // eslint-disable-next-line react/prop-types
        selected ? .getFullYear(),
        selected ? .getMonth() + 1,
        0
    ).getDate();

    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
        days.push({ value: i, label: `${i}` });
    }

    function _getDaysInMonthArray() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const daysInMonth = new Date(year, month + 1, 0).getDate();
    }

    //   const daysArray = Array.from({ length: daysInMonth }, (_, index) => ({
    //     label: `${index + 1}`,
    //     value: index + 1,
    //   }));

    //   return daysArray;
    // }
    //   function getDaysInMonthArray() {
    //     const currentDate = new Date();
    //     const year = currentDate.getFullYear();
    //     const month = currentDate.getMonth();

    //     const daysInMonth = new Date(year, month + 1, 0).getDate();

    //     const daysArray = Array.from({ length: daysInMonth }, (_, index) => ({
    //       label: `${index + 1}`,
    //       value: index + 1,
    //     }));

    //     return daysArray;
    // }

    //   // Example usage:
    //   const daysArray = getDaysInMonthArray();

    // Initialize daysArray for the current month
    const currentDate = new Date();
    const initialMonth = currentDate.getMonth();
    const initialYear = currentDate.getFullYear();

    // Initialize states for month, year, and days array
    const [month, setMonth] = useState(initialMonth);
    const [year, setYear] = useState(initialYear);
    const [daysArray, setDaysArray] = useState(
        getDaysInMonthArray(initialYear, initialMonth)
    );

    function getDaysInMonthArray(year, month) {
        // Check if the year is a leap year
        const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

        // Adjust the number of days in February based on whether it's a leap year or not
        // const daysInFebruary = isLeapYear ? 29 : 28;
        const daysInFebruary = 29;

        // Define the number of days for each month (0-based index)
        const daysInMonth = [
            31,
            daysInFebruary,
            31,
            30,
            31,
            30,
            31,
            31,
            30,
            31,
            30,
            31,
        ];

        // Get the number of days for the specified month
        const daysInSelectedMonth = daysInMonth[month];

        // Create an array of day objects for the specified month
        const daysArray = Array.from({ length: daysInSelectedMonth },
            (_, index) => ({
                label: `${index + 1}`,
                value: index + 1,
            })
        );

        return daysArray;
    }

    function formatDate(inputDate) {
        const date = new Date(inputDate);

        // Get month and day
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
        const day = date.getDate().toString().padStart(2, "0");

        return `${month}/${day}`;
    }
    // Function to update daysArray when month changes
    function updateDaysArray(year, month) {
        let _daysArray = getDaysInMonthArray(year, month);
        setDaysArray(_daysArray);
    }
    // const [day, setDay] = useState(0);
    // const [month_, setMonth_] = useState("01");
    return ( <
        Box display = { "flex" }
        backgroundColor = { "white" }
        justifyContent = { "space-evenly" }
        py = "0.4em"
        borderRadius = { "full" }
        gap = { 4 } >
        <
        Box width = { "3/4" } >
        <
        Select styles = {
            {
                width: "100%",
            }
        }
        className = ""
        options = { months }
        isSearchable = { false }
        placeholder = "Month"
        value = { months.find((month) => month.value === month_) }
        onChange = {
            (selectedOption) => {
                const newDate = new Date(selected);
                newDate.setMonth(selectedOption.value - 1);
                setMonth_(selectedOption.value);
                updateDaysArray(newDate.getFullYear(), newDate.getMonth());
                // onChange(newDate);
                // onChange(`${selectedOption.value}/${day}`);
                setOnChange(`${selectedOption.value}/${day}`);
            }
        }
        /> <
        /Box> <
        Box width = { "1/4" } >
        <
        Select styles = {
            {
                width: "100%",
            }
        }
        className = ""
        options = { daysArray }
        isSearchable = { false }
        placeholder = "Day"
        value = { days.find((_day) => _day.value === day) }
        onChange = {
            (selectedOption) => {
                const newDate = new Date(selected);
                newDate.setDate(selectedOption.value);
                // onChange(newDate);
                setDay(selectedOption.value);
                // onChange(`${month_}/${selectedOption.value}`);
                setOnChange(`${month_}/${selectedOption.value}`);
            }
        }
        /> <
        /Box> <
        Box display = { "none" } >
        <
        DatePicker selected = { selected }
        onChange = { onChange }
        dateFormat = "yyyy-MM-dd"
        showYearDropdown = { false }
        className = "hidden" /
        >
        <
        /Box> <
        /Box>
    );
};

export default CustomDatePicker;