<template>
  <div class="date">
    <DayDetails  />
  </div>
</template>

<script>
// @ is an alias to /src
import DayDetails from '@/components/DayDetails.vue'

export default {
  name: 'SingleDate',
  components: {
      DayDetails
}
}
</script>