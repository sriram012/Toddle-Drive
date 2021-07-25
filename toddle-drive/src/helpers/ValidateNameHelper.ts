const isEmpty = (name: String) => {
    return name.trim().length == 0;
}

const isFileNameValid = (name: String) => {
    const parts = name.split(".");
    const len = parts.length;
    return len > 1 && !isEmpty(parts[0])
            && (parts[len-1] == "pdf" || parts[len-1] == "ppt" || parts[len-1] == "docx");
}

export {
    isEmpty
}