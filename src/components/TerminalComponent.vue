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
import { ref, reactive, onBeforeMount, onMounted, onUnmounted, watch } from "vue";
import useEventsBus from "../composables/eventBus";

const { bus, emit } = useEventsBus();
const currentTerminal = ref(0);

const send_to_terminal = ref("");
const banner = reactive({
  header: "Metasploit Shell",
  subHeader: "Metasploit Shell is pure power just enjoy 🔥",
  helpHeader: 'Enter "help" for more information.',

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
});
const commands = reactive([
  {
    name: "info",
    get() {
      let dataa = { consoleID: currentTerminal.value, inputCommand: "help" };
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
      let data = { consoleID: id };
      await ConsoleDataService.read(data).then((res) => {
        console.log(res.data.data);
        //const test = "dddd";
        this.send_to_terminal = `<p>` + res.data.data.data + `</p>`;
      });
    },
  },
  mounted() {
    //this.createConsole();
    let data = { consoleID: 60, inputCommand: "version" };
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
function writeDataToConsole(data) {
  ConsoleDataService.write(data).then((res) => {
    console.log(res.data.data);
    //const test = "dddd";
    //this.send_to_terminal = `<p>` + res.data.data + `</p>`;
  });
}
async function readDataFromConsole(id) {
  let data = { consoleID: id };
  ConsoleDataService.read(data).then((res) => {
    console.log(res.data.data);
    setTimeout(() => {
      send_to_terminal.value = "<p>" + res.data.data.data + "</p>";
      //const test = "dddd";
      //banner.sign = "dddd >";
      //console.log("`" + String(res.data.data.prompt) + "`");

      //banner.value.sing = "`" + res.data.data.prompt + "`";
      //console.log(send_to_terminal.value);

      banner.sign = res.data.data.prompt;
      setTimeout(() => {
        if (res.data.data.busy === true) readDataFromConsole(id);
      }, 1000);
      //console.log(banner);

      //console.log(res.data.data.busy);
    }, 200);
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
    let dataa = { consoleID: currentTerminal.value, inputCommand: value };
    console.log(dataa.consoleID);
    writeDataToConsole(dataa);
    //currentTerminal.value = dataa.consoleID;
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

onBeforeMount(async () => {
  allConsoles.value = await getConsoleList();
  currentTerminal.value = Math.min.apply(
    Math,
    allConsoles.value.map(function (c) {
      return c.id;
    })
  );
  console.log(currentTerminal.value);
  readDataFromConsole(currentTerminal.value);
  //this.createConsole();
  let data = { consoleID: currentTerminal.value, inputCommand: "version" };
  //writeDataToConsole(data);
  setPrompt("ifconfig");
});

watch(
  () => bus.value.get("changeCurrentConsole"),
  (data) => {
    alert(data[0].console_id);

    currentTerminal.value = data[0].console_id;
    //send_to_terminal.value = `\n\n`;
    readDataFromConsole(currentTerminal.value);
    let dataa = { consoleID: currentTerminal.value, inputCommand: "help" };
    //writeDataToConsole(dataa);
  }
);

watch(
  () => bus.value.get("runNmapScan"),
  async () => {
    alert("nmap scan");

    const createdConsoleData = await createConsole();
    currentTerminal.value = createdConsoleData.id;
    emit("refreshTabs");
    alert(createdConsoleData.id);
    let dataa = {
      consoleID: currentTerminal.value,
      inputCommand: "db_nmap -v -sF -Pn -O 192.168.0.0/24",
    };
    writeDataToConsole(dataa);
    readDataFromConsole(currentTerminal.value);
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
  max-width: 200px !important;
}

#container > output > pre > p {
  white-space: pre-wrap !important;
}
</style>
