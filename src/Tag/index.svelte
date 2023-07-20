<script>
  export let customClass = ''
  export let type = 'primary'
  const typeClass = {
    success: 'bg-green-400:10 text-green-400',
    error: 'bg-rose-400:10 text-rose-400',
    warning: 'bg-amber-400:10 text-amber-400',
    info: 'bg-slate-400:10 text-slate-400',
    primary: 'bg-teal-400:10 text-teal-400',
  }
</script>
<span class="flex-c mx-0.5 select-none whitespace-nowrap rounded px-1.5 py-0.5 text-xs {typeClass[type]} {customClass} ">
    <slot />
</span>
