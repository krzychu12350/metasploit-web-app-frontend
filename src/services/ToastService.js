// @ts-ignore
import {useToast} from "vue-toast-notification";

class ToastService {
    showToast(serverMessage, type) {
        const toast = useToast();
        toast.open({
            message: serverMessage,
            type: type,
            duration: 5000,
            position: 'bottom-right'
        })
    }
}

export default new ToastService();
