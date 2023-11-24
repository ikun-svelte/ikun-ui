<script lang="ts">
  import { KForm, KFormItem } from '@ikun-ui/form';
  import { KInput } from '@ikun-ui/input';
  import { createEventDispatcher } from 'svelte';
  const initValue = {
    KInput: 'KInput',
  }
  let KFormInst: KForm | undefined = undefined
  const rules = {
    KInput: [
      { required: true, msg: 'Please input' },
    ]
  }
  const dispatch = createEventDispatcher();
  const handleValidate = () => {
    if(KFormInst){
      KFormInst.validateForm((data, isValid, invalidFields) => {
        dispatch('getRes', {
          data,
          isValid,
          invalidFields
        })
      })
    }
  }

  const handleReset = () => {
    if(KFormInst){
      KFormInst.resetForm()
    }
  }

</script>
<KForm {initValue}
       {rules}
       manualValidate={true}
       bind:this={KFormInst}>
  <KFormItem field="KInput" label="KInput">
    <KInput placeholder="Please input value">
    </KInput>
  </KFormItem>
</KForm>
<button id='validate' on:click={handleValidate}>validate</button>
<button id='reset' on:click={handleReset}>reset</button>
