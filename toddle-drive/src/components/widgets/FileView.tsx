import '../../styles/foldersView.css';

import pptFileIcon from '../../images/FilePPTColored.png';
import pdfFileIcon from '../../images/FilePDFColored.png';
import FolderFileActionsPopup from './FolderFileActionPopup';
import { DriveFile } from '../../models/DriveFile';
import { FileType, MainType } from '../../models/Types';

interface Props {
    file: DriveFile
    props: Map<string, any>,
    _key: number
}

export default function File(props: Props) {
    let _props = props.props;
    const file = props.file;
    const key = _props.get("animateDelete")[0];
    const animateDelete = _props.get("animateDelete")[1];
    const animateType = _props.get("animateDelete")[2];

    const fileType = FileType[file.fileType];

    _props.set("key", props._key);

    return (
        <span className={"file-card " + ((animateType == MainType.FILE && key == props._key && animateDelete) ? "animate-delete " : "")}>
            <img src={pptFileIcon} />
            <div className="folder-actions">
                <span className="file-name">
                    <b className="file-type">{fileType}</b><br/>
                    <p>{file.name}</p>
                </span>
                {/* <span className="folder-button"><button><img src={dotsIcon} /></button></span> */}
                <FolderFileActionsPopup file={file} folder={null} props={_props} />
            </div>
        </span>
    )
}