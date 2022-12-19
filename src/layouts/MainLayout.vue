<template>
    <TheNavbar />
    <TheSidebar />
    <div class="container with-nav">
        <Message />
        <router-view></router-view>
    </div>
</template>

<script>
import TheSidebar from '../components/TheSidebar'
import Message from '../components/ui/Message.vue'
import TheNavbar from '../components/TheNavbar.vue'
export default {
    setup() {
        return {}
    },
    components: {TheNavbar, Message, TheSidebar},
}
</script>

<style lang="scss" scoped></style>
