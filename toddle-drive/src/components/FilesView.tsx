import { useEffect } from "react";
import { DriveFile } from "../models/DriveFile";

import '../styles/foldersView.css';
import FileView from "./widgets/FileView";

interface Props {
    files: DriveFile[],
    props: Map<string, any>
}

export default function FilesView(props: Props) {
    const files = props.files;
    const searchInput: string = props.props.get("searchInput");
    const visibleCount = props.props.get("visibleFilesCount");
    const setVisibleCount = props.props.get("setVisibleFilesCount");

    let filesVisibleCount = 0;

    useEffect(() => {
        setVisibleCount(filesVisibleCount);
    });

    return (
        <div className="folders-root">
            <p className="header">{visibleCount} files</p>
            <div className="folders-view">
                {files.map((file, index) => {
                    if (searchInput.length == 0 || file.name.toLowerCase().startsWith(searchInput.toLowerCase())) {
                        ++filesVisibleCount;
                        return <FileView file={file} props={props.props} _key={index} key={index} />
                    }
                })}
            </div>
        </div>
    )
}