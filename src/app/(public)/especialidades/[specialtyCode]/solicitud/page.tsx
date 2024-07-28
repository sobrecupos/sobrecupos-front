import { specialtiesService } from "@marketplace/data-access/specialties/specialties.service";

export const Solicitud = async () => {
    const specialties = await specialtiesService.list();
    console.log('specialties: ', specialties)
    return (
        <div>
            <h1 className="text-2xl py-4">Solicita un sobrecupo </h1>
            <div className="text-base py-4">
                <p>¿Necesitas una hora médica pronto? ¡No te preocupes! En Sobrecupos te ayudamos a encontrar una hora médica de forma rápida y sencilla.</p>
                <p>Para solicitar un sobrecupo, solo debes completar el siguiente formulario y nosotros nos encargaremos de buscar una hora médica para ti.</p>
            </div>
            <div className="w-1/2">
                <h2>Información del paciente</h2>
                <div className="flex flex-col">
                    <label htmlFor="names">Nombres</label>
                    <input
                        type="text"
                        id="names"
                        name="names"
                        className="border-2 rounded-md border-gray-300 px-2 py-1"
                    />
                    {/* <Input type="text" id="names" name="names" /> */}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="firstSurname">Apellido Paterno</label>
                    <input type="text" id="firstSurname" name="firstSurname" className="border-2 rounded-md border-gray-300 px-2 py-1" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="secondSurname">Apellido Materno</label>
                    <input type="text" id="secondSurname" name="secondSurname" className="border-2 rounded-md border-gray-300 px-2 py-1" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="phone">Teléfono</label>
                    <input type="text" id="phone" name="phone" className="border-2 rounded-md border-gray-300 px-2 py-1" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input type="email" id="email" name="email" className="border-2 rounded-md border-gray-300 px-2 py-1" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="especialidad">Especialidad</label>
                    <select id="especialidad" name="especialidad" className="border-2 rounded-md border-gray-300 px-2 py-1">
                        {specialties.map(({ code, name }) => (
                            <option key={code} value={code}>{name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="comentarios">Comentarios</label>
                    <textarea id="comentarios" name="comentarios" className="border-2 rounded-md border-gray-300 px-2 py-1"></textarea>
                </div>
            </div>
        </div>
    );
}
export default Solicitud;