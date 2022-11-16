import { FC } from "react";
import { MapContainer,TileLayer} from "react-leaflet";
import Button from "../../library/Button/Button";
import "./map.scss";
import "leaflet/dist/leaflet.css";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";
import marker from "../../assets/svg/marker.svg";
import SelectMarker from "../SelectMarker/SelectMarker";
import { RootState } from "../../redux/store";
import { saveCoords, setCoords } from "../../redux/coordSlice";
import { mapPosition } from "../../const/mapPosition";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

let DefaultIcon = L.icon({
    iconUrl: marker,
    shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

const Map: FC = () => {
    const dispatch = useAppDispatch();
    const { ip, coords } = useAppSelector((state: RootState) => state.coord);

    const saveHandler = (): void => {
        dispatch(saveCoords(ip, String(coords.lat), String(coords.lng)));
    };

    return (
        <div className="map">
            <div className="map__wrapper">
                <MapContainer
                    center={mapPosition}
                    zoom={12}
                    scrollWheelZoom={true}
                    style={{ height: "100%", width: "100%", borderRadius: "16px" }}
                    zoomControl={true}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <SelectMarker center={mapPosition} onValueChange={(value) => dispatch(setCoords({ lat: value.lat, lng: value.lng }))} />
                </MapContainer>
            </div>
            <div className="map__button">
                <div className="map__coords">
                    <div>
                        Latitude: {coords.lat?.toFixed(4)}, Longitude: {coords.lng?.toFixed(4)}
                    </div>
                </div>

                <Button text="save" variant="primary" onClick={() => saveHandler()} />
            </div>
        </div>
    );
};

export default Map;
