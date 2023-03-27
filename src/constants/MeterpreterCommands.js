const CoreCommands = {
    GUID: "guid",
    INFO: "info",
};

 const FileSystemCommands = {
    CAT: "cat",
    GETLWD: "getlwd",
    GETWD: "getwd",
    LS: "ls",
    CD:"cd",
    DOWNLOAD: "download",
    RM: "rm",
    RMDIR: "rmdir",
    MKDIR: "mkdir",
    MV: "mv",
    CHECKSUM: "checksum",
    CP: "cp",
    SHOW_MOUNT: "show_mount",
    LCD: "lcd",
    LLS: "lls",
    LPWD: "lpwd",
    GETLWD: "getlwd",
    UPLOAD: "upload",
};

 const NetworkingCommands = {
    GETLWD: "getlwd",
    GETWD: "getwd",
    LS: "ls",
    IPCONFIG: "ipconfig",
    ARP: "arp",
    ROUTE: "route",
    GETPROXY: "getproxy",
    NETSTAT: "netstat"
};

 const SystemCommands = {
    LOCALTIME: "localtime",
    PS: "ps",
    GETPID: "getpid",
    SYSINFO: "sysinfo",
    KILL: "kill",
    SHUTDOWN: "shutdown",
    REBOOT: "reboot",
};

 const UserInterfaceCommands = {
    KEYBOARD_SEND: "keyboard_send", 
    KEYEVENT: "keyevent", 
    KEYSCAN_DUMP: "keyscan_dump",
    KEYSCAN_START: "keyscan_start",
    KEYSCAN_STOP: "keyscan_stop",
    MOUSE: "mouse",
    UICTL: "uictl",
    IDLETIME: "idletime",
};

 const PasswordDatabaseCommands = {
    HASHDUMP: "hashdump",
};

 const TimestompCommands = {
    TIMESTOMP: "timestomp",
};

export default {
    CoreCommands: CoreCommands,
    FileSystemCommands: FileSystemCommands,
    NetworkingCommands: NetworkingCommands,
    SystemCommands: SystemCommands,
    UserInterfaceCommands: UserInterfaceCommands,
    PasswordDatabaseCommands: PasswordDatabaseCommands,
    TimestompCommands: TimestompCommands,
}