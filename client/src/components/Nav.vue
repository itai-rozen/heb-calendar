<template>
<div class="container">

    <ul class="nav">
        <li>לוח שנה</li>
        <li>שבתות</li>
        <li>כל התזכורות</li>
    </ul>
</div>
    
</template>

<script>
export default {
    name: 'Nav'
}
</script>

<style  scoped>
@import url('https://fonts.googleapis.com/css2?family=Amatic+SC&display=swap');

.nav {
    font-family: 'Amatic SC', cursive;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}
li {
    list-style: none;
    font-size: 2em;
}

</style>