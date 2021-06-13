// import logo from "./logo.svg";
import sortBy from "lodash.sortby";
import { useEffect, useState } from "react";
import { getCountry, getReportCountry } from "./apis";
import "./App.css";
import CountrySelector from "./components/CountrySelector";
import HighLight from "./components/HighLight";
import Summary from "./components/Summary";

function App() {
    const [countries, setCountries] = useState([]);
    const [selectCountry, setselectCountry] = useState("");
    const [report, setReport] = useState([]);

    useEffect(() => {
        getCountry().then((res) => {
            const contries = sortBy(res.data, "Country");
            setCountries(contries);

            setselectCountry("vn");
        });
    }, []);
    const handleOnChange = (e) => {
        setselectCountry(e.target.value);
    };

    useEffect(() => {
        if (selectCountry) {
            const selectedCountry = countries.find((country) => country.ISO2 === selectCountry.toUpperCase());
            getReportCountry(selectedCountry.Slug).then((res) => {
                // remove last item = current date
                res.data.pop();
                setReport(res.data);
            });
        }
    }, [selectCountry, countries]);

    return (
        <>
            <h1>SỐ LIỆU COVID-19</h1>
            <CountrySelector contries={countries} handleOnChange={handleOnChange} value={selectCountry} />
            <HighLight report={report} />
            <Summary countryId={selectCountry} report={report} />
        </>
    );
}

export default App;
