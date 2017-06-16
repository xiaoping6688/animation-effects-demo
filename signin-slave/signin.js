;(function(window){
  var interval = 2000
  var queue
  var containerSelector
  var intervalHandle

  window.runSignin = function (container, data) {
    containerSelector = container
    queue = data || []

    $(containerSelector).html('')
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
        // 添加元素
        $(containerSelector).append(getElementHtml(item))

        // 向上滚动
        if ($(containerSelector).height() > 244) {
          var cols = $(containerSelector).width() / 122 >> 0
          $(containerSelector).animate({ marginTop: '-122px' }, 'fast', 'linear', function() {
            $(containerSelector + ' li:lt(' + cols + ')').remove()
            $(containerSelector).css('margin-top', 0)
          })
        }
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
