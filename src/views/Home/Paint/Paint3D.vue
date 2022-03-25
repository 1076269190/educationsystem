<template>
  <div class="Paint3D-container">
    <br /><br /><br />
    <br />
    <div class="Paint3D-left">
      <h1>请输入你的三维表达式</h1>
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
import { Loading } from "element-ui";
export default {
  name: "Paint3D",
  data() {
    return {
      //表达式
      formula: "",
      keystroke: "",
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
        text: "加载中,请稍后..",
      });
      await axios
        .post("http://localhost:8080/api/tool/draw", {
          latex: this.formula,
          kind: "3D",
        })
        .then((response) => {
          const { data: res } = response;
          this.list = res.result;
          myChart.hideLoading();
        });
      this.drawLine();
    },
    drawLine() {
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      myChart.setOption({
        tooltip: {},
        backgroundColor: "#fff",
        visualMap: {
          show: false,
          dimension: 2,
          min: 100,
          max: -100,
          inRange: {
            color: [
              "#313695",
              "#4575b4",
              "#74add1",
              "#abd9e9",
              "#e0f3f8",
              "#ffffbf",
              "#fee090",
              "#fdae61",
              "#f46d43",
              "#d73027",
              "#a50026",
            ],
          },
        },
        xAxis3D: {
          type: "value",
        },
        yAxis3D: {
          type: "value",
        },
        zAxis3D: {
          type: "value",
        },
        grid3D: {
          viewControl: {
            projection: "orthographic",
          },
        },
        series: [
          {
            type: "line3D",
            data: this.list,
            lineStyle: {
              width: 4,
            },
          },
        ],
      });
    },
    //mathlive相关方法
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
.Paint3D-container {
  background: #e6e6e6;
  .Paint3D-left {
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
    border-radius: 5px;
    background: #fff;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  }
}
</style>