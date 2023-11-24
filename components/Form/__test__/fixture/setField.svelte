<script lang="ts">
  import { KForm, KFormItem } from '@ikun-ui/form';
  import { KInput } from '@ikun-ui/input';
  import { createEventDispatcher } from "svelte";
  export let isValidate = true
  export let initValue = {
    KInput: 'KInput',
  }
  let KFormInst: KForm | undefined = undefined

  const rules = {
    KInput: [
      { required: true, msg: 'KInput required'},
      { min: 3, max: 5,  msg: 'KInput 3 ~5' },
    ],
  }


  const dispatch = createEventDispatcher();
  const handleSetField = () => {
    if(KFormInst){
      KFormInst.setField('KInput', 'KInput change', isValidate)
    }
  }

  const handleGetForm = () => {
    if(KFormInst){
      dispatch('getRes', KFormInst.getForm())
    }
  }

</script>
<KForm {initValue}
       {rules}
       labelWidth={120}
       bind:this={KFormInst}>
  <KFormItem field="KInput" label="KInput">
    <KInput placeholder="Please input value">
    </KInput>
  </KFormItem>
</KForm>
<button id='setField' on:click={handleSetField}>setField</button>
<button id='getForm' on:click={handleGetForm}>getForm</button>
