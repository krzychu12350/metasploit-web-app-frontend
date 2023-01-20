<template>
  <div class="flex flex-col-reverse justify-end">
    <v-shell
      class="overflow-y-auto max-h-80 min-h-80 h-80 w-100"
      :banner="banner"
      :shell_input="send_to_terminal"
      :commands="commands"
      @shell_output="setPrompt"
    ></v-shell>
  </div>
</template>

<script setup>
import ConsoleDataService from "../services/ConsoleDataService";
import { ref, reactive, onBeforeMount, watch } from "vue";
import useEventsBus from "../composables/eventBus";

const { bus } = useEventsBus();

const send_to_terminal = ref("");
const banner = ref({
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
      return `<p>Shell to interacte with metasploit.</p>`;
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
function createConsole() {
  ConsoleDataService.create().then((res) => {
    console.log(res.data);
  });
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
  await ConsoleDataService.read(data).then((res) => {
    console.log(res.data.data);
    //const test = "dddd";
    banner.sign = "dddd >";
    send_to_terminal.value = `<p>` + res.data.data.data + `</p>`;
  });
}

function setPrompt(value) {
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
  } else if (value.trim() === "test") {
    send_to_terminal.value = `dddddddddddddddddd`;
  } else {
    let dataa = { consoleID: 56, inputCommand: value };
    writeDataToConsole(dataa);
    readDataFromConsole(56);
    /*
    send_to_terminal.value = `'${value}' is not recognized as an internal command or external,
an executable program or a batch file`;
*/
  }
}
onBeforeMount(() => {
  //this.createConsole();
  let data = { consoleID: 60, inputCommand: "version" };
  writeDataToConsole(data);
  setPrompt("ifconfig");
});

watch(
  () => bus.value.get("changeCurrentConsole"),
  (data) => {
    alert(data[0].console_id);
    const consoleId = data[0].console_id;
    //send_to_terminal.value = `\n\n`;
    readDataFromConsole(consoleId);
    let dataa = { consoleID: consoleId, inputCommand: "help" };
    //writeDataToConsole(dataa);
  }
);
</script>
