/*
 * @Author: Li.chen
 * @LastEditors: Li.chen
 * @Description: File Description .
 * @Date: 2017-12-12 19:53:02
 * @LastEditTime: 2019-04-23 13:36:23
 */
// Chart.js scripts
// -- Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';
// -- 基本信息情况
var ctx = document.getElementById("myBarChart");
if(ctx != null){
  var myLineChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ["未提交", "审核中", "拒绝", "预录取", "录取", "报道", "离校", "弃权"],
      datasets: [{
        label: "人数",
        backgroundColor: "#1890ff",
        borderColor: "rgba(2,117,216,1)",
        data: [4215, 5312, 6251, 7841, 9821, 14984, 5782, 9892],
      }],
    },
    options: {
      scales: {
        xAxes: [{
        }],
        yAxes: [{
          ticks: {
            min: 0,
            maxTicksLimit: 10
          },
          gridLines: {
            display: true
          }
        }],
      },
      legend: {
        display: false
      }
    }
  });
}


// -- 护照、局留许可、保险到期情况
var ctx1 = document.getElementById("myPieChart");
if(ctx1 != null){
  var myPieChart = new Chart(ctx1, {
    type: 'doughnut',
    data: {
      labels: ["护照", "局留许可", "保险到期"],
      datasets: [{
        data: [19, 25, 12],
        backgroundColor: ['#3ca0ff', '#4ccc71', '#965fe4'],
      }],
    }, 
    options: {
      responsive: true,
      legend: {
        position: 'bottom',
      }
    }
  });
}

// ------------

// -- 迎新情况
var ctx2 = document.getElementById("myBarChart2");
if(ctx2 != null){
  var myLineChart = new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: ["入学确认", "照片采集", "指纹采集", "领取校园卡", "入住公寓", "核查资格", "面试", "缴纳学费", "注册资料", "院系报道"],
      datasets: [{
        label: "人数",
        backgroundColor: "#ee8c27",
        borderColor: "rgba(2,117,216,1)",
        data: [4215, 5312, 6251, 7841, 9821, 14984, 5782, 9892, 6892, 8781],
      }],
    },
    options: {
      scales: {
        xAxes: [{
        }],
        yAxes: [{
          ticks: {
            min: 0,
            maxTicksLimit: 10
          },
          gridLines: {
            display: true
          }
        }],
      },
      legend: {
        display: false
      }
    }
  });
}


// -- 其他情况
var ctx3 = document.getElementById("myPieChart2");
if(ctx3 != null){
  var myPieChart = new Chart(ctx3, {
    type: 'doughnut',
    data: {
      labels: ["护照", "局留许可", "保险到期"],
      datasets: [{
        data: [21, 15, 32],
        backgroundColor: ['#3ca0ff', '#4ccc71', '#965fe4'],
      }],
    }, 
    options: {
      responsive: true,
      legend: {
        position: 'bottom'
      }
    }
  });
}