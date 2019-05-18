<template>
  <div>
    <input
      v-for="index in size"
      :key="index"
      :value="valueAt(index)"
      :class="{
        spacer: hasSpacer(index),
        'prev-spacer': hasSpacer(index + 1)
      }"
      :type="type"
      :ref="`ref-${index}`"
      @keydown.delete="back(index)"
      @keyup="changeAt(index, $event)"
      @focus="focus(index)"
      size="1"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      default: ''
    },
    size: {
      default: 0,
      type: Number
    },
    type: {
      default: 'text',
      type: String
    },
    uppercase: {
      type: Boolean
    },
    spacers: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      array: []
    };
  },
  computed: {},
  mounted() {
    this.array = this.value.split('');
  },
  methods: {
    valueAt(index) {
      return this.array[index - 1];
    },
    changeAt(index, event, val, emit = true) {
      let value = val;

      if (event) {
        const {
          target: { value: evtValue },
          keyCode
        } = event;

        if (keyCode === 8) {
          return;
        }

        value = evtValue;
      }

      let strValue = String(value);
      if (this.uppercase) {
        strValue = strValue.toUpperCase();
      }

      if (strValue.length > 1) {
        strValue = strValue.charAt(strValue.length - 1);
      }

      this.$set(this.array, index - 1, strValue);

      if (emit) {
        this.$emit('input', this.array.join(''));

        this.$nextTick(() => {
          if (index < this.size) {
            this.$refs[`ref-${index + 1}`][0].focus();
          } else {
            this.$refs[`ref-${index}`][0].blur();
          }
        });
      }
    },
    focus(index) {
      this.changeAt(index, null, '', false);
    },
    hasSpacer(index) {
      return this.spacers.indexOf(index) >= 0;
    },
    back(index) {
      this.$refs[`ref-${index - 1}`][0].focus();
    }
  }
};
</script>

<style scope>
input {
  border: 1px solid black;
  border-radius: 0;
  display: inline-block;
  margin: 0;
  text-align: center;
  padding: 5px;
  font-size: 14px;
  min-width: 15px;
  min-height: 25px;

  -webkit-appearance: none;
}

input:not(:first-child) {
  border-left: 0;
}

input:first-child {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

input:last-child {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

input:focus {
  outline: 0;
}

input.spacer {
  margin-left: 5px;
  border-left: 1px solid black;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

input.prev-spacer {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>
