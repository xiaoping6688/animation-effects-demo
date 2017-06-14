;(function(window){
  var interval = 2000
  var currentIndex
  var queue
  var containerSelector
  var intervalHandle

  window.runSignin = function (container, data) {
    containerSelector = container
    queue = data || []

    $(containerSelector).html('')
    currentIndex = 0
    clearInterval(intervalHandle)
    intervalHandle = setInterval(checkQueue, interval)
  }

  window.stopSignin = function () {
    // $(containerSelector).html('')
    clearInterval(intervalHandle)
  }

  function checkQueue () {
    var item  = queue.shift()
    if (item) {
      showAlert(item, 1000, function(){
        var col = Math.floor(currentIndex / 9)
        var index = currentIndex % 9

        // 创建新列
        if (index == 0) {
          if (col > 1) {
            $(containerSelector).animate({ marginTop: '-122px' }, 'fast', 'linear', function() {
              $(containerSelector + ' li:lt(9)').remove()
              $(containerSelector).css('margin-top', 0)
            })
          }
        }

        // 添加元素
        $(containerSelector).append(getElementHtml(item))

        currentIndex++
      })
    }
  }

  function getElementHtml (data) {
    if (data.avatar) {
      return '<li class="s-item"><img src="' + data.avatar + '"><span>' + data.name + '</span></li>'
    } else {
      var flag = Math.random() * 4 + 1 >> 0
      return '<li class="s-item color-' + flag + '"><span class="no-bg">' + data.name + '</span></li>'
    }
  }

  function showAlert (data, duration, callback) {
    var pic = getElementHtml(data)
    var alert = $(getAlertHtml(pic))
    alert.appendTo($(containerSelector).parent().parent())

    setTimeout(function(){
      alert.remove()
      callback()
    }, duration)
  }

  function getAlertHtml (pic) {
    return '<div class="s-mask">' +
              '<div class="s-alert">' +
                '<div class="pic">' +
                  pic +
                '</div>' +
                '<div class="tip">签到成功！</div>' +
             '</div>' +
             '<div class="logo">用教育推进科技进步</div>' +
          '</div>'
  }
})(window);
