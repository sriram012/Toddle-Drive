import { PopupType } from "../../models/Types";
import '../../styles/headerView.css';

interface Props {
    props: Map<string, any>
}

export default function HeaderView(props: Props) {
    const _props = props.props;

    const numFiles = _props.get("filesLength");
    const numFolders = _props.get("foldersLength");

    const setupPopupData = (type: PopupType, name: string, mainHeader: string, inputHeader: string, inputPlaceholder: string, positiveButtonText: string) => {
        let createPopupData = _props.get("createPopupData");
        createPopupData["type"] = type;
        createPopupData["name"] = name;
        createPopupData["showCreatePopup"] = true;
        createPopupData["mainHeader"] = mainHeader;
        createPopupData["inputHeader"] = inputHeader;
        createPopupData["inputPlaceholder"] = inputPlaceholder;
        createPopupData["positiveButtonText"] = positiveButtonText;
        _props.get("setCreatePopupData")({...createPopupData});
    }

    function newFolderOnClick() {
        document.body.classList.add("noScroll");
        setupPopupData(PopupType.FOLDER_CREATE, "", "Create a new folder", "Name of the folder", "Enter folder name", "Create folder");
    }

    function newFileOnClick() {
        document.body.classList.add("noScroll");
        setupPopupData(PopupType.FILE_CREATE, "", "Create a new file", "Name of the file", "Enter file name & type", "Create file");
    }

    return (
        <div className="header-root">
            <div className="onboarding-title">
                <b>{_props.get("title")}</b>
            </div>
            <div className="create-buttons">
                <button className="new-folder" onClick={() => newFolderOnClick()}>New folder</button>
                <button className="new-file" onClick={() => newFileOnClick()}>New file</button>
            </div>
            <div className="count-display">
                <p>
                    {numFolders != 0 ? numFolders + " folders" : ""}
                    {numFiles != 0 ? ", " + numFiles + " files" : ""}
                </p>
            </div>
        </div>
    )
}