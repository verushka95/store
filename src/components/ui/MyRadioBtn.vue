<template>
    <div class="form-check">
        <label :for="id" class="form-check-label">{{label}}</label>
        <input :id="id" type="radio" :name="name" class="form-check-input" :value="valueInput" @change="changeInput(valueInput)">
    </div>
</template>
<script>
export default {
    props: {
        id: {type:String, required: true},
        label: {type: String, required: true},
        name: {type: String, required: true},
        valueInput: {type: String}
    },
    methods: {
        changeInput(valueInput){
            this.$emit("update:modelValue", valueInput)
        }
    }
}
</script>