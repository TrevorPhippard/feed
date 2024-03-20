<script setup lang="ts">


defineProps({ data: Object })

function onOptionClick(e: any) {
    console.log(e.target.dataset.answer)
}

</script>

<template>
    <div class="imagecontainer" v-if="data" v-bind:style="{
        backgroundImage: `url(${data.bgImg}) `,
    }">
        <h2>{{ data.question }}</h2>
        <ul>
            <li :class="{ 'answer-correct': option.correct }" @click="onOptionClick" :data-answer="option"
                v-for="( option, index) in data.options">
                {{ index + 1 }}) {{ option.choice }}
            </li>
        </ul>
    </div>
</template>

<style scoped>
.imagecontainer h2 {
    font-size: 32px;
    text-shadow: 0px 3px 3px rgba(0, 0, 0, .5);
    color: #fff;
}

.imagecontainer {
    position: relative;
    border: 1px solid;
    background-size: cover;
    background-repeat: no-repeat;
    background-position-x: center;
    background-position-y: bottom;
    min-height: 100%;
    padding: 20px;
}

ul {
    position: absolute;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    flex-wrap: wrap;
    bottom: 0px;
    width: 100%;
}

li {
    list-style: none;
    width: 30%;
    margin: 10px;
    padding: 10px 20px;
    background-color: #fff;
    border: 1px solid #ccc;
    color: #333;
    border-radius: 5px;
    cursor: pointer;
}

li.answer-correct {
    background-color: #c2ffbd;
}


li:hover {
    background-color: #ccc;
}
</style>
