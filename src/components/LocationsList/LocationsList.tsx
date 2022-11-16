import { useEffect, useState } from "react";
import Modal from "../../library/Modal/Modal";
import TableRow from "../../library/TableRow/TableRow";
import Error from "../Error/Error";
import { ILocation } from "../../models/location";
import { getLocationsList } from "../../redux/locationsSlice";
import { RootState } from "../../redux/store";
import "./locationsList.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

const LocationsList = () => {
    const dispatch = useAppDispatch();
    const { locationsList, error } = useAppSelector((state: RootState) => state.locations);
    const { ip } = useAppSelector((state: RootState) => state.coord);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);

    useEffect(() => {
        dispatch(getLocationsList(ip));
    }, []);

    useEffect(() => {
        error && setIsErrorModalOpen(true);
    }, [error]);

    return (
        <div className="locations">
            <div className="locations__row">
                <div className="locations__row__cell">IP</div>
                <div className="locations__row__cell">Coord X</div>
                <div className="locations__row__cell">Coord Y</div>
            </div>
            {locationsList.length > 0 ? (
                locationsList.map((location: ILocation) => {
                    return <TableRow key={location.id} location={location} />;
                })
            ) : (
                <div>Loading...</div>
            )}
            {isErrorModalOpen && (
                <Modal title="Error" setIsOpen={setIsErrorModalOpen} size="small">
                    <Error message={error!} setIsOpen={setIsErrorModalOpen} />
                </Modal>
            )}
        </div>
    );
};

export default LocationsList;
