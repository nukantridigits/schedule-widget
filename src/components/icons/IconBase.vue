<template>
  <div class="icon_wrapper">
    <div class="icon_svg" :title="title" v-if="showIcon">
  <svg xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :viewBox="viewBox"
    :noDivider="noDivider"
    :aria-labelledby="iconName"
    role="presentation"
  >
    <g :fill="iconColor">
      <slot />
    </g>
  </svg>
  </div>
  <div class="icon_divider" v-if="!noDivider"/>
  <div class="icon_description" v-if="showIconDescription">
    {{title}}
  </div>
  </div>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      default: 'box'
    },
    width: {
      type: [Number, String],
      default: 17
    },
    height: {
      type: [Number, String],
      default: 22
    },
    viewBox: {
      type: [String],
      default: '0 0 17 18'
    },
    noDivider: {
      type: Boolean,
      default: false
    },
    iconColor: {
      type: String,
      default: 'currentColor'
    },
    title: {
      type: String,
      default: 'icon'
    },
    showIconDescription: {
      type: Boolean,
      default: false
    },
    showIcon: {
      type: Boolean,
      default: true
    },
  }
}
</script>
