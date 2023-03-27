import SessionDataService from "../services/SessionDataService";

export default function useMeterpreterSession(){

  async function writeToMeterpreter(sessionId, meterpreterCommand) {
         SessionDataService.meterpreterWrite({
            session_id: sessionId,
            ps: meterpreterCommand,
          })
            .then((res) => {
              return res.data;
            })
            .catch((err) => {
              console.log(err);
            });
        
    }
   
    async function readFromMeterpreter(sessionId) {
         return SessionDataService.meterpreterRead({
            session_id: sessionId
          })
            .then((res) => {
              return res.data;
            })
            .catch((err) => {
              console.log(err);
            });    
         
    }

    function processTextDataToArray(data) {
        let subArray = [];
        const rows = data.data.data.split("\n");
        rows.forEach((info) => {
          let divider = info.split(":");
          subArray.push(divider);
        });

        return subArray;
   }

    return {
        writeToMeterpreter,
        readFromMeterpreter,
        processTextDataToArray
    }
}