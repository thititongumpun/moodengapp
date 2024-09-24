import { json, LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getUsers } from "~/lib/users";
import { getClientIPAddress } from "remix-utils/get-client-ip-address";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

type User = {
  name: string;
  avatar: string;
  job: Job;
  vehicle: Vehicle;
};

type Job = {
  title: string;
};

type Vehicle = {
  model: string;
  manufacturer: string;
  fuel: string;
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const users: User[] = await getUsers();


  const ipAddress = getClientIPAddress(request);
  return json({ ipAddress, users });
};

export default function Index() {
  const { ipAddress, users } = useLoaderData<typeof loader>();

  return (
    <div className="grid grid-cols-4 gap-6 max-w-screen-lg w-full p-12 mx-auto">
      {users?.map((user, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <img
            className="object-cover w-full rounded-t-lg h-96 md:h-auto md:rounded-none md:rounded-s-lg overflow-hidden"
            src={user.avatar}
            alt={user.avatar}
          />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
              {user.name}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {user.job.title}
            </p>
            <p>{user.vehicle.manufacturer}</p>
          </div>
        </div>
      ))}
      {ipAddress ?? <p>{ipAddress}</p>}
    </div>
  );
}
