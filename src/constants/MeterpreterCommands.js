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
};

 const UserInterfaceCommands = {
  
};

 const WebcamCommands = {
  
};

 const AudioOutputCommands = {
  
};

 const ElevateCommands = {
  
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
    WebcamCommands: WebcamCommands,
    AudioOutputCommands: AudioOutputCommands,
    ElevateCommands: ElevateCommands,
    PasswordDatabaseCommands: PasswordDatabaseCommands,
    TimestompCommands: TimestompCommands,
}