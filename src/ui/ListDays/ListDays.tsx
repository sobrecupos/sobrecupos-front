import { appointmentsClient } from '@marketplace/data-access/appointments/appointments.client';
import { negativeOffset } from '@marketplace/utils/normalizers/dateUtils';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';



export type ListDaysProps = {
  selectDay: (date: string) => void;
  schedule: any;
  activesAppointments: any;
  practitionerId: string;
  indexDaySelected?: number;
  from: string;
  to: string;
};

const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);

export const ListDays = (
  {
    selectDay: SelectDay,
    schedule,
    activesAppointments,
    practitionerId,
    indexDaySelected,
    from,
    to
  }: ListDaysProps) => {

  console.log('from', from)
  const startDate = dayjs(from).add(negativeOffset, 'hour').toDate();
  console.log('startDate', startDate)

  console.log('negativeOffset', negativeOffset)
  console.log('startDate w negativeOffset', dayjs(from).add(negativeOffset, "hour").toDate())


  const endDate = dayjs(to).toDate();
  const [IndexDaySelected, setIndexDaySelected] = useState<number>(indexDaySelected || -1)
  const [Days, setDays] = useState<string[]>([])
  const firstDayOfWeek = new Date();
  // const dynamicDate = new Date();
  firstDayOfWeek.setDate(firstDayOfWeek.getDate() - firstDayOfWeek.getDay());
  // dynamicDate.setDate(firstDayOfWeek.getDate() + 1);

  const selectedDay = (date: string, index: number) => {
    setIndexDaySelected(index);
    SelectDay(date);

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
    // console.log('indexDaySelected', indexDaySelected)
    // console.log('IndexDaySelected', IndexDaySelected)
    if (IndexDaySelected < 0) {
      // console.log('if')
      setIndexDaySelected(0)
    } else if (IndexDaySelected !== indexDaySelected && indexDaySelected !== undefined) {
      // console.log('else if')
      setIndexDaySelected(indexDaySelected);
    } else {
      // console.log('else')
      setIndexDaySelected(indexDaySelected || 0);
    }
  }, [indexDaySelected])

  useEffect(() => {
    while (startDate <= endDate) {
      const day = startDate.toLocaleDateString('es-CL', { weekday: 'long' });
      Days.push(day);
      startDate.setDate(startDate.getDate() + 1);
    }
  }, [])



  return (
    <div className='relative max-w-[90vw] w-full '>
      <div className="absolute h-[100px] px-2 py-3 right-0 "></div>
      <div className="flex justify-between overflow-x-scroll min-h-[86px] md:min-h-[110px] md:flex-wrap md:overflow-hidden gap-2 md:gap-[2px] ">
        {Days?.map((day, index) => {
          const month = dayjs(from).add(index, 'day').format('MMMM');
          // const month = capitalize(new Date(from)..toLocaleString('es-ES', { month: 'short' }));
          const dayDate = dayjs(from).add(3, 'hours').add(index, 'day').toDate();


          return (
            <div
              key={index}
              className={`flex-shrink-0 flex-col w-[98px] md:w-[80px] h-fit min-h-[72px] ${IndexDaySelected === index ? 'bg-indigo-500' : 'bg-white border-2 w-[96px] border-indigo-500'}  rounded-lg text-center hover:cursor-pointer hover:shadow-lg`}
              onClick={() => {
                selectedDay(formatDate(dayDate), index);
              }}
            >
              <div className="px-3 py-3">
                <p className={`${IndexDaySelected !== index ? 'text-indigo-500' : 'text-white'} font-light text-sm`}>{capitalize(day.slice(0, 3))}</p>
                <p className={`${IndexDaySelected !== index ? 'text-indigo-500' : 'text-white'} font-light pb-1 text-sm`}>{dayjs(dayDate).format('DD')} {capitalize(month.slice(0, 3))}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default ListDays;