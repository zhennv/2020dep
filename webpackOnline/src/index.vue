<template>
    <div>
        {{fullName}}
    </div>
</template>
<script>
export default {
    data(){
        return{
            arr:[1,2,3,4,5],
            fullName:""
        }
    },
    props:{
        keyBload:{
            type:Object,
            default:{}
        }
    },
    computed:{
        dataArr(){
            return arr.map((item)=>{
                if(item>3){
                    return item
                }
            })
        }
    },
    watch:{
        dataArr:{
            handle(newName, oldName){
                this.fullName = newName + ' ' + this.lastName;
                return Promise.resolve()
            },
            deep:true,
            immediate: true
        }
    },
}
</script>