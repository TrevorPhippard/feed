<script lang="ts" setup>
import { onMounted, Ref, ref } from 'vue';
// import Slide1 from './Slide'\\\

const canvasElement: Ref<HTMLCanvasElement | undefined> = ref();
const context: Ref<CanvasRenderingContext2D | undefined> = ref();


const element = ref();
const elementStyle = ref();
const styles = Array.from(document.getElementsByTagName('style'))

onMounted(() => {
    context.value = canvasElement.value?.getContext('2d') | undefined;
    element.value = document.getElementById('slide1');
    elementStyle.value = getStyleTag(element.value.attributes[0].name);

    const images = element.value.querySelectorAll('img');
    Promise.all(Array.from(images).map(changeSrc)).then(render)
})

function getStyleById(elementId: string) {
    var vId = elementId.split('-v-')[1];
    return (tag: any) => tag.dataset.viteDevId.includes(vId) === true;

}

function getStyleTag(element: string) {
    return styles[0].innerHTML +
        styles.filter(getStyleById(element))[0].innerHTML;
}

function toDataUrl(url: string) {
    return fetch(url)
        .then(response => response.blob())
        .then(blob => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result)
            reader.onerror = reject;
            reader.readAsDataURL(blob)
        }))
}

function changeSrc(image: any) {
    return toDataUrl(image.src)
        .then(loadedImage => image.src = loadedImage)
        .catch(error => console.error(error))
}

function svgAsImage(svgText: string) {
    const newImage = new Image();
    newImage.crossOrigin = "Anonymous";
    newImage.src = 'data:image/svg+xml,' + encodeURIComponent(svgText);
    newImage.addEventListener('load', function (e) {
        if (!context.value) return;
        context.value.drawImage(e.target, 0, 0)
    })
}

function render() {
    if (!context.value) return;
    const xhtml = new XMLSerializer().serializeToString(element.value);
    const svgText = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"  width="200" height="100" >
        <foreignObject x="20" y="20" width="160" height="160">
            <div xmlns="http://www.w3.org/1999/xhtml">
                <style>
                ${elementStyle.value}
                </style>
                ${xhtml}
            </div>
        </foreignObject>
    </svg>`
    return svgAsImage(svgText)
}
</script>
<template>
    <canvas ref="canvasElement" width="400" height="400"></canvas>
</template>
<style></style>