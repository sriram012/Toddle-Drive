import { DriveFile } from "./DriveFile";
import { MainType } from "./Types";

export class DriveFolder {
    _name: string;
    _folders: Array<DriveFolder>;
    _files: Array<DriveFile>;
    _parent: DriveFolder | null;
    _type: MainType;
    _path: string;

    constructor(name: string, folders: Array<DriveFolder>, files: Array<DriveFile>, parent: DriveFolder | null, type: MainType, path: string) {
        this._name = name;
        this._folders = folders;
        this._files = files;
        this._parent = parent;
        this._type = type;
        this._path = path;
    }

    public get name() {
        return this._name;
    }
    public get folders() {
        return this._folders;
    }
    public get files() {
        return this._files;
    }
    public get parent() {
        return this._parent;
    }
    public get type() {
        return this._type;
    }
    public get path() {
        return this._path;
    }

    public set name(name) {
        this._name = name;
    }
    public set files(files) {
        this._files = files;
    }
    public set folders(folders) {
        this._folders = folders;
    }
    public set parent(parent) {
        this._parent = parent;
    }
    public set type(type) {
        this._type = type;
    }
    public set path(path) {
        this._path = path;
    }
}

export const getDriveFolderClone = (driveFolder: DriveFolder) => {
    return new DriveFolder(driveFolder.name, driveFolder.folders, driveFolder.files, driveFolder.parent, driveFolder.type, driveFolder.path);
}