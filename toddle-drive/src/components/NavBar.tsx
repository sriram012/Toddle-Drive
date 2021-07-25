import '../styles/navbar.css';
import logo from "../images/FilePDFColored.png";
import { DriveFolder } from '../models/DriveFolder';

import bcGapIcon from '../images/Path (1).png';

interface Props {
    setCurrentDriveFolder: any,
    currentDriveFolder: DriveFolder
}

function NavBar(props: Props) {
    let currentDriveFolder = props.currentDriveFolder;
    let path = currentDriveFolder.path.split("/");

    const onBackButtonClicked = () => {
        if (props.currentDriveFolder.parent != null) {
            props.setCurrentDriveFolder([props.currentDriveFolder.parent]);
        }
    }

    const onBcClick = (index: number) => {
        let last = path.length-1;
        while (last-- > index) {
            if (currentDriveFolder.parent != null) {
                currentDriveFolder = currentDriveFolder.parent;
            }
        }
        props.setCurrentDriveFolder([currentDriveFolder]);
    }

    return (
        <nav>
            <button className="navBackButton" onClick={() => onBackButtonClicked()} />
            <img src={logo} className="logo" />
            <div className="bread-crumb">
                {path.map((name, index) => {
                    return (
                        <span className="bc-inner" key={index}>
                            <button className="bc-button" onClick={() => onBcClick(index)}>{name}</button>
                            {(index != path.length-1) ? <img src={bcGapIcon}/> : "" }
                        </span>
                    )
                })}
            </div>
        </nav>
    )
}

export default NavBar;