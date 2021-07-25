import '../../styles/createView.css';

import cancelIcon from '../../images/Union.png';
import {isEmpty} from '../../helpers/ValidateNameHelper';
import { useState } from 'react';
import { DriveFolder } from '../../models/DriveFolder';
import { DriveFile } from '../../models/DriveFile';
import { FileType, MainType, PopupType } from '../../models/Types';

interface Props {
    props: Map<string, any>
}

export default function CreatePopupView(props: Props) {
    const _props = props.props
    const createPopupData = _props.get("createPopupData");
    let currentDriveFolder = _props.get("currentDriveFolder")[0];
    const setCurrentDriveFolder = _props.get("setCurrentDriveFolder");

    const [initialName, setInitialName] = useState(createPopupData["name"]);
    const [name, setName] = useState(initialName);

    if (initialName != createPopupData["name"]) {
        setInitialName(createPopupData["name"]);
        setName(createPopupData["name"]);
    }
    
    const [disablePositiveButton, setDisablePositiveButton] = useState(true);

    const dismissDialog = () => {
        setInitialName(name);
        setDisablePositiveButton(true);
        document.body.classList.remove("noScroll");
        createPopupData["showCreatePopup"] = false;
        _props.get("setCreatePopupData")({...createPopupData});
    }

    const onInputChange = (input: string) => {
        setName(input);
        setDisablePositiveButton(isEmpty(input));
    }

    // Create new folder
    const createNewFolder = () => {
        currentDriveFolder.folders.unshift(new DriveFolder(name, [], [], currentDriveFolder, MainType.FOLDER, currentDriveFolder.path + "/" + name));
        setCurrentDriveFolder([currentDriveFolder]);
    }

    // Create new file
    const createNewFile = () => {
        currentDriveFolder.files.unshift(new DriveFile(name, FileType.PDF, currentDriveFolder, MainType.FILE));
        setCurrentDriveFolder([currentDriveFolder]);
    }

    // Rename file
    const renameFile = () => {
        let file = createPopupData["element"];
        file.name = name;
    }

    const renameFolder = () => {
        createPopupData["element"].name = name;
    }

    // On positive button clicked
    const onPositiveButtonClick = () => {
        if (disablePositiveButton) {
            return;
        }
        
        switch (createPopupData["type"]) {
            case PopupType.FILE_CREATE:
                createNewFile();
                break;
            case PopupType.FOLDER_CREATE:
                createNewFolder();
                break;
            case PopupType.FILE_RENAME:
                renameFile();
                break;
            case PopupType.FOLDER_RENAME:
                renameFolder();
                break;

            default:
                break;
        }

        dismissDialog();
    }
    
    return (
        <div className={"create-root " + (createPopupData["showCreatePopup"] ? " display-inherit " : " display-none ")}>
            <div className="create-modal">
                <div className="create-header">
                    <h3>{createPopupData["mainHeader"]}</h3>
                    <img src={cancelIcon} className="cancel-icon" onClick={dismissDialog} />
                </div>

                <div className="create-body">
                    <h5>{createPopupData["inputHeader"]}</h5>
                    <input placeholder={createPopupData["inputPlaceholder"]} value={name} onChange={(e) => {onInputChange(e.target.value);}} />
                </div>

                <div className="create-actions">
                    <button className="create-negative" onClick={() => dismissDialog()}>Cancel</button>
                    <button className={"create-positive " + (disablePositiveButton ? "disabled " : "enabled ")}
                            onClick={() => {onPositiveButtonClick();}}>
                        {createPopupData["positiveButtonText"]}
                    </button>
                </div>
            </div>
        </div>
    )
}