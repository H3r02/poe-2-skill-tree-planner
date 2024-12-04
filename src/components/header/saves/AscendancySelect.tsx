import { useAscendancy } from "@/contexts/AscendancyContext";
import { useNodes } from "@/contexts/NodesContext";
import { useEffect } from "react";

interface AscendancySelectProps {
}

export default function AscendancySepect({ }: AscendancySelectProps) {
    const { ascendancy, setAscendancy, ASCENDANCY_WITH_TEXT } = useAscendancy();

    const handleAscendancyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setAscendancy(event.target.value);
    }


    return (

        <div>
            <select
                id="saveSelector"
                value={ascendancy}
                onChange={handleAscendancyChange}
                className="p-1  rounded-md bg-gray-700 cursor-pointer w-[200px] focus:outline-none"
            >
                {
                    Object.entries(ASCENDANCY_WITH_TEXT).map(([asc, asc_text]) => (
                        <option key={asc} value={asc}>
                            {asc_text}
                        </option>
                    ))
                }


            </select>
        </div>
    );
}
