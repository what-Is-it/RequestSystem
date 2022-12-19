<template>
    <div class="container">
        <Message />
        <router-view></router-view>
    </div>
</template>

<script>
import Message from '../components/ui/Message.vue'
export default {
    setup() {
        return {}
    },
    components: {Message}
}
</script>

<style lang="css" scoped></style>
