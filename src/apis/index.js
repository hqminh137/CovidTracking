import axios from "axios";

export const getCountry = () => axios.get("https://api.covid19api.com/countries");

export const getReportCountry = (country) => axios.get(`https://api.covid19api.com/dayone/country/${country}`);
export const getMapDataByCountryId = (countryId) =>
    import(`@highcharts/map-collection/countries/${countryId}/${countryId}-all.geo.json`);
