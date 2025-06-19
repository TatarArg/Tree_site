import Navbar from "../components/Navbar";
import GroupGrid from "./components/GroupGrid";
import Footer from "../components/Footer";

import { countries, years, types } from "./groupdata";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

import * as React from "react";

import GroupChart from "./components/GroupChart";
import SettingChart from './components/SettingChart';



type tSelect = "Страна" | "Год" | "Тип";

function Chart() {
    const [group, setGroup] = React.useState<tSelect>("Страна");
    const [groupData, setGroupData] = React.useState(countries);
    const [series, setSeries] = React.useState({
        'Максимальная высота': true,
        'Средняя высота': false,
        'Минимальная высота': false,
    });

    const handleChange = (event: SelectChangeEvent) => {
        const value = event.target.value as tSelect;
        setGroup(value);

        switch (value) {
            case "Страна":
                setGroupData(countries);
                break;
            case "Год":
                setGroupData(years);
                break;
            case "Тип":
                setGroupData(types);
                break;
        }
    };

    return (
        <div>
            <Navbar active="4" />

            <h2 style={{ textAlign: "center", marginTop: "20px" }}>Диаграммы</h2>

            <Box sx={{ width: "200px", m: "20px auto" }}>
                <FormControl fullWidth>
                    <InputLabel>Группировать по</InputLabel>
                    <Select
                        id="select-group"
                        value={group}
                        label="Группировать по"
                        onChange={handleChange}
                    >
                        <MenuItem value="Страна">Стране</MenuItem>
                        <MenuItem value="Год">Году</MenuItem>
                        <MenuItem value="Тип">Типу</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <GroupGrid data={groupData} />
            <SettingChart
                series={series}
                setSeries={setSeries}
            />

            <GroupChart
                data={groupData}
                series={series}
            />
            <Footer />
        </div>
    );
}

export default Chart;
