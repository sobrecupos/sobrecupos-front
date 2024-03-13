import { getComponentClassNames } from "@marketplace/ui/namespace";
import { formatDate } from "@marketplace/utils/normalizers/formatDate";
import { formatHours } from "@marketplace/utils/normalizers/formatHours";
import { AppointmentsByPractice } from "@marketplace/utils/types/appointments";
import dayjs from "dayjs";
import "./calendarWeek.scss";

const classes = getComponentClassNames("schedule", {
    spinner: "spinner",
    title: "title",
    subtitle: "subtitle",
    timeSlotsContainer: "time-slots-container",
    address: "address",
    addressIcon: "address-icon",
    insurances: "insurances",
    timeSlots: "time-slots",
    timeSlot: "time-slot",
    timeSlotDisabled: "time-slot--disabled",
    back: "back",
    table: "table",
    tableRow: "table-row",
    tableData: "table-data",
    form: "form",
    formElement: "form-element",
    label: "label",
    input: "input",
    submit: "submit",
    empty: "empty",
    scheduleMobileDay: "schedule-mobile-day",
    scheduleTable: "schedule-table",
    scheduleTableMobile: "schedule-table--mobile",
});

/**
 * CalendarWeekMobile component props
 * @typedef CalendarWeekMobileProps
 * @property {AppointmentsByPractice} schedule - Schedule data
 * @property {(selected: Record<string, string>) => void} setSelected - Set selected appointment
 * @property {Appointments[]} Appointments - Appointments data
 * @property {number[]} hours - Hours
 * @property {boolean[][]} hoursAvailable - Hours available
 * @property {string[]} hoursPerDay - Hours per day
 * @property {string[]} daysWeek - Days of the week
 * 
 */

export interface CalendarWeekMobileProps {
    schedule: AppointmentsByPractice;
    setSelected: (selected: Record<string, string>) => void;
    Appointments: {
        id: string;
        start: string;
        durationInMinutes: number;
    }[];
    hours: number[];
    hoursAvailable: boolean[][];
    hoursPerDay: string[];
    daysWeek: string[];
}

/**
 * CalendarWeekMobile component
 * @param {CalendarWeekMobileProps} props - Component props
 * @property {AppointmentsByPractice} schedule - Schedule data
 * @property {(selected: Record<string, string>) => void} setSelected - Set selected appointment
 * @property {Appointments[]} Appointments - Appointments data
 * @property {number[]} hours - Hours
 * @property {boolean[][]} hoursAvailable - Hours available
 * @property {string[]} hoursPerDay - Hours per day
 * @property {string[]} daysWeek - Days of the week
 * @returns {JSX.Element} - Rendered component
 * 
 */
const CalendarWeekMobile = (
    {
        schedule,
        setSelected,
        Appointments,
        hours,
        hoursAvailable,
        hoursPerDay,
        daysWeek
    }: CalendarWeekMobileProps) => {
    return (<table className={classes.scheduleTableMobile} >
        <thead>
            <tr>
                <th>Horas</th>
                <th>Lu</th>
                <th>Ma</th>
                <th>Mi</th>
                <th>Ju</th>
                <th>Vi</th>
                <th>Sá</th>
                <th>Do</th>
            </tr>
        </thead>
        <tbody>

            {schedule.results.map(({ id, address, insuranceProviders, appointments }) => {
                const activeInsuranceProviders = insuranceProviders
                    .map(({ name, isActive }) => (isActive ? name : null))
                    .filter((term) => !!term)
                    .join(" | ");
                // const activeAppointments = Appointments.filter(({ start }) =>
                //     dayjs(start).isAfter(dayjs())
                // );
                const activeAppointments = Appointments;
                console.log(activeAppointments, "activeAppointments Mobile")

                return (
                    <>
                        {hours.map((hour, hourIndex) => (
                            <tr key={`hour-${hour}`}>
                                <td key={`hour-start-${hour}`}>{`${hour}:00`}</td>
                                {hoursAvailable[hourIndex]?.map((disponible, diaIndex) => {
                                    const appointment = Appointments.find(({ start }) => dayjs(start).hour() === hour - 3);
                                    const dayX = dayjs(appointment?.start).day();
                                    if (appointment && dayjs(appointment.start).day() - 1 === diaIndex) {
                                        return (
                                            <>
                                                <td key={`timeslot-${id}-${hourIndex}-${diaIndex}-${appointment?.start}`} id={`timeslot-${id}-${hourIndex}-${diaIndex}-${appointment?.start}`} className={classes.scheduleMobileDay}>
                                                    <button
                                                        className={classes.timeSlot}
                                                        onClick={() =>
                                                            setSelected({
                                                                id,
                                                                label: formatHours(appointment.start, appointment?.durationInMinutes),
                                                                start: appointment.start,
                                                                durationInMinutes: String(appointment?.durationInMinutes),
                                                                date: formatDate(
                                                                    dayjs(appointment.start).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
                                                                ),
                                                                address,
                                                                insuranceProviders: activeInsuranceProviders,
                                                            })
                                                        }
                                                    >
                                                        {formatHours(appointment.start, appointment?.durationInMinutes)}
                                                    </button>
                                                </td>
                                            </>
                                        )

                                    } else {
                                        return (
                                            <td key={diaIndex}><div className={`${classes.timeSlotDisabled} ${classes.scheduleMobileDay}`}></div></td>
                                        )
                                    }
                                })}
                            </tr >
                        ))}
                    </>
                );
            })}
        </tbody>
    </table>
    )
}

export default CalendarWeekMobile;