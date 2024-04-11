import { authService } from "@marketplace/data-access/auth/auth.service";
import Link from "next/link";

const hoverLink = "hover:cursor-pointer hover:shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]";


export const DashboardPage = async () => {
    await authService.getAdminSessionOrRedirect();

    return (
        <div className="m-5 flex flex-col items-center">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <div className="flex flex-col md:flex-row gap-2 m-5 w-full items-center">
                <Link className={`${hoverLink} border-2 border-indigo-500 rounded-md w-[80%] md:w-56 p-4`} href="/app/especialidades">Especialidades</Link>
                <Link className={`${hoverLink} border-2 border-indigo-500 rounded-md w-[80%] md:w-56 p-4`} href="/app/appointments">Citas</Link>
                <Link className={`${hoverLink} border-2 border-indigo-500 rounded-md w-[80%] md:w-56 p-4`} href="/app/instituciones">Instituciones</Link>
                <Link className={`${hoverLink} border-2 border-indigo-500 rounded-md w-[80%] md:w-56 p-4`} href="/app/profesionales">Profesionales</Link>
                <Link className={`${hoverLink} border-2 border-indigo-500 rounded-md w-[80%] md:w-56 p-4`} href="/app/orders">Ordenes</Link>
            </div>
        </div>
    );
}

export default DashboardPage;