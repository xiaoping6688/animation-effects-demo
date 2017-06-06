;(function(window){
  var interval = 2000
  var currentIndex
  var queue
  var containerSelector
  var intervalHandle

  window.runPuzzles = function (container, data) {
    containerSelector = container
    queue = data || []

    $(containerSelector).html('')
    currentIndex = 0
    clearInterval(intervalHandle)
    intervalHandle = setInterval(checkQueue, interval)
  }

  window.stopPuzzles = function () {
    // $(containerSelector).html('')
    clearInterval(intervalHandle)
  }

  function checkQueue () {
    var item  = queue.shift()
    if (item) {
      showAlert(item, 1000, function(){
        var col = Math.floor(currentIndex / 5)
        var index = currentIndex % 5

        // 创建新列
        if (index == 0) {
          if (col > 4) {
            $(containerSelector).animate({ marginLeft: '-184px' }, 'fast', 'linear', function() {
              $(containerSelector + ' .p-col:first-child').remove()
              $(containerSelector + ' .p-col:first-child').css('width', '224px')
              $(containerSelector).css('margin-left', '0')
            })
          }

          if (col % 2 == 0) {
            $(containerSelector).append('<div class="p-col up"></div>')
          } else {
            $(containerSelector).append('<div class="p-col down"></div>')
          }
        }

        // 添加元素
        var lastCol = $(containerSelector + ' .p-col:last-child')
        if (lastCol.hasClass('up')) {
          lastCol.prepend(getElementHtml(col, index, item))
        } else {
          lastCol.append(getElementHtml(col, index, item))
        }

        currentIndex++
      })
    }
  }

  function getElementHtml (col, index, data) {
    var flag = ''
    if (col == 0) { // 第一列:特殊拼图 自下向上
      switch (index) {
        case 0:
          flag = '0-0'
          break
        case 1:
          flag = '1-2'
          break
        case 2:
          flag = '2-2'
          break
        case 3:
          flag = '1-2'
          break
        case 4:
          flag = '0-1'
          break
      }
    } else { // 其他列
      if (col % 2 != 0) { // 奇数列:自上向下
        switch (index) {
          case 0:
            flag = '2-1'
            break
          case 1:
            flag = '3-0'
            break
          case 2:
            flag = '3-1'
            break
          case 3:
            flag = '3-0'
            break
          case 4:
            flag = '2-0'
            break
        }
      } else { // 偶数列:自下向上
        switch (index) {
          case 0:
            flag = '1-0'
            break
          case 1:
            flag = '3-1'
            break
          case 2:
            flag = '3-0'
            break
          case 3:
            flag = '3-1'
            break
          case 4:
            flag = '1-1'
            break
        }
      }
    }

    if (data.avatar) {
      return '<div class="p-item puz-' + flag + '-1"><img src="' + data.avatar + '"><span>' + data.name + '</span></div>'
    } else {
      return '<div class="p-item puz-' + flag + '-0"><span class="no-bg">' + data.name + '</span></div>'
    }
  }

  function showAlert (data, duration, callback) {
    var col = Math.floor(currentIndex / 5)
    var index = currentIndex % 5
    var pic = getElementHtml(col, index, data)
    $(containerSelector).append(getAlertHtml(pic, data.name))

    setTimeout(function(){
      $('.puz-alert').remove()
      callback()
    }, duration)
  }

  function getAlertHtml (pic, name) {
    return '<div class="puz-alert">' +
              '<div class="pic">' +
                  pic +
              '</div>' +
              '<div class="tip">' +
                  '<p class="name">' + name + '</p>' +
                  '<p>签到成功！</p>' +
              '</div>' +
              '<div class="logo">用科技推进教育进步</div>' +
           '</div>'
  }
})(window);
