import { useState } from 'react';
import'../styles/rootView.css';
import FilesView from './FilesView';
import FoldersView from './FoldersView';
import HeaderView from './widgets/HeaderView';
import SearchBarView from './widgets/SearchBarView';

interface Props {
    props: Map<string, any>
}

export default function DriveRootView(props: Props) {
    const _props = props.props;

    let driveFolder = _props.get("currentDriveFolder")[0];

    const [visibleFoldersCount, setVisibleFoldersCount] = useState(0);
    const [visibleFilesCount, setVisibleFilesCount] = useState(0);

    // Header view props
    let headerViewProps = new Map<string, any>();
    headerViewProps.set("createPopupData", _props.get("createPopupData"));
    headerViewProps.set("setCreatePopupData", _props.get("setCreatePopupData"));
    headerViewProps.set("foldersLength", visibleFoldersCount);
    headerViewProps.set("filesLength", visibleFilesCount);
    headerViewProps.set("title", driveFolder.name);

    // Files Folders props
    _props.set("visibleFoldersCount", visibleFoldersCount);
    _props.set("setVisibleFoldersCount", setVisibleFoldersCount);
    _props.set("visibleFilesCount", visibleFilesCount);
    _props.set("setVisibleFilesCount", setVisibleFilesCount);

    return (
        <div className="rootView">
            <HeaderView props={headerViewProps} />
            <SearchBarView searchInput={_props.get("searchInput")} setSearchInput={_props.get("setSearchInput")}/>
            <FoldersView folders={driveFolder.folders} props={_props} />
            <FilesView files={driveFolder.files} props={_props} />
        </div>
    )
}