<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
    console.log("App Launch");
});
onShow(() => {
    console.log("App Show");
});
onHide(() => {
    console.log("App Hide");
});
</script>
<style lang="scss">
html, body {
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    scroll-behavior:smooth;
}

* {
    box-sizing: border-box;
}
page{
    width: 100vw;
    height: 100%;
    background-image: linear-gradient(#C7EDCC, #5EC99B);
}
</style>
