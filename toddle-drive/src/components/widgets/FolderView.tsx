import '../../styles/foldersView.css';

import folderIcon from '../../images/Rectangle Copy 9.png';
import FolderFileActionsPopup from './FolderFileActionPopup';
import { DriveFolder } from '../../models/DriveFolder';
import { MainType } from '../../models/Types';

interface Props {
    folder: DriveFolder,
    props: Map<string, any>,
    _key: number
}

export default function FolderView(props: Props) {
    let _props = props.props;
    const folder = props.folder;
    const key = _props.get("animateDelete")[0];
    const animateDelete = _props.get("animateDelete")[1];
    const animateType = _props.get("animateDelete")[2];

    const onImageClick = () => {
        _props.get("setSearchInput")("");
        _props.get("setCurrentDriveFolder")([folder]);
    }
    
    _props.set("key", props._key);

    return (
        <span className={"folder-card " + ((animateType == MainType.FOLDER && key == props._key && animateDelete) ? "animate-delete " : "")}>
            <img src={folderIcon} onClick={onImageClick} />
            <div className="folder-actions">
                <span className="folder-name">
                    <p>{props.folder.name}</p>
                </span>
                {/* <span className="folder-button"><button><img src={dotsIcon} /></button></span> */}
                <FolderFileActionsPopup folder={folder} file={null} props={_props} />
            </div>
        </span>
    )
}