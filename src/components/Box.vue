<template>
    <div>
<!--        <div class="animated" :style="{ backgroundColor:`${bgCol}`, width: '200px', height: '200px', animationName: 'fadeIn', animationIterationCount: 'infinite', animationDuration: `${animDuration}` }"></div>-->
<!--        <div class="animated" :style="{-->
<!--            backgroundColor:`${bgCol}`,-->
<!--            width: '200px',-->
<!--            height: '200px',-->
<!--            animationName: `${animName}`,-->
<!--            animationDuration: `${animDuration}`,-->
<!--            animationDelay: `${animDelay}`,-->
<!--            animationIterationCount: 'infinite',-->
<!--        }"></div>-->
        <div class="toColor" :style="{
            backgroundColor:`${bgCol}`,
            width: '200px',
            height: '200px',
            animationName: 'toColor',
            animationDuration: `2s`,
            animationDelay: `1s`,
            animationIterationCount: 'infinite',
        }"></div>
    </div>
</template>

<script>
    export default {
        name: "Box",
        props: {
            boxStyle: Object,
            animation: String,
            animString: String,
            propBgCol: String,
            propAnimName: String,
            propAnimDuration: String,
            propAnimDelay: String,
        },
        data() {
            return {
                stateStyle: 'background-color: #b4bcc3; width: 200px; height: 200px',
                bgCol: '#b4bcc3',
                animName: '',
                animDuration: '',
                animDelay: ''
            }
        },
        updated() {
            console.log('updated');
            Object.keys(this.boxStyle.tokens).forEach(property => {
                this.$el.style.setProperty(property, this.boxStyle.tokens[property])
            })
        },
        mounted() {
            console.log('mounted');
            Object.keys(this.boxStyle.tokens).forEach(property => {
                console.log('PROP', this.boxStyle.tokens[property], typeof this.boxStyle.tokens[property]);
                this.$el.style.setProperty(property, this.boxStyle.tokens[property])
            });

            this.bgCol = this.propBgCol;
            this.animName = this.propAnimName;
            this.animDuration = this.propAnimDuration;
            this.animDelay = this.propAnimDelay;
            this.stateStyle = this.animString;
        }
    }
</script>


<style lang="scss" scoped>
    .yourElement {
        animation-name: var(--animation-name);
        animation-duration: var(--animate-duration);
        animation-delay: var(--animate-delay);
        animation-iteration-count: infinite
    }
    .box {
        margin-top: 10px;
        padding: 10px;
        width: var(--width);
        height: var(--height);
        background-color: var(--bg-color);
        /*animation: toBlack 1000ms ease-in;*/
    }
    @keyframes toColor {
        from {background-color: var(--anim-bg-color);}
        to {background-color: var(--bg-color);}
    }
    @keyframes toBlack {
        from {background-color: var(--bg-color);}
        to {background-color: var(--bg-color);}
    }
</style>
