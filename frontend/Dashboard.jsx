import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {

    const [logs, setLogs] = useState([]);

    useEffect(() => {

        axios
            .get("http://localhost:3000/logs")
            .then((res) => {

                setLogs(res.data);

            });

    }, []);

    return (

        <div className="min-h-screen bg-gray-100 p-10">

            <h1 className="text-4xl font-bold mb-5">
                Smart Borrow System
            </h1>

            <div className="bg-white p-5 rounded-xl shadow">

                <table className="w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="p-3">Name</th>
                            <th className="p-3">Item</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Borrow Time</th>

                        </tr>

                    </thead>

                    <tbody>

                        {logs.map((log) => (

                            <tr
                                key={log.id}
                                className="border-b"
                            >

                                <td className="p-3">
                                    {log.name}
                                </td>

                                <td className="p-3">
                                    {log.item_name}
                                </td>

                                <td className="p-3">
                                    {log.status}
                                </td>

                                <td className="p-3">
                                    {log.borrow_time}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}