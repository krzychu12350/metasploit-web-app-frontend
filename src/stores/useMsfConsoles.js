import { defineStore } from "pinia";

export const useMsfConsoles = defineStore("consoles", {
  state: () => ({
    consoles: [],
  }),
  getters: {
    getMsfConsoles() {
      return this.consoles;
    },
  },
  actions: {
    storeConsoleData(consoleId, consoleData) {
      const isConsoleIdAlreadyExist = this.consoles.some(console => console.console_id === consoleId);
      console.log(consoleId);
      if (isConsoleIdAlreadyExist) {
        const exsistingConsole = this.consoles.find(item => item.console_id === consoleId);
        console.log(consoleData);
       // console.log(exsistingConsole.console_data);
        //if(consoleData == "clear") exsistingConsole.console_data = "";
        exsistingConsole.console_data = exsistingConsole.console_data + "" + consoleData;
        //exsistingConsole.console_data
      } else this.consoles.push({console_id: consoleId, console_data: consoleData});
    },
    clearMsfConsolesData() {
      this.consoles.splice(0);
    },
  },
  persist: {
    enabled: true
  },
});