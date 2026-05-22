import globalVariables from "@/assets/globalVariables";
import ResponseError from "@/components/busy-states/ResponseError.vue";
import ResponseFileServerError from "@/components/busy-states/ResponseFileServerError.vue";
import AccessDeny from "@/components/busy-states/AccessDeny.vue";
import SiteOffline from "@/components/busy-states/SiteOffline.vue";
import labels from "@/labels";
import { useToast } from "vue-toastification";
import { h } from 'vue'
const toast = useToast();
export default{
    clearToast() {
        toast.clear();
    },
    showSuccessMessage(msg) {
        toast.success(msg, {timeout: 2000 });
    },
    showSuccessfullySavedMessage(){
        this.showSuccessMessage(labels.get('msg_success_saved'))
    },
    showErrorMessage(msg){
        toast.error(msg);
    },
    showServerNotRespondingError() {
        if(globalVariables.uploadingFiles==1){
            toast.error(ResponseFileServerError);
        }
        else{
            toast.error(ResponseError);
        }
    },
    showAccessDenyMessage() {
        toast.error(AccessDeny);
    },
    showApiOfflineMessage() {
        toast.error(SiteOffline);
    },
    //number=0; show as toast, 1=show as validationErrors
    showResponseError(data,where=0) {
        //console.log(error);
        let displayMessages='';
        if (data.error == 'ACCESS_DENIED') {
           this.showAccessDenyMessage()
        }
        else if (data.error == 'API_OFFLINE') {
            this.showApiOfflineMessage()
        }
        else if (data.error == 'USER_SESSION_EXPIRED') {
            globalVariables.logout();
            toast.error(labels.get('USER_SESSION_EXPIRED'));
        }
        else if (data.error == 'VALIDATION_FAILED') {
            if(typeof data.messages=='string'){
                displayMessages = labels.get(data.messages);
            }else if(typeof data.messages=='object'){
                let messages='';
                for (let message in data.messages) {
                    messages+=labels.get(data.messages[message])+'<br>';
                  }
                displayMessages = messages;
            } else{
                displayMessages = labels.get(data.messages);
            }
        }
        //DATA_ALREADY_SAVED,INPUT_NOT_FOUND
        else if (labels.get(data.error) != data.error) {
            displayMessages = labels.get(data.error)
        }
        else {
            displayMessages = labels.get(data.messages)
        }
        if(displayMessages){
            if(where==1){
                globalVariables.validationErrors=displayMessages;
            }
            else{
                toast.error(h('div', { innerHTML: displayMessages }));
            }
        }
        if (data.error == 'DATA_ALREADY_SAVED') {
            globalVariables.loadListData=true;
        }
    },
}