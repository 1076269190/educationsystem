<template>
  <div class="Paint2D-container">
    <br /><br /><br />
    <br />
    <div class="Paint2D-left">
      <h1>请输入你的二维表达式</h1>
      <mathlive-mathfield
        id="mf"
        ref="mathfiled"
        :options="{
          smartFence: false,
          virtualKeyboardMode: 'manual',
          virtualKeyboards: 'numeric symbols',
        }"
        :on-keystroke="displayKeystroke"
        @blur="e"
        v-model="formula"
        style="
          font-size: 32px;
          margin: 2em;
          padding: 8px;
          border-radius: 8px;
          border: 1px solid rgba(0, 0, 0, 0.3);
          box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
          width: 100%;
          background: #fff;
        "
      >
      </mathlive-mathfield>
    </div>

    <div id="myChart" :style="{ width: '600px', height: '600px' }"></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Paint2D",
  data() {
    return {
      formula: "",
      keystroke: "",
      kind: "2D",
      list: [],
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    async e() {
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      myChart.showLoading({
        text: "加载中,请稍后...",
      });
      await axios
        .post("http://localhost:8080/api/tool/draw", {
          latex: this.formula,
          kind: "2D",
        })
        .then((response) => {
          const { data: res } = response;
          this.list = res.result;
          myChart.hideLoading();
        });
      this.drawLine();
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        animation: false,
        grid: {
          top: 40,
          left: 50,
          right: 40,
          bottom: 50,
        },
        xAxis: {
          name: "x",
          min: -100,
          max: 100,
          minorTick: {
            show: true,
          },
          minorSplitLine: {
            show: true,
          },
        },
        yAxis: {
          name: "y",
          min: -100,
          max: 100,
          minorTick: {
            show: true,
          },
          minorSplitLine: {
            show: true,
          },
        },
        dataZoom: [
          {
            show: true,
            type: "inside",
            filterMode: "none",
            xAxisIndex: [0],
            startValue: -20,
            endValue: 20,
          },
          {
            show: true,
            type: "inside",
            filterMode: "none",
            yAxisIndex: [0],
            startValue: -20,
            endValue: 20,
          },
        ],
        series: [
          {
            type: "line",
            showSymbol: false,
            clip: true,
            data: this.list,
          },
        ],
      });
    },
    sayIt: function (event) {
      this.$refs.mathfield.perform(["speak", "all"]);
    },
    setIt: function (event) {
      this.formula = "x=-b\\pm \\frac {\\sqrt{b^2-4ac}}{2a}";
    },
    displayKeystroke: function (keystroke, _ev) {
      this.keystroke = keystroke;
      return true;
    },
    asSpokenText: function () {
      return this.$refs.mathfield
        ? this.$refs.mathfield.getValue("spoken")
        : "";
    },
  },
};
</script>

<style lang='less' scoped>
math-field:focus-within {
  outline: 1px solid rgba(64, 158, 255);
  border-radius: 8px;
}
.Paint2D-container {
  background: #e6e6e6;
  .Paint2D-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60vh;
  }
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 100vh;
  #myChart {
    margin: 60px 0px 0px 0px;
    border-radius: 10px;
    background: #fff;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  }
}
</style>