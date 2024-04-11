import { authService } from "@marketplace/data-access/auth/auth.service";
import { practitionersService } from "@marketplace/data-access/practitioners/practitioners.service";
import Image from "next/image";
import Link from "next/link";

const PractitionersPage = async () => {
  await authService.getAdminSessionOrRedirect();
  const practitioners = await practitionersService.listAll();
  return (
    <div className="">
      <div className="flex justify-center items-center">
        <Link
          href="/app/dashboard"
          className={`text-center text-indigo-500 border-2 border-indigo-600 hover:bg-indigo-600 hover:text-white rounded-md h-fit w-8  bg-white font-semibold`}
        >{"<"}</Link>
        <h1 className={`text-2xl  m-4`}>Profesionales</h1>

      </div>
      <div className="m-5 flex flex-col items-center">
        <Link href="/app/especialidades/crear" className={`text-center  bg-indigo-500 hover:bg-indigo-700 rounded-md w-[80%] md:w-[33%] mx-auto text-white p-4 font-semibold`}>
          Crear Profesional
        </Link>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {
            practitioners.results.map((practitioner, idx) => <Link href={'#'} key={idx}>
              <div className="border-2 border-indigo-400 rounded-md p-2 min-h-[200px] w-full">
                <div className="flex gap-2">
                  <Image
                    src={practitioner.picture}
                    alt={practitioner.fullName}
                    height="100"
                    width="100"
                  />
                  <p>{practitioner.fullName}</p>
                </div>
              </div>
            </Link>)
          }
        </div>
      </div>
    </div>);
};

export default PractitionersPage;
