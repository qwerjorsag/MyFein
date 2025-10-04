
import React from "react";
import "./Table.css"

interface OpeningHoursProps {
    opening_hours: {
        monday: string;
        tuesday: string;
        wednesday: string;
        thursday: string;
        friday: string;
        saturday: string;
        sunday: string;
    };
}

const OpeningHoursTable: React.FC<OpeningHoursProps> = ({ opening_hours }) => {
    return (
        <div className="center-table">
            <table>
                <thead>
                <tr>
                    <th></th>
                    <th>Otevřeno</th>
                    <th>Zavřeno</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td><strong>Pondělí:</strong></td>
                    <td>{opening_hours.monday.split(' - ')[0]}</td>
                    <td>{opening_hours.monday.split(' - ')[1]}</td>
                </tr>
                <tr>
                    <td><strong>Úterý:</strong></td>
                    <td>{opening_hours.tuesday.split(' - ')[0]}</td>
                    <td>{opening_hours.tuesday.split(' - ')[1]}</td>
                </tr>
                <tr>
                    <td><strong>Středa:</strong></td>
                    <td>{opening_hours.wednesday.split(' - ')[0]}</td>
                    <td>{opening_hours.wednesday.split(' - ')[1]}</td>
                </tr>
                <tr>
                    <td><strong>Čtvrtek:</strong></td>
                    <td>{opening_hours.thursday.split(' - ')[0]}</td>
                    <td>{opening_hours.thursday.split(' - ')[1]}</td>
                </tr>
                <tr>
                    <td><strong>Pátek:</strong></td>
                    <td>{opening_hours.friday.split(' - ')[0]}</td>
                    <td>{opening_hours.friday.split(' - ')[1]}</td>
                </tr>
                <tr>
                    <td><strong>Sobota:</strong></td>
                    <td>{opening_hours.saturday.split(' - ')[0]}</td>
                    <td>{opening_hours.saturday.split(' - ')[1]}</td>
                </tr>
                <tr>
                    <td><strong>Neděle:</strong></td>
                    <td>{opening_hours.sunday.split(' - ')[0]}</td>
                    <td>{opening_hours.sunday.split(' - ')[1]}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default OpeningHoursTable;
