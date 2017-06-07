<template>
  <div class="checkbox" @click="change">
    <text class="box" :class="[checked ? 'box-checked' : '', disabled ? 'box-disabled' : '']"></text>
    <text v-if="checked" class="icon" :class="[disabled ? 'icon-disabled' : '']"></text>
    <text v-if="$slots.default" class="text" :class="[disabled ? 'text-disabled' : '']"><slot></slot></text>
  </div>
</template>
<script>
export default {
  name: 'u-checkbox',
  props: {
    value: false,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    checked () {
      return this.value
    }
  },
  methods: {
    change () {
      if (!this.disabled) {
        this.$emit('input', this.checked)
        this.$emit('change', this.checked)
      }
    }
  }
}
</script>
<style>
.checkbox{
  position: relative;
  align-items: center;
  flex-direction: row;
}
.box{
  width: 40px;
  height: 40px;
  border-style: solid;
  border-width:2px;
  border-color:#52A1FF;
  border-radius:10px;
}
.box-checked{
  border-color: #52A1FF;
  }
.box-disabled{
  border-color:#777;
}
.icon{
  position: absolute;
  left: 8px;
  top: 12px;
  width: 24px;
  height: 12px;
  border-left-style: solid;
  border-left-width: 3px;
  border-left-color: #52A1FF;
  border-bottom-style: solid;
  border-bottom-width: 3px;
  border-bottom-color: #52A1FF;
  border-radius: 2px;
  transform: rotate(-45deg);
}
.icon-disabled{
  border-left-color: #777;
  border-bottom-color: #777;
}
.text{
  margin-left: 40px;
  color: #52A1FF;
}
.text-disabled{
  color: #777;
  }
</style>
