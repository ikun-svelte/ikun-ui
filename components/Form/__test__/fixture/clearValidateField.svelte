<script lang="ts">
  import { KForm, KFormItem } from '@ikun-ui/form';
  import { KInput } from '@ikun-ui/input';
  import { createEventDispatcher } from "svelte";
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
  const handleClearValidateField = () => {
    if(KFormInst){
      KFormInst.clearValidateField('KInput')
    }
  }

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
<button data-testid='clearValidateField' on:click={handleClearValidateField}>clearValidateField</button>
<button data-testid='validate' on:click={handleValidate}>validate</button>
