import { useEffect } from "react";
import { DriveFolder } from "../models/DriveFolder";

import '../styles/foldersView.css';
import FolderView from "./widgets/FolderView";

interface Props {
    folders: DriveFolder[],
    props: Map<string, any>
}

export default function FoldersView(props: Props) {
    const folders = props.folders;
    const searchInput: string = props.props.get("searchInput");
    const visibleCount = props.props.get("visibleFoldersCount");
    const setVisibleCount = props.props.get("setVisibleFoldersCount");

    let foldersVisibleCount = 0;

    useEffect(() => {
        setVisibleCount(foldersVisibleCount);
    });

    return (
        <div className="folders-root">
            <p className="header">{visibleCount} folders</p>
            <div className="folders-view">
                {folders.map((folder, index) => {
                    if (searchInput.length == 0 || folder.name.toLowerCase().startsWith(searchInput.toLowerCase())) {
                        ++foldersVisibleCount;
                        return <FolderView folder={folder} props={props.props} _key={index} key={index} />
                    }
                })}
            </div>
        </div>
    )
}