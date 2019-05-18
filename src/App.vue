<template>
  <div>
    <inputgroup
      v-model="value"
      :size="22"
      :uppercase="true"
      :spacers="[3, 13]"
    ></inputgroup>
    {{ value }}

    <inputgroup v-model="empty" :size="12"></inputgroup>
    {{ empty }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 'DE12500105170648489890',
      empty: ''
    };
  }
};
</script>
