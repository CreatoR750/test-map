import axios from "axios";
import { IP_URL, BASE_URL } from "../config/api.config";

const getIpAddress = async () => {
    const response = await axios.get(IP_URL);
    return response.data.ip;
};

const getLocationsByIp = async (ip: string) => {
    const response = await axios.post(`${BASE_URL}/location-list-by-ip`, { ip: ip });
    return response.data.data;
};

const saveLocation = async (ip: string, coord_x: string, coord_y: string) => {
    const response = await axios.post(`${BASE_URL}/save-location`, { ip: ip, coord_x: coord_x, coord_y: coord_y });
    return response.data;
};

const DataService = {
    getIpAddress,
    getLocationsByIp,
    saveLocation,
};

export default DataService;
