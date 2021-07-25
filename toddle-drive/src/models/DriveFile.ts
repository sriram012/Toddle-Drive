import {FileType, MainType} from './Types';
import { DriveFolder } from './DriveFolder';

export class DriveFile {
    _name: string;
    _fileType: FileType;
    _parent: DriveFolder | null;
    _type: MainType;

    constructor(name: string, fileType: FileType, parent: DriveFolder | null, type: MainType) {
      this._name = name;
      this._fileType = fileType;
      this._parent = parent;
      this._type = type;
    }
  
    public get name() {
      return this._name;
    }
    public get fileType() {
      return this._fileType;
    }
    public get parent() {
      return this._parent;
    }
    public get type() {
      return this._type;
    }
  
    public set name(name) {
      this._name = name;
    }
    public set fileType(fileType) {
      this._fileType = fileType;
    }
    public set parent(parent) {
      this._parent = parent;
    }
    public set type(type) {
      this._type = type;
    }
}

export const getDriveFileClone = (driveFile: DriveFile) => {
  return new DriveFile(driveFile.name, driveFile.fileType, driveFile.parent, driveFile.type);
}