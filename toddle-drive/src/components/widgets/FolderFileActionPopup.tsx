import '../../styles/foldersView.css';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit, faFile, faTrashAlt} from '@fortawesome/free-regular-svg-icons';

import dotsIcon from '../../images/DotsVerticalO.png';
import { MainType, PopupType } from '../../models/Types';
import { DriveFolder, getDriveFolderClone } from '../../models/DriveFolder';
import { DriveFile, getDriveFileClone } from '../../models/DriveFile';

interface Props {
    folder: DriveFolder | null,
    file: DriveFile | null,
    props: Map<string, any>
}

export default function FolderFileActionsPopup(props: Props) {
    const _props = props.props;
    const setCurrentDriveFolder = _props.get("setCurrentDriveFolder");
    let folder = props.folder;
    let file = props.file;
    const setAnimateDelete = _props.get("setAnimateDelete");
    const key = _props.get("key");

    const setCreatePopupData = (type: PopupType, mainHeader: string, inputHeader: string, name: string,
                            inputPlaceholder: string, positiveButtonText: string, element: DriveFolder | DriveFile) => {
        let createPopupData = _props.get("createPopupData");
        createPopupData["type"] = type;
        createPopupData["name"] = name;
        createPopupData["showCreatePopup"] = true;
        createPopupData["mainHeader"] = mainHeader;
        createPopupData["inputHeader"] = inputHeader;
        createPopupData["inputPlaceholder"] = inputPlaceholder;
        createPopupData["positiveButtonText"] = positiveButtonText;
        createPopupData["element"] = element;
        _props.get("setCreatePopupData")({...createPopupData});
    }

    const setDeletePopupData = (type: MainType, element: DriveFolder | DriveFile) => {
        let deletePopupData = _props.get("deletePopupData");
        deletePopupData["type"] = type;
        deletePopupData["showDeletePopup"] = true;
        deletePopupData["element"] = element;
        _props.get("setDeletePopupData")({...deletePopupData});
        setAnimateDelete([key, false, type]);
    }

    // Renaming
    const renameFile = () => {
        if (file != null) {
            document.body.classList.add("noScroll");
            setCreatePopupData(PopupType.FILE_RENAME, "Rename file", "Name of the file", file.name, "Enter file name", "Rename file", file);
        }
    }
    const renameFolder = () => {
        if (folder != null) {
            document.body.classList.add("noScroll");
            setCreatePopupData(PopupType.FOLDER_RENAME, "Rename folder", "Name of the folder", folder.name, "Enter folder name", "Rename folder", folder);
        }
    }

    // Duplicating
    const cloneFile = () => {
        if (file != null && file.parent != null) {
            file.parent.files.unshift(getDriveFileClone(file));
            setCurrentDriveFolder([file.parent]);
        }
    }
    const cloneFolder = () => {
        if (folder != null && folder.parent != null) {
            folder.parent.folders.push(getDriveFolderClone(folder));
            setCurrentDriveFolder([folder.parent]);
        }
    }

    // Deleting
    const deleteFile = () => {
        if (file != null) {
            document.body.classList.add("noScroll");
            setDeletePopupData(MainType.FILE, file);
        }
    }
    const deleteFolder = () => {
        if (folder != null) {
            document.body.classList.add("noScroll");
            setDeletePopupData(MainType.FOLDER, folder);
        }
    }

    const isFile = () => {
        return props.file != null;
    }

    return (
        <Dropdown className="folder-button">
            <Dropdown.Toggle id="dropdown-basic">
                <img src={dotsIcon} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={() => {isFile() ? renameFile() : renameFolder()}}>
                    <FontAwesomeIcon icon={faEdit} className="icon rename" />
                    Rename{isFile() ? " file" : " folder"}
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => {isFile() ? cloneFile() : cloneFolder()}}>
                    <FontAwesomeIcon icon={faFile} className="icon duplicate" />
                    Duplicate{isFile() ? " file" : " folder"}
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className="delete" onClick={() => {isFile() ? deleteFile() : deleteFolder()}}>
                    <FontAwesomeIcon icon={faTrashAlt} className="icon delete" />
                    Delete{isFile() ? " file" : " folder"}
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}