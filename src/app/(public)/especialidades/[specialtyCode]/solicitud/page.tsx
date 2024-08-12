'use client'
import { appointmentsClient } from "@marketplace/data-access/appointments/appointments.client";
import { specialtiesClient } from "@marketplace/data-access/specialties/specialties.client";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const styleContainerForm = 'flex flex-col py-2';

const Solicitud = () => {
    const [specialities, setSpecialities] = useState([]);
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [secondLastName, setSecondLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [speciality, setSpeciality] = useState('');
    const [comment, setComment] = useState('');

    const sendForm = async () => {
        try {
            const time = dayjs(new Date()).toISOString().toString();
            const resp = await appointmentsClient.requestAppointment(
                name, lastName, secondLastName, phone, email, speciality, comment, time
            );

        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    useEffect(() => {
        specialtiesClient.list().then((resp) => {
            setSpecialities(resp);
        });
    }, []);

    return (
        <div>
            <h1 className="text-2xl py-4 md:w-2/3 md:mx-auto">Solicita un sobrecupo</h1>
            <div className="text-base py-2 flex-col gap-2 bg-indigo-50 rounded-md p-2 mb-4 md:w-2/3 md:mx-auto">
                <p>¿Necesitas una hora médica pronto?</p>
                <p>¡No te preocupes! En Sobrecupos te ayudamos a encontrar una hora médica de forma rápida y sencilla.</p>
                <p>Para solicitar un sobrecupo, solo debes completar el siguiente formulario y enviarlo.</p>
            </div>
            <div className="md:flex ">

                <div className="md:w-1/2 w-full mx-auto">

                    <h2 className="text-xl py-2">Información del paciente</h2>
                    <FormInput
                        label="Nombres"
                        id="names"
                        value={name}
                        onChange={setName}
                    />
                    <FormInput
                        label="Apellido Paterno"
                        id="firstSurname"
                        value={lastName}
                        onChange={setLastName}
                    />
                    <FormInput
                        label="Apellido Materno"
                        id="secondSurname"
                        value={secondLastName}
                        onChange={setSecondLastName}
                    />
                    <FormInput
                        label="Teléfono"
                        id="phone"
                        value={phone}
                        onChange={setPhone}
                    />
                    <FormInput
                        label="Correo Electrónico"
                        id="email"
                        type="email"
                        value={email}
                        onChange={setEmail}
                    />
                    <FormSelect
                        label="Especialidad"
                        id="especialidad"
                        value={speciality}
                        onChange={setSpeciality}
                        options={specialities}
                    />
                    {speciality}
                    <FormTextarea
                        label="Comentarios"
                        id="comentarios"
                        value={comment}
                        onChange={setComment}
                    />
                    <button
                        onClick={sendForm}
                        className="w-full my-4 bg-indigo-500 text-white rounded-md py-4 hover:bg-indigo-600"
                    >
                        Solicitar
                    </button>
                </div>
                {/* <div className="md:w-1/2 hidden md:block"></div> */}
            </div>

        </div>
    );
};

const FormInput = ({ label, id, value, onChange, type = 'text' }: {
    label: string, id: string, value: any, onChange: any, type?: string
}) => (
    <div className={styleContainerForm}>
        <label htmlFor={id}>{label}</label>
        <input
            type={type}
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="border-2 rounded-md border-gray-300 px-2 py-1"
        />
    </div>
);

const FormSelect = ({ label, id, value, onChange, options }: {
    label: string, id: string, value: any, onChange: any, options: any
}) => (
    <div className={styleContainerForm}>
        <label htmlFor={id}>{label}</label>
        <select
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="border-2 rounded-md border-gray-300 px-2 py-1"
        >
            {options.map(({ code, name }: {
                code: string, name: string
            }) => (
                <option key={code} value={code}>{name}</option>
            ))}
        </select>
    </div>
);

const FormTextarea = ({ label, id, value, onChange }: { label: string, id: string, value: any, onChange: any }) => (
    <div className={styleContainerForm}>
        <label htmlFor={id}>{label}</label>
        <textarea
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="border-2 rounded-md border-gray-300 px-2 py-1"
        />
    </div>
);

export default Solicitud;
