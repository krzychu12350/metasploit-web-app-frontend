import { defineStore } from "pinia";

export const useMsfConsoles = defineStore("consoles", {
  state: () => ({
    consoles: [],
  }),
  getters: {

  },
  actions: {
    storeConsoleData(consoleId, consoleData, currentRpcConnectionId) {
      const isConsoleIdAlreadyExist = this.consoles.some(console => console.console_id == consoleId);
      //console.log(consoleId);
      if (isConsoleIdAlreadyExist) {
        const exsistingConsole = this.consoles.find(item => item.console_id == consoleId);
        //console.log(exsistingConsole);
        console.log(consoleData);
       // console.log(exsistingConsole.console_data);
        //if(consoleData == "clear") exsistingConsole.console_data = "";
        exsistingConsole.console_data = exsistingConsole.console_data + "" + consoleData;
        //exsistingConsole.console_data
      } else this.consoles.push({console_id: parseInt(consoleId), console_data: consoleData, connection_id: parseInt(currentRpcConnectionId)});
    },
    createCurrentConnectionConsolesDataArray() {
      this.consoles.push(['dwd']);
    },
    clearMsfConsolesData() {
      this.consoles.splice(0);
    },
    getMsfConsoles(currentRpcConnectionId) {
      const currentConnectionConsoles = this.consoles.filter(function (c) {
        return parseInt(c.connection_id) === parseInt(currentRpcConnectionId);
    });
    console.log(currentConnectionConsoles, currentRpcConnectionId);
    
    return this.consoles;
    },
  },
  persist: {
    enabled: true
  },
});