import globalVariables from "@/assets/globalVariables";
let lang_files=[
    "./action",
    './label',
    './message',
    './response'
]
let labels={};
for(let i=0;i<lang_files.length;i++){
   let label=require(`${lang_files[i]}`).default;
   for (let item in label) {
        labels[item] = label[item][globalVariables.language] ? label[item][globalVariables.language] : item;            
    }
}
export default {
    labels:labels,
    add:function(language_files){
        try {
            for (let i = 0; i < language_files.length; i++) {
                let language = language_files[i].language;
                let fileData = require('@/'+language_files[i].file).default;
                for (let item in fileData) {
                    this.labels[item] = fileData[item][language] ? fileData[item][language] : item;
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    },    
    get: function(key){
        return this.labels[key] ? this.labels[key] : key;
    }
    
}
