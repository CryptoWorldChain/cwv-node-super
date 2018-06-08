<template>
  <div>
    <div>
      <h3 class="title">交易记录</h3>
      <Transactions  :address="address" />
    </div>
  </div>
</template>

<script>
import { getAddress } from '@/utils/auth'
import Transactions from '../summary/account/transactions'
export default {
  components: {
    Transactions
  },
  data() {
    return {
      address: ''
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      var address = getAddress()
      this.address = address ? address : ''
    }
  }
}
</script>

<style>

</style>
