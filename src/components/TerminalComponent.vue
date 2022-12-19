<template>
  <v-shell
    :banner="banner"
    :shell_input="send_to_terminal"
    :commands="commands"
    @shell_output="prompt"
  ></v-shell>
</template>

<script>
import ConsoleService from "../services/ConsoleService";
export default {
  name: "App",
  data() {
    return {
      send_to_terminal: "",
      banner: {
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
      ConsoleService.create().then((res) => {
        console.log(res.data);
      });
    },
    writeDataToConsole(data) {
      ConsoleService.write(data).then((res) => {
        console.log(res.data.data);
        //const test = "dddd";
        //this.send_to_terminal = `<p>` + res.data.data + `</p>`;
      });
    },
    async readDataFromConsole(id) {
      let data = { consoleID: id };
      await ConsoleService.read(data).then((res) => {
        console.log(res.data.data);
        //const test = "dddd";
        this.send_to_terminal = `<p>` + res.data.data + `</p>`;
      });
    },
  },
  mounted() {
    //this.createConsole();
    let data = { consoleID: 4, command: "help\\n" };
    this.writeDataToConsole(data);
    this.readDataFromConsole(4);
    //this.send_to_terminal = `<p>Shell to interacte with metasploit.</p>`;
    //this.shell_output = `<p>Initailize</p>`;
    this.prompt("ifconfig");
  },
};
</script>

<style></style>
