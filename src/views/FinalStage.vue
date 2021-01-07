<!--FINAL STAGE-->

<template>
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Carter+One&display=swap" rel="stylesheet">
    <div class="finalstage-div">
        <h1>Final Stage</h1>

        <h1 class="aspect-ratio-box">
            <div class="aspect-ratio-box-inside">
                <div class="flexbox-centering">
                    <div class="viewport-sizing">
                        Happy Birthday
                    </div>
                </div>
            </div>
        </h1>
    </div>
</template>

<script>
export default {
    name: 'FinalStage',
    methods: {
    }
}
</script>

<style scoped>
.finalstage-div {
    position: relative;
    align-content: center;
    padding: 10px;
    background: #ab8ff8;
    height: 100vh;
    font-family: 'Carter One', arial;
}

.aspect-ratio-box {
  height: 0;
  padding-top: 591.44px / 1127.34px * 100%;
  background: white;
  position: relative;
}

.aspect-ratio-box-inside {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.flexbox-centering {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.viewport-sizing {
  font-size: 5vw;
}

</style>