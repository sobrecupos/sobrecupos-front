import { appointmentsClient } from '@marketplace/data-access/appointments/appointments.client';
import dayjs from "dayjs";
import { useEffect, useState } from 'react';



export type ListDaysProps = {
  selectDay: (date: string) => void;
  schedule: any;
  activesAppointments: any;
  practitionerId: string;
};

const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);

export const ListDays = ({ selectDay, schedule, activesAppointments, practitionerId }: ListDaysProps) => {
  const days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']
  const [IndexDaySelected, setIndexDaySelected] = useState(-1)
  const firstDayOfWeek = new Date();
  const dynamicDate = new Date();
  firstDayOfWeek.setDate(firstDayOfWeek.getDate() - firstDayOfWeek.getDay());
  dynamicDate.setDate(dynamicDate.getDate() - dynamicDate.getDay());

  const selectedDay = (date: string, index: number) => {
    //console.log('selectedDay', date);
    selectDay(date);

    setIndexDaySelected(index);
  }

  function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Agrega un cero adelante si el número de mes tiene un solo dígito
    const day = String(date.getDate()).padStart(2, '0'); // Agrega un cero adelante si el número de día tiene un solo dígito
    return `${year}-${month}-${day}`;
  }

  const getAppointmentPerDay = async (date: string) => {
    //console.log('practitionerId', practitionerId)
    //console.log('date', date)
    const countAppointments = await appointmentsClient.getAppointmentByPractitionerInDate({
      practitionerId,
      date
    }).then((res) => {
      //console.log('res', res)
      return res;
    }
    ).catch((err) => {
      //console.log('err', err)
    });

    //console.log('countAppointments', countAppointments)
  }

  useEffect(() => {
    setIndexDaySelected(new Date().getDay() - 1)
  }, [])




  return (
    <div className='relative max-w-[90vw] w-full '>

      <div className="absolute h-[100px] px-2 py-3 right-0 "></div>
      <div className="flex justify-between overflow-x-scroll min-h-[86px] md:min-h-[110px] md:flex-wrap md:overflow-hidden gap-2 md:gap-[2px] ">
        {days?.map((day, index) => {

          // //console.log('IndexDaySelected === index', IndexDaySelected === index)
          const date = dynamicDate.setDate(firstDayOfWeek.getDate() + 1);
          const month = capitalize(dynamicDate.toLocaleString('es-ES', { month: 'short' }));
          const countActiveAppointments = activesAppointments?.filter((appointment: any) => {
            const date = new Date(appointment.start);
            return dayjs(appointment.start).isAfter(dayjs());
          }
          ).length;
          // //console.log('countActiveAppointments', countActiveAppointments)
          // const dayDate = new Date();
          // dayDate.setDate(dynamicDate.getDate() + index);
          // const countAppointments = getAppointmentPerDay(formatDate(dayDate));
          // //console.log('countAppointments', countAppointments)

          return (
            <div
              key={index}
              className={`flex-shrink-0 flex-col w-[98px] md:w-[80px] h-fit min-h-[72px] ${IndexDaySelected === index ? 'bg-indigo-500' : 'bg-white border-2 w-[96px] border-indigo-500'}  rounded-lg text-center hover:cursor-pointer hover:shadow-lg`}
              onClick={() => {

                //console.log('click', firstDayOfWeek.getDate());
                //console.log('click', dynamicDate.getDate() + index);
                //console.log(index)
                const dayDate = new Date();
                dayDate.setDate(dynamicDate.getDate() + index);
                selectedDay(formatDate(dayDate), index);
              }}
            >
              <div className="px-3 py-3">
                <p className={`${IndexDaySelected !== index ? 'text-indigo-500' : 'text-white'} font-light text-sm`}>{day.slice(0, 3)}</p>
                <p className={`${IndexDaySelected !== index ? 'text-indigo-500' : 'text-white'} font-light pb-1 text-sm`}>{dynamicDate.getDate() + index} {month}</p>
                {/* <div className="flex justify-center items-center gap-1 bg-white rounded-lg"> */}
                {/* <p className="font-bold text-base text-indigo-800">2</p>
                  <HeartIcon className="h-4 w-4 text-indigo-500" /> */}
                {/* </div> */}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default ListDays;