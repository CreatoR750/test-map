import { FC, useEffect, useMemo, useRef, useState } from "react";
import { Marker } from "react-leaflet";
import { ICoords } from "../../models/coord";

interface ISelectMarkerProps {
    onValueChange: (value: any) => void;
    center: ICoords;
}

const SelectMarker: FC<ISelectMarkerProps> = ({ onValueChange, center }) => {
    const [position, setPosition] = useState<ICoords>(center);
    const markerRef = useRef(null);

    useEffect(() => {
        onValueChange(position);
    }, [position]);

    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current as any;
                if (marker != null) {
                    setPosition(marker.getLatLng());
                }
            },
        }),
        []
    );

    return <Marker draggable={true} eventHandlers={eventHandlers} position={position} ref={markerRef}></Marker>;
};

export default SelectMarker;
