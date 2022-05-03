<template>
    <input :class="myclass" :type="typeField" :value="modelValue" @input="updateInput" :required="required" class="form-control input" :placeholder="placeholder">
</template>
<script>
export default {
    props: {
        myclass: {type: String},
        typeField: {type:String, required: true},
        modelValue: {type:String},
        placeholder: {type: String},
        required: {type: Boolean, default: false}
    },
    methods: {
        updateInput(event){
            this.$emit('update:modelValue', event.target.value);
        }
    }
}
</script>