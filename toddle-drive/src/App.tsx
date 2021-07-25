import './App.css';
import NavBar from './components/NavBar';
import DriveRootView from './components/DriveRootView';
import { useState } from 'react';

import {DriveFolder} from './models/DriveFolder';
import { DriveFile } from './models/DriveFile';
import { FileType, MainType, PopupType } from './models/Types';
import CreatePopupView from './components/widgets/CreatePopupView';
import DeleteConfirmPopup from './components/widgets/DeleteConfirmPopup';

function App() {
  // data population
  let rootDir = new DriveFolder("My documents", [], [], null, MainType.FOLDER, "My documents");
  rootDir.files.push(new DriveFile("Resume.pdf", FileType.PDF, rootDir, MainType.FILE));

  rootDir.folders.push(new DriveFolder("Trash", [], [], rootDir, MainType.FOLDER, rootDir.path + "/Trash"));
  rootDir.folders.push(new DriveFolder("Trash2", [], [], rootDir, MainType.FOLDER, rootDir.path + "/Trash2"));

  let folder = rootDir.folders[0];
  folder.folders.push(new DriveFolder("Trash inner", [], [], folder, MainType.FOLDER, folder.path + "/Trash inner"));
  folder.files.push(new DriveFile("ResumeInner.pdf", FileType.PDF, folder, MainType.FILE));
  // ----------------------------------------------------------------------------------------

  const [currentDriveFolder, setCurrentDriveFolder] = useState([rootDir]);

  // animation state
  const [animateDelete, setAnimateDelete] = useState([-1, false, null]);

  // Search input
  const [searchInput, setSearchInput] = useState("");

  // Create popup props
  let defaultCreatePopupData = {
    "type": null,
    "name": "",
    "showCreatePopup": false,
    "mainHeader": "",
    "inputHeader": "",
    "inputPlaceholder": "",
    "positiveButtonText": "",
    "element": null
  };
  const [createPopupData, setCreatePopupData] = useState(defaultCreatePopupData);
  let createPopupProps = new Map<string, any>();
  createPopupProps.set("createPopupData", createPopupData);
  createPopupProps.set("setCreatePopupData", setCreatePopupData);
  createPopupProps.set("currentDriveFolder", currentDriveFolder);
  createPopupProps.set("setCurrentDriveFolder", setCurrentDriveFolder);

  //Delete popup props
  let defaultDeletePopupData = {
    "type": null,
    "showDeletePopup": false,
    "element": null
  };
  const [deletePopupData, setDeletePopupData] = useState(defaultDeletePopupData);
  let deletePopupProps = new Map<string, any>();
  deletePopupProps.set("deletePopupData", deletePopupData);
  deletePopupProps.set("setDeletePopupData", setDeletePopupData);
  deletePopupProps.set("setCurrentDriveFolder", setCurrentDriveFolder);
  deletePopupProps.set("animateDelete", animateDelete);
  deletePopupProps.set("setAnimateDelete", setAnimateDelete);

  // RootView props
  let rootViewProps = new Map<string, any>();
  rootViewProps.set("currentDriveFolder", currentDriveFolder);
  rootViewProps.set("setCurrentDriveFolder", setCurrentDriveFolder);
  rootViewProps.set("createPopupData", createPopupData);
  rootViewProps.set("setCreatePopupData", setCreatePopupData);
  rootViewProps.set("deletePopupData", deletePopupData);
  rootViewProps.set("setDeletePopupData", setDeletePopupData);
  rootViewProps.set("animateDelete", animateDelete);
  rootViewProps.set("setAnimateDelete", setAnimateDelete);
  rootViewProps.set("searchInput", searchInput);
  rootViewProps.set("setSearchInput", setSearchInput);

  // console.log(currentDriveFolder);
  
  return (
    <div className="App">
      <CreatePopupView props={createPopupProps} />
      <DeleteConfirmPopup props={deletePopupProps} />
      <NavBar setCurrentDriveFolder={setCurrentDriveFolder} currentDriveFolder={currentDriveFolder[0]} />
      <DriveRootView props={rootViewProps} />
    </div>
  );
}

export default App;
