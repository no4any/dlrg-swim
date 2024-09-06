"use client"

import Swimmer from "@/lib/model/Swimmer.interface"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BsChevronCompactDown, BsChevronCompactUp } from "react-icons/bs";

export interface SwimmersTableProps {
    swimmers: Swimmer[]
}

export default function SwimmersTable({ swimmers }: SwimmersTableProps) {
    const [asc, setAsc] = useState(true);
    const [orderByField, setOrderByField] = useState<keyof Swimmer>("lastName");
    const [sortedSwimmers, setSortedSwimmers] = useState<Swimmer[]>(swimmers);

    const router = useRouter();

    function orderBy(field: keyof Swimmer) {
        if (field === orderByField) {
            setAsc(!asc);
        } else {
            setOrderByField(field);
            setAsc(true);
        }
    };

    function sort(a: Swimmer, b: Swimmer): 1 | -1 | 0 {
        const aValue = (a as any)[orderByField];
        const bValue = (b as any)[orderByField];

        if (aValue === bValue) {
            return 0;
        }

        return aValue > bValue ? (asc ? 1 : -1) : (asc ? -1 : 1);
    };

    useEffect(() => {
        setSortedSwimmers(sortedSwimmers.toSorted(sort));
    }, [asc, orderByField]);

    return <table className="table-auto w-full text-left">
        <thead>
            <tr>
                <th><button onClick={() => orderBy("lastName")}>Name {orderByField === "lastName" ? asc ? <BsChevronCompactDown /> : <BsChevronCompactUp /> : undefined}</button></th>
                <th><button onClick={() => orderBy("firstName")}>Vorname {orderByField === "firstName" ? asc ? <BsChevronCompactDown /> : <BsChevronCompactUp /> : undefined}</button></th>
                <th><button onClick={() => orderBy("status")}>Status {orderByField === "status" ? asc ? <BsChevronCompactDown /> : <BsChevronCompactUp /> : undefined}</button></th>
                <th>Kappe</th>
                <th>Bändchen</th>
                <th className="text-right">Aktionen</th>
            </tr>
        </thead>
        <tbody>
            {sortedSwimmers.map((swimmer, i) => <tr className="transition-all duration-200 delay-0 hover:bg-dlrg-black/25" key={swimmer._id?.toString() || i}>
                <td>{swimmer.lastName}</td>
                <td>{swimmer.firstName}</td>
                <td>{swimmer.status}</td>
                <td></td>
                <td></td>
                <td className="text-right">
                    <button className="bg-dlrg-blue rounded-lg p-2" onClick={() => router.push(`/admin/${swimmer._id}`)}>Bearbeiten</button>
                    <button className="bg-dlrg-yellow rounded-lg p-2 mx-2">Irgendwas</button>
                </td>
            </tr>)}
        </tbody>
    </table>
}