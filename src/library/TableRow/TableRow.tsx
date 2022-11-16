import { FC } from "react";
import { ILocation } from "../../models/location";

interface ITableRowProps {
    location: ILocation;
}

const TableRow: FC<ITableRowProps> = ({ location }) => {
    const { ip, coord_x, coord_y } = location;
    return (
        <div className="locations__row">
            <div className="locations__row__cell data-cell">{ip}</div>
            <div className="locations__row__cell data-cell">{coord_x.slice(0, 7)}</div>
            <div className="locations__row__cell data-cell">{coord_y.slice(0, 7)}</div>
        </div>
    );
};

export default TableRow;
