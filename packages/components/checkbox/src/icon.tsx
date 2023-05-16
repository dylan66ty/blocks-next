import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CheckboxIcon',
  props: {
    isChecked: Boolean,
    indeterminate: Boolean,
  },
  setup(props) {
    return () => {
      if (props.indeterminate) {
        return <span class="bn-checkbox__icon bn-checkbox__icon--half"></span>;
      }
      if (props.isChecked) {
        return <span class="bn-checkbox__icon bn-checkbox__icon--checked"></span>;
      }
      return <span class="bn-checkbox__icon bn-checkbox__icon--square"></span>;
    };
  },
});
