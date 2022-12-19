<template>
    <page back title="Помощь">
        <Question v-for="q of questions" :key="q.title" :question="q" />
    </page>
</template>

<script>
import Page from '../components/ui/Page'
import Question from '../components/ui/Question'
export default{
    setup() {
        const questions = [
            {title: 'Что это за система?', text: 'Это система для работы с заявками'},
            {title: 'Как работает авторизация?', text: 'Авторизация реализована на Firebase через token'}
        ]
        return {questions}
    },
    components: {Page, Question}
}
</script>

<style lang="css" scoped></style>
