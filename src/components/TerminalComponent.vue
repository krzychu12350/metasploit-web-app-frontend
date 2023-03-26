<template>
  <v-shell
    id="terminal"
    class=""
    :banner="banner"
    :shell_input="send_to_terminal"
    :commands="commands"
    @shell_output="setPrompt"
  ></v-shell>
</template>

<script setup>
import ConsoleDataService from "../services/ConsoleDataService";
import { ref, reactive, onBeforeMount, onMounted, onUnmounted, watch, inject } from "vue";
import useEventsBus from "../composables/eventBus";
import { useMsfConsoles } from "../stores/useMsfConsoles";
import { useCurrentMsfRpcConnection } from "../stores/useCurrentMsfRpcConnection";
import { useCurrentConsole } from "../stores/useCurrentConsole";
import ToastService from "../services/ToastService";
import { useRouter } from "vue-router";

const { bus, emit } = useEventsBus();
const currentTerminal = ref(0);
const useConsoles = useMsfConsoles();
const useCurrentMetasploitRpcConnection = useCurrentMsfRpcConnection();
const useCurrentConsoleId = useCurrentConsole();
const currentRpcConnectionId = ref(
  useCurrentMetasploitRpcConnection.getCurrentRpcConnection.id
);
const isNmapScanRunning = ref(false);
const router = useRouter();
const $loading = inject("$loading");
const send_to_terminal = ref("");
const banner = reactive({
  header: "Metasploit Shell",
  subHeader: "Metasploit Shell is pure power just enjoy 🔥",
  helpHeader: 'Enter "?" for more information.',
  emoji: {
    first: "☠️",
    second: "💀",
    time: 750,
  },
  sign: `msf >`,
  img: {
    align: "left",
    //link: "https://www.nicepng.com/png/full/24-249625_metasploit-logo.png",
    link: "/logo.svg",
    width: 100,
    height: 100,
  },
});
const commands = reactive([
  {
    name: "info",
    get() {
      let dataa = { console_id: currentTerminal.value, input_command: "help" };
      writeDataToConsole(dataa);
      readDataFromConsole(currentTerminal.value);
      return "";
    },
  },
  {
    name: "uname",
    get() {
      return navigator.appVersion;
    },
  },
  {
    name: "help",
    get() {
      console.log("dziala");
      return "test1234";
    },
  },
  {
    name: "clearTerminal",
    get() {
      console.log("dziala");
      return `clear \n`;
    },
  },
]);

/*
export default {
  name: "App",
  data() {
    return {
      send_to_terminal: "",
      banner: {
        header: "Metasploit Shell",
        subHeader: "Metasploit Shell is pure power just enjoy 🔥",
        helpHeader: 'Enter "help" for more information.',
        /*
        emoji: {
          first: "☠️",
          second: "💀",
          time: 750,
        },
        sign: `msf >`,
        img: {
          align: "left",
          link: "https://www.nicepng.com/png/full/24-249625_metasploit-logo.png",
          width: 100,
          height: 100,
        },
      },
      commands: [
        {
          name: "info",
          get() {
            return `<p>Shell to interacte with metasploit.</p>`;
          },
        },
        {
          name: "uname",
          get() {
            return navigator.appVersion;
          },
        },
      ],
    };
  },
  methods: {
    prompt(value) {
      if (value.trim() === "ifconfig") {
        this.send_to_terminal = `\n\n`;

        this.send_to_terminal = `
    Wi-Fi wireless network card:

    Local link IPv6 address. . . : fe80 :: 340f: 6f02: 41e9: 477b% 24
    IPv4 address. . . . . . . . .: 192.168.1.2
    Subnet mask. . . . . . . . . : 255.255.255.0
    Default Gateway. . . . . . . : 192.168.1.1`;

      } else if (value.trim() === "test") {
        this.send_to_terminal = `dddddddddddddddddd`;
      } else {
        this.send_to_terminal = `'${value}' is not recognized as an internal command or external,
an executable program or a batch file`;
      }
    },
    createConsole() {
      ConsoleDataService.create().then((res) => {
        console.log(res.data);
      });
    },
    writeDataToConsole(data) {
      ConsoleDataService.write(data).then((res) => {
        console.log(res.data.data);
        //const test = "dddd";
        //this.send_to_terminal = `<p>` + res.data.data + `</p>`;
      });
    },
    async readDataFromConsole(id) {
      let data = { console_id: id };
      await ConsoleDataService.read(data).then((res) => {
        console.log(res.data.data);
        //const test = "dddd";
        this.send_to_terminal = `<p>` + res.data.data.data + `</p>`;
      });
    },
  },
  mounted() {
    //this.createConsole();
    let data = { console_id: 60, input_command: "version" };
    this.writeDataToConsole(data);
    //this.readDataFromConsole(51);
    //this.send_to_terminal = `<p>Shell to interacte with metasploit.</p>`;
    //this.shell_output = `<p>Initailize</p>`;
    this.prompt("ifconfig");
  },
};
*/
async function createConsole() {
  return ConsoleDataService.create()
    .then((res) => {
      console.log(res.data);
      return res.data.data;
    })
    .catch((err) => console.log(err));
}

async function writeDataToConsole(data) {
  ConsoleDataService.write(data).then((res) => {
    console.log(res.data.data);
    //const test = "dddd";
    //this.send_to_terminal = `<p>` + res.data.data + `</p>`;
  });
}

function getNmapResult(nmapResultData) {
  const splicedNmapResultArray = nmapResultData.split("\n");
  const noEmptyStrings = splicedNmapResultArray.filter((str) => str !== "");
  console.log(noEmptyStrings.slice(-1)[0].slice(4));
  return noEmptyStrings.slice(-1)[0].slice(4);
}

async function readDataFromConsole(id) {
  //commands = "clear \n";
  let data = { console_id: id };
  return ConsoleDataService.read(data).then((res) => {
    console.log(res.data.data);
    const responseData = res.data.data;
    console.log(isNmapScanRunning.value);
    if (
      isNmapScanRunning.value === true &&
      responseData.data.includes("Nmap: Nmap done")
    ) {
      //alert(responseData.data);
      /*
      let splicedNmapResultArray = responseData.data.split("\n");
      const noEmptyStrings = splicedNmapResultArray.filter((str) => str !== "");
      console.log(noEmptyStrings.slice(-1)[0].slice(4));
      */
      let nmapResultMessage = getNmapResult(responseData.data);
      emit("refreshHosts");
      ToastService.showToast(nmapResultMessage);
      isNmapScanRunning.value = false;
    }
    setTimeout(() => {
      send_to_terminal.value = "<p>" + responseData.data + "</p>";
      //const test = "dddd";
      //banner.sign = "dddd >";
      //console.log("`" + String(res.data.data.prompt) + "`");

      //banner.value.sing = "`" + res.data.data.prompt + "`";
      //console.log(send_to_terminal.value);
      const terminalDiv = document.getElementById("terminal").innerHTML;
      //console.log(terminalDiv);
      useConsoles.storeConsoleData(id, responseData.data, currentRpcConnectionId.value);
      banner.sign = responseData.prompt;
      setTimeout(() => {
        if (responseData.busy === true) readDataFromConsole(id);
      }, 1000);
      //console.log(banner);
      return responseData.data;
      //console.log(res.data.data.busy);
    }, 200);
    return responseData.data;
  });
}

function getConsoleList() {
  return ConsoleDataService.list()
    .then((res) => {
      console.log(res.data.data.consoles);
      return res.data.data.consoles;
    })
    .catch((err) => console.log(err));
}

async function setPrompt(value) {
  if (value.trim() === "ifconfig") {
    send_to_terminal.value = `\n\n`;
    /*
    this.send_to_terminal = `
    Wi-Fi wireless network card:

    Local link IPv6 address. . . : fe80 :: 340f: 6f02: 41e9: 477b% 24
    IPv4 address. . . . . . . . .: 192.168.1.2
    Subnet mask. . . . . . . . . : 255.255.255.0
    Default Gateway. . . . . . . : 192.168.1.1`;
    */
  } else if (value.trim() === "help") {
    send_to_terminal.value = `dddddddddddddddddd`;
  } else {
    let dataa = { console_id: currentTerminal.value, input_command: value };
    console.log(dataa.console_id);
    writeDataToConsole(dataa);
    //currentTerminal.value = dataa.console_id;
    //currentTerminal.value = 1;
    await readDataFromConsole(currentTerminal.value);

    send_to_terminal.value = ``;
    /*
    send_to_terminal.value = `'${value}' is not recognized as an internal command or external,
an executable program or a batch file`;
*/
  }
}
const allConsoles = ref([]);
onMounted(() => {});
onUnmounted(() => {});

async function storeAllConsoleData() {
  allConsoles.value.forEach(async (c) => {
    console.log(parseInt(c.id));
    await useConsoles.storeConsoleData(parseInt(c.id), "", currentRpcConnectionId.value);
  });
}

onMounted(async () => {
  allConsoles.value = await getConsoleList();

  await storeAllConsoleData();
  emit("refreshTabs");
  emit("setMaxConsoleId");
  useCurrentConsoleId.setCurrentConsoleId(currentTerminal.value);
  console.log(currentTerminal.value);
  emit("changeCurrentConsole", { console_id: currentTerminal.value });
  await readDataFromConsole(currentTerminal.value);
  //this.createConsole();
  //emit("changeCurrentConsole", { console_id: currentTerminal.value });
  let data = { console_id: currentTerminal.value, input_command: "version" };
  //writeDataToConsole(data);
  setPrompt("ifconfig");
});

watch(
  () => bus.value.get("setMaxConsoleId"),
  async () => {
    allConsoles.value = await getConsoleList();
    currentTerminal.value = await Math.max.apply(
      Math,
      allConsoles.value.map(function (c) {
        return c.id;
      })
    );
    emit("changeCurrentConsole", { console_id: currentTerminal.value });
  }
);

watch(
  () => bus.value.get("changeCurrentConsole"),
  (data) => {
    const input = document.getElementsByClassName("cmdline");
    //input.click();
    // input.value = "clear";
    input[0].click();

    input[0].click();
    input[0].click();
    input[0].click();
    input[0].click();
    input[0].click();

    input[0].click();
    input[0].click();
    console.log(input[0]);
    //input.click();
    //send_to_terminal.value = "<br /><br />";
    //display current terminal id
    //alert(data[0].console_id);
    //console.log(commands[3].get());
    currentTerminal.value = data[0].console_id;
    useCurrentConsoleId.setCurrentConsoleId(currentTerminal.value);
    //send_to_terminal.value = `\n\n`;
    //const cmdline = document.getElementsByClassName("cmdline");
    //console.log(cmdline);
    //cmdline[cmdline.length - 1].value = "clear";
    //clear current console data
    const consoles = useConsoles.getMsfConsoles(currentRpcConnectionId.value);
    console.log(consoles);
    const isConsoleIdAlreadyExist = consoles.some((console) => {
      console.console_id == currentTerminal.value;
    });
    console.log(isConsoleIdAlreadyExist);
    if (isConsoleIdAlreadyExist === false)
      useConsoles.storeConsoleData(
        currentTerminal.value,
        "",
        currentRpcConnectionId.value
      );

    const currentTerminalData = consoles.find(
      (c) => parseInt(c.console_id) === parseInt(currentTerminal.value)
    ).console_data;
    console.log(currentTerminalData);

    send_to_terminal.value = `<p>` + currentTerminalData + `</p>`;
    //ToastService.showToast("Changed current console to Console " + currentTerminal.value);
  }
);

watch(
  () => bus.value.get("runNmapScan"),
  async (data) => {
    isNmapScanRunning.value = true;
    const loader = $loading.show();
    //alert("nmap scan");
    const nmapCommand = data[0].nmap_command;
    const createdConsoleData = await createConsole();
    currentTerminal.value = createdConsoleData.id;
    useCurrentConsoleId.setCurrentConsoleId(currentTerminal.value);
    emit("refreshTabs");
    //alert(createdConsoleData.id);
    let dataa = {
      console_id: currentTerminal.value,
      //input_command: "db_nmap -v -sF -Pn -O 192.168.1.0/24",
      input_command: nmapCommand,
    };
    writeDataToConsole(dataa);
    await readDataFromConsole(currentTerminal.value);

    ToastService.showToast("Nmap scan started successfully");
    loader.hide();
  }
);

function setOptions(options) {
  Object.keys(options).forEach((key) => {
    if (options[key]) {
      console.log(key, options[key]);
      writeDataToConsole({
        console_id: currentTerminal.value,
        input_command: "set " + key + " " + options[key],
      });
    }
  });
}

watch(
  () => bus.value.get("runModule"),
  async (data) => {
    const loader = $loading.show();
    let runningModuleCommand = "";
    console.log(data);
    const moduleDetails = data[0].module_details;
    const moduleOptions = data[0].module_options;
    const payloadOptions = data[0].payload_options;
    console.log(moduleDetails.fullname);
    console.log(moduleOptions, payloadOptions);

    const createdConsoleData = await createConsole();
    emit("refreshTabs");
    currentTerminal.value = createdConsoleData.id;
    useCurrentConsoleId.setCurrentConsoleId(currentTerminal.value);
    writeDataToConsole({
      console_id: currentTerminal.value,
      input_command: "use " + moduleDetails.fullname,
    });
    setOptions(moduleOptions);
    readDataFromConsole(currentTerminal.value);
    if (moduleOptions.PAYLOAD) {
      //alert("jest payload");
      setOptions(payloadOptions);
      runningModuleCommand = "run -j";
      router.push("/jobs");
    } else {
      runningModuleCommand = "run";
      router.push("/");
    }
    /*
    writeDataToConsole({
      console_id: currentTerminal.value,
      input_command: "options",
    });
    writeDataToConsole({
      console_id: currentTerminal.value,
      input_command: "advanced",
    });
    */
    writeDataToConsole({
      console_id: currentTerminal.value,
      input_command: runningModuleCommand,
    });

    emit("completeModuleRunningProcess", { module_name: moduleDetails.fullname });
    const test = readDataFromConsole(currentTerminal.value);
    console.log(test);
    loader.hide();
  }
);

async function getDataFromConsole(consoleId) {
  return ConsoleDataService.read({ console_id: consoleId })
    .then((res) => {
      console.log(res.data.data);
      return res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

async function manageHost(hostIpAddress, operationType) {
  const loader = $loading.show();
  let commandParametr = "";
  const createdConsole = await createConsole();
  emit("refreshTabs");
  //console.log(createdConsole);
  currentTerminal.value = createdConsole.id;
  useCurrentConsoleId.setCurrentConsoleId(currentTerminal.value);
  console.log(currentTerminal.value);
  readDataFromConsole(currentTerminal.value);

  if (operationType === "add") commandParametr = "-a";
  else if (operationType === "delete") commandParametr = "-d";

  writeDataToConsole({
    console_id: createdConsole.id,
    input_command: "hosts " + commandParametr + " " + hostIpAddress,
  });

  const dataReadFromConsole = await getDataFromConsole(createdConsole.id);
  console.log(dataReadFromConsole);
  if (operationType === "add") {
    if (
      dataReadFromConsole.data.includes(
        "address  mac  name  os_name  os_flavor  os_sp  purpose  info  comments"
      )
    )
      ToastService.showToast("Added host " + hostIpAddress);
    else ToastService.showToast(dataReadFromConsole.data, "error");
  } else if (operationType === "delete") {
    //alert("del");
    if (dataReadFromConsole.data.includes("[*] Deleted 1 hosts"))
      ToastService.showToast("Deleted host " + hostIpAddress);
    else ToastService.showToast(dataReadFromConsole.data, "error");
  }
  emit("refreshHosts");
  loader.hide();
}

watch(
  () => bus.value.get("addNewHost"),
  async (data) => {
    const hostIpAddress = data[0].host_ip_address;
    console.log(hostIpAddress);
    await manageHost(hostIpAddress, "add");
  }
);

watch(
  () => bus.value.get("deleteHost"),
  async (data) => {
    const hostIpAddress = data[0].host.address;
    console.log(hostIpAddress);
    await manageHost(hostIpAddress, "delete");
  }
);

function replaceAllBackslashes(string, replacement) {
  return string.replaceAll("\\", replacement);
}

async function manageWorkspaceData(operationSettings) {
  let fileExtenstion = "";
  let operationCommand = "";

  if (operationSettings.file_type === "xml") fileExtenstion = "xml";
  else if (operationSettings.file_type === "pwdump") fileExtenstion = "txt";

  if (operationSettings.operation_type === "export") {
    operationCommand =
      "db_export -f " +
      operationSettings.file_type +
      " -a " +
      replaceAllBackslashes(operationSettings.file_dir, "/") +
      "/" +
      operationSettings.file_name +
      "." +
      fileExtenstion;
  } else if (operationSettings.operation_type === "import") {
    operationCommand =
      "db_import " +
      replaceAllBackslashes(operationSettings.file_dir, "/") +
      "/" +
      operationSettings.file_name +
      "." +
      fileExtenstion;
  }

  console.log(operationCommand);

  const loader = $loading.show();
  let commandParametr = "";
  const createdConsole = await createConsole();
  emit("refreshTabs");
  currentTerminal.value = createdConsole.id;
  useCurrentConsoleId.setCurrentConsoleId(currentTerminal.value);
  console.log(currentTerminal.value);
  readDataFromConsole(currentTerminal.value);

  writeDataToConsole({
    console_id: createdConsole.id,
    input_command: operationCommand,
  });
  let dataReadFromConsole = await getDataFromConsole(createdConsole.id);
  if (operationSettings.operation_type === "export") {
    if (dataReadFromConsole.data.includes("Starting export of workspace default to"))
      ToastService.showToast("Exporting data...");
    else ToastService.showToast(dataReadFromConsole.data, "error");
  } else if (operationSettings.operation_type === "import") {
    if (dataReadFromConsole.data.includes("Importing host"))
      ToastService.showToast("Importing data...");
    else ToastService.showToast(dataReadFromConsole.data.slice(4), "error");
  }

  loader.hide();
}

watch(
  () => bus.value.get("exportDataFromWorkspace"),
  async (data) => {
    const exportingSettings = data[0].exporting_settings;
    exportingSettings.operation_type = "export";
    await manageWorkspaceData(exportingSettings);
  }
);

watch(
  () => bus.value.get("importDataIntoWorkspace"),
  async (data) => {
    const importingSettings = data[0].importing_settings;
    importingSettings.operation_type = "import";
    await manageWorkspaceData(importingSettings);
    emit("refreshHosts");
  }
);

watch(
  () => bus.value.get("runConsoleScript"),
  async (data) => {
    const scriptData = data[0].script_data;
    //alert(scriptData.file_abs_path);
    const loader = $loading.show();
    const createdConsoleData = await createConsole();
    currentTerminal.value = createdConsoleData.id;
    useCurrentConsoleId.setCurrentConsoleId(currentTerminal.value);
    emit("refreshTabs");
    await writeDataToConsole({
      console_id: currentTerminal.value,
      input_command: "resource " + scriptData.file_abs_path,
    });
    await readDataFromConsole(currentTerminal.value);

    ToastService.showToast(
      "The " + scriptData.name + " script has been started successfully"
    );
    loader.hide();
  }
);
</script>
<style>
/*
#container {
  height: 100px;
}

#container {
  height: 100vh !important;
}
*/
.cmdline {
  min-width: 500px !important;
  width: fit-content !important;
}

#container > output > pre > p {
  white-space: pre-wrap !important;
}
#terminal {
  overflow: unset !important;
}
#banner > h2:nth-child(2) {
  letter-spacing: 1px !important;
}
.prompt {
  color: #265ab1 !important;
}
</style>
