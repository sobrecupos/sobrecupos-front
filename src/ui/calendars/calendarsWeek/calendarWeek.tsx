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
    scheduleDay: "schedule-day",
    scheduleTable: "schedule-table",
    scheduleTableMobile: "schedule-table--mobile",
});

/**
 * CalendarWeek component props
 * @typedef CalendarWeekProps
 * @property {AppointmentsByPractice} schedule - Schedule data
 * @property {(selected: Record<string, string>) => void} setSelected - Set selected appointment
 * @property {Appointments[]} Appointments - Appointments data
 * @property {number[]} hours - Hours
 * @property {boolean[][]} hoursAvailable - Hours available
 * @property {string[]} hoursPerDay - Hours per day
 * @property {string[]} daysWeek - Days of the week
 * 
 */

export interface CalendarWeekProps {
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
 * CalendarWeek component
 * @param {CalendarWeekProps} props - Component props
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
const CalendarWeek = (
    {
        schedule,
        setSelected,
        Appointments,
        hours,
        hoursAvailable,
        hoursPerDay,
        daysWeek
    }: CalendarWeekProps) => {

    const appointTemp = [];
    console.log('hoursAvailable', hoursAvailable, "hoursAvailable Desktop")
    return (<table className={classes.scheduleTable} >
        <thead>
            <tr>
                <th>Horas</th>
                <th>Lunes</th>
                <th>Martes</th>
                <th>Miércoles</th>
                <th>Jueves</th>
                <th>Viernes</th>
                <th>Sábado</th>
                <th>Domingo</th>
            </tr>
        </thead>
        <tbody>

            {schedule.results.map(({ id, address, insuranceProviders, appointments }) => {
                const activeInsuranceProviders = insuranceProviders
                    .map(({ name, isActive }) => (isActive ? name : null))
                    .filter((term) => !!term)
                    .join(" | ");
                const activeAppointments = Appointments;
                // console.log(activeAppointments, "activeAppointments Desktop")
                return (
                    <>
                        {hours.map((hour, hourIndex) => {
                            console.log("hour", hour, "hourIndex", hourIndex)
                            return (
                                <tr key={`hour-${hour}`}>
                                    <td key={`hour-start-${hour}`}>{`${hour}:00`}</td>
                                    {hoursAvailable[hourIndex]?.map((disponible, diaIndex) => {
                                        console.log("hoursAvailable[hourIndex] - diaIndex", hoursAvailable[hourIndex], diaIndex);
                                        const appointment = Appointments.find(({ start }) => dayjs(start).hour() === hour - 3);
                                        if (appointment && dayjs(appointment.start).day() - 1 === diaIndex) {
                                            console.log("appointment", appointment, "diaIndex", diaIndex, "hourIndex", hourIndex)
                                            console.log("---------------------------")
                                            appointTemp.push(appointment);
                                            return (
                                                <>
                                                    <td key={`timeslot-${id}-${hourIndex}-${diaIndex}-${appointment?.start}`} id={`timeslot-${id}-${hourIndex}-${diaIndex}-${appointment?.start}`} className={classes.scheduleDay}>
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
                                                <td key={diaIndex} id={`timeslot-${id}-${hourIndex}-${diaIndex}-${appointment?.start}`}><div className={`${classes.timeSlotDisabled} ${classes.scheduleDay}`}></div></td>
                                            )
                                        }
                                    })}
                                </tr >
                            )
                        })}
                    </>
                );
            })}
        </tbody>
    </table>
    )
}

export default CalendarWeek;