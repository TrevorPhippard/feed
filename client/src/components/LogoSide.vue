<script setup lang="ts">

</script>

<template>
    <div class="logoCont">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-coffee"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>
        <div>
            <h1>Trivia</h1>
            <h2>Builder</h2>
        </div>
    </div>
</template>
<style scoped>

.logoCont{
    display: flex;
}

svg{
    stroke:var(--primary);
    width: 3em;
    margin-right:.5em;
}

h1 {
    color:var(--primary);
    font-size: 46px;
    font-weight: 100;
    text-transform:uppercase;
    text-align: center;
}

h2 {
    font-size: 12px;
    line-height: .3;
    text-align:right;
    text-transform:uppercase;
    letter-spacing:.6em;
    margin-right:-.4em;
    font-weight: 100;
}
</style>

