import { MainType } from "../../models/Types";

import { DriveFile } from "../../models/DriveFile";
import { DriveFolder } from "../../models/DriveFolder";

interface Props {
    props: Map<string, any>
}

export default function DeleteConfirmPopup(props: Props) {
    let _props = props.props;

    let deletePopupData = _props.get("deletePopupData");
    let element = deletePopupData["element"];
    const setCurrentDriveFolder = _props.get("setCurrentDriveFolder");
    const isFile = deletePopupData["type"] == MainType.FILE;
    let animateDelete = _props.get("animateDelete");
    const setAnimateDelete = _props.get("setAnimateDelete");

    const dismissDialog = () => {
        document.body.classList.remove("noScroll");
        deletePopupData["showDeletePopup"] = false;
        _props.get("setDeletePopupData")({...deletePopupData});
    }

    const deleteFile = () => {
        let parent = element.parent;
        parent.files.splice(parent.files.findIndex((_file: DriveFile) => _file === element), 1);
        setCurrentDriveFolder([parent]);
    }

    const deleteFolder = () => {
        let parent = element.parent;
        parent.folders.splice(parent.folders.findIndex((_folder: DriveFolder) => _folder === element), 1);
        setCurrentDriveFolder([parent]);
    }

    const onDeleteButtonClick = () => {
        if (element != null && element.parent != null) {
            animateDelete[1] = true;
            setAnimateDelete(animateDelete);
            if (deletePopupData["type"] == MainType.FILE) {
                setTimeout(() => {deleteFile(); setAnimateDelete([-1, false, null]);}, 400);
            } else if (deletePopupData["type"] == MainType.FOLDER) {
                setTimeout(() => {deleteFolder(); setAnimateDelete([-1, false, null]);}, 400);
            }
        }

        dismissDialog();
    }

    return (
        <div className={"create-root " + (deletePopupData["showDeletePopup"] ? " display-inherit " : " display-none ")}>
            <div className="create-modal">
                <div className="create-header">
                    <h3 className="delete-header">Delete {element?.name + (isFile ? " file" : " folder")}?</h3>
                </div>

                <div className="create-body">
                    <p className="delete-body">Are you sure you want to delete this {(isFile ? " file" : " folder")}? This is a permanent action and can't be undone.</p>
                </div>

                <div className="create-actions">
                    <button className="delete-button" onClick={() => {onDeleteButtonClick();}}>
                        Delete{(isFile ? " file" : " folder")}
                    </button>
                    <button className="create-negative" onClick={() => dismissDialog()}>Cancel</button>
                </div>
            </div>
        </div>
    )
}