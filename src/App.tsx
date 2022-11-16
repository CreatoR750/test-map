import { useEffect, useState } from "react";
import "./App.scss";
import Button from "./library/Button/Button";
import Error from "./components/Error/Error";
import Modal from "./library/Modal/Modal";
import LocationsList from "./components/LocationsList/LocationsList";
import Map from "./components/Map/Map";
import { RootState } from "./redux/store";
import { getIpAddress } from "./redux/coordSlice";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";

function App() {
    const dispatch = useAppDispatch();
    const { error } = useAppSelector((state: RootState) => state.coord);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);
    const [isMapOpen, setIsMapOpen] = useState<boolean>(false);
    const [isLocationsOpen, setIsLocationsOpen] = useState<boolean>(false);

    const getIp = async () => {
        dispatch(getIpAddress());
    };

    useEffect(() => {
        getIp();
    }, []);

    useEffect(() => {
        error && setIsErrorModalOpen(true);
    }, [error]);

    return (
        <div className="container">
            <div className="buttons-wrapper">
                <Button
                    text="open map"
                    variant="primary"
                    onClick={() => {
                        setIsMapOpen(true);
                    }}
                />
                <Button
                    text="show locations"
                    variant="outlined"
                    onClick={() => {
                        setIsLocationsOpen(true);
                    }}
                />
            </div>

            {isMapOpen && (
                <Modal title="Transparenterra community map" setIsOpen={setIsMapOpen} size="large">
                    <Map />
                </Modal>
            )}
            {isLocationsOpen && (
                <Modal title="List of locations" setIsOpen={setIsLocationsOpen} size="small">
                    <LocationsList />
                </Modal>
            )}
            {isErrorModalOpen && (
                <Modal title="Error" setIsOpen={setIsErrorModalOpen} size="small">
                    <Error message={error!} setIsOpen={setIsErrorModalOpen} />
                </Modal>
            )}
        </div>
    );
}

export default App;
